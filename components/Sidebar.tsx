"use client"
import Link from 'next/link'
import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Code2Icon, ImageIcon, LayoutDashboard, MessageSquare, Settings, Settings2, VideoIcon } from 'lucide-react'
import FreeCounter from './FreeCounter'

const montserrat = Montserrat({
    weight: "600",
    subsets: ["latin"]
})

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-cyan-300"
    },
    {
        label: "Conversation",
        language: "Albanian",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-yellow-300"
    },
    {
        label: "Code Generation",
        language: "Albanian",
        icon: Code2Icon,
        href: "/code",
        color: "text-emerald-300"
    },
    {
        label: "Image Generation",
        language: "English",
        icon: ImageIcon,
        href: "/image",
        color: "text-red-300"
    },
    {
        label: "Video Generation",
        language: "English",
        icon: VideoIcon,
        href: "/video",
        color: "text-blue-300"
    },
    {
        label: "Website Generation",
        icon: Code2Icon,
        href: "/webcreation",
        // color: "text-yellow-300",
        textColor: "text-black/90",
        background: "bg-yellow-300"
    },
    {
        label: "Settings",
        icon: Settings2,
        href: "/settings",
        color: "#fff"
    },
]

interface SidebarProps {
    apiLimitCount: number
    isPro: boolean
}

export default function Sidebar({
    apiLimitCount = 0,
    isPro = false
}: SidebarProps) {
    const pathname = usePathname()
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#1e1e1e] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image
                            fill
                            alt="Logo"
                            src="/mainlogo.png"
                        />
                    </div>
                    <h1 className={cn('text-2xl font-bold', montserrat.className)}>
                        AllIn AI
                    </h1>
                </Link>
                <div className='space-y-1'>
                    {routes.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
                                route.background, route.textColor
                            )}
                        >
                            <div className={cn('flex items-center flex-1')}>
                                <route.icon className={cn('h-5 w-5 mr-3', route.color,)} />
                                {route.label}
                                {route.language && (
                                    <span className="ml-2 text-xs text-gray-400">
                                        /{route.language}
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <FreeCounter
                isPro={isPro}
                apiLimitCount={apiLimitCount}
            />
        </div>
    )
}