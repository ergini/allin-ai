"use client"

import { useProModal } from "@/hooks/useProModal"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge"
import { Check, Code2Icon, ImageIcon, MessageSquare, VideoIcon, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

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

export default function ProModal() {
    const proModal = useProModal()
    const [loading, setLoading] = useState(false)

    const onSubscribe = async () => {
        try {
            setLoading(true)
            const response = axios.get("/api/stripe")

            window.location.href = (await response).data.url
        } catch (error) {
                toast.error("Something went wrong!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold py-1">
                            Upgrade to AllIn AI
                            <Badge variant="premium" className="uppercase text-sm py-1">
                                Pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        {tools.map((tool) => (
                            <Card
                                key={tool.label}
                                className="p-3 border-black/5 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-x-4">
                                    <div className={cn('p-2 w-fot rounded-md', tool.bgColor)}>
                                        <tool.icon className={cn('w-6 h-6', tool.color)} />
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className="text-primary w-5 h-5" />
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button disabled={loading} onClick={onSubscribe} size="lg" variant="premium" className="w-full">
                        Upgrade 
                        <Zap className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}