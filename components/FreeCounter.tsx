"use client"
import { useEffect, useState } from "react"
import { Card, CardContent } from "./ui/card"
import { MAX_FREE_COUNTS } from "@/constants"
import { Progress } from "./ui/progress"
import { Button } from "./ui/button"
import { ArrowUpRightSquare, Zap } from "lucide-react"
import { useProModal } from "@/hooks/useProModal"

interface FreeCounterProps {
    apiLimitCount: number,
    isPro: boolean
}

export default function FreeCounter({
    apiLimitCount = 0,
    isPro = false
}: FreeCounterProps) {
    const proModal = useProModal()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    if (isPro) {
        // If user is pro, show an h1 saying "You are pro"
        return (
            <div className="px-3">
                <Button variant="premium">
                    AllIn AI Pro User
                </Button>
            </div>
        )
    }

    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>
                            {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
                        </p>
                        <Progress
                            className="h-3"
                            value={apiLimitCount / MAX_FREE_COUNTS * 100}
                        />
                    </div>
                    <Button onClick={proModal.onOpen} variant="premium" className="w-full">
                        Upgrade to Pro
                        <ArrowUpRightSquare className="w-4 h-4 ml-1 fil-white" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}