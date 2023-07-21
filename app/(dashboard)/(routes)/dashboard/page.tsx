"use client"

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { UserButton } from "@clerk/nextjs";
import { ArrowRight, Code2Icon, ImageIcon, MessageSquare, VideoIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Analytics } from '@vercel/analytics/react';


const tools = [
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10"
    },
    {
        label: "Image Generaion",
        icon: ImageIcon,
        href: "/image",
        color: "text-red-300",
        bgColor: "bg-red-300/10"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-blue-300",
        bgColor: "bg-blue-300/10"
    },
    {
        label: "Code Generation",
        icon: Code2Icon,
        href: "/code",
        color: "text-emerald-300",
        bgColor: "bg-emerald-300/10"
    },
]

export default function Dashboard() {
    const router = useRouter()
    return (
        <div>
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center">
                    Explore the power of AI
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                    AllIn AI is a platform that allows you to generate images, videos, and code using the power of AI.
                </p>
            </div>
            <div>
                <div className="px-4 md:px-20 lg:px-32 space-y-4">
                    {tools.map((tool) => (
                        <Card
                            onClick={() => router.push(tool.href)}
                            key={tool.href}
                            className="px-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                        >
                            <div className="flex items-center gap-x-4">
                                <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                                    <tool.icon className={cn('w-8 h-8', tool.color)} />
                                </div>
                                <div className="font-semibold">
                                    {tool.label}
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5"/>
                        </Card>
                    ))}
                </div>
            </div>
            <Analytics />
        </div>
    )
}