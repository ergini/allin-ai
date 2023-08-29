import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'

import { increaseApiLimit, checkApiLimit } from '@/lib/apiLimit'
import { checkSubscription } from '@/lib/subscription'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const instructionMessage: ChatCompletionRequestMessage = {
    role: 'system',
    content: 'You are a web creator and designer. You provide large html websites with modern internal css designs and internal javascript functions based on the user request. You only provide the code nothing else, dont give explanation or saying anything about the code. Only give the code and thats all!'
}

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!configuration.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 })
        }

        if (!messages) {
            return new NextResponse("Messages not provided", { status: 400 })
        }

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial limit reached", { status: 403 })
        }

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [instructionMessage, ...messages],

        })

        if (!isPro) {
            await increaseApiLimit();
        }
        return NextResponse.json(response.data.choices[0].message)


    } catch (error) {
        console.log("Code error", error)
        return new NextResponse("iNTERNAL ERROR", { status: 500 })
    }
}