"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

export default function CrispChat() {
    useEffect(() => {
        Crisp.configure("badbba73-da79-4873-848a-0b3c3ec9d52d")
    }, [])

    return null
}