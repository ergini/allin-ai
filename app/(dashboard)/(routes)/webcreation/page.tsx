"use client"

import axios from "axios";
import * as z from "zod";
import { Code2Icon, CodeIcon, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

import Heading from "@/components/Heading";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { formSchema } from "./constants";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";
import { useProModal } from "@/hooks/useProModal";
import { toast } from "react-hot-toast";
import { Analytics } from '@vercel/analytics/react';
import { Select } from "@/components/ui/select";


export default function Code() {
    const proModal = useProModal()
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
    const [generatedCode, setGeneratedCode] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

    const formSchema = z.object({
        prompt: z.string(), // The prompt field
        language: z.string(), // The language field
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            language: "html",
        },
    });

    useEffect(() => {
        const codeMessage = messages.find(message => message.role !== 'user');
        if (codeMessage && codeMessage.content !== undefined) {
            setGeneratedCode(codeMessage.content);
        } else {
            setGeneratedCode(null);
        }
    }, [messages]);


    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionRequestMessage = {
                role: 'user',
                content: values.prompt,
            };

            const newMessages = [...messages, userMessage];

            const response = await axios.post('/api/code', {
                messages: newMessages,
                language: values.language, // Include the selected programming language
            });

            setGeneratedCode(response.data.content);
            setSelectedLanguage(values.language);

            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();
        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen()
            } else {
                toast.error("Something went wrong!")
            }
        } finally {
            router.refresh();
        }
    };


    return (
        <div>
            <Heading
                title="Website Generation"
                description="We'll help you generate a website!"
                icon={Code2Icon}
                iconColor="text-yellow-500"
                bgColor="bg-yellow-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='rounded-lg border w-full p-2 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-10'>
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                                disabled={isLoading}
                                                placeholder="Ex: Simple JavaScript code to sum two numbers.."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className='space-y-4 mt-4'>
                    {isLoading && (
                        <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty label="Ask us..." />
                    )}
                    <div className='flex flex-col gap-y-4'>
                        {messages.map((message) => (
                            <div
                                key={message.content}
                                className={cn(
                                    'p-8 w-full flex items-start gap-x-8 rounded-lg', message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted'
                                )}
                            >
                                {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                                {message.role === 'user' ? (
                                    <ReactMarkdown
                                        components={{
                                            pre: ({ node, ...props }) => (
                                                <div className="overflow-auto w-full my-2 bg-emerald-300/10 text-emerald-600 p-2 rounded-lg">
                                                    <pre {...props} />
                                                </div>
                                            ),
                                            code: ({ node, ...props }) => (
                                                <code className="bg-emerald-600/10 text-black rounded-lg p-1" {...props} />
                                            ),
                                        }}
                                        className='text-sm overflow-hidden leading-7'
                                    >
                                        {message.content || ''}
                                    </ReactMarkdown>
                                ) : null}
                                {message.role !== 'user' && generatedCode && (
                                    <a
                                        href={`data:text/plain;charset=utf-8,${encodeURIComponent(generatedCode)}`}
                                        download={`generated_code.html`}
                                        className="block mt-2 text-center text-blue-500 underline"
                                    >
                                        <Button className='w-full items-center'>
                                            <CodeIcon className='mr-2' />
                                            Download Code
                                        </Button>
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>


                </div>
            </div>
            <Analytics />
        </div>
    )
}