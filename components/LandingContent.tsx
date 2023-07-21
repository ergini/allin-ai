"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const testimonials = [
    {
        name: "Ergo",
        avatar: "A",
        title: "Web Developer",
        description: "It was a very good experience developing this app"
    },
    {
        name: "Bertha Bowman",
        avatar: "possibly",
        title: "Engineer",
        description: "This is a very good product. I am very satisfied with the results."
    },
    {
        name: "Bradley Porter",
        avatar: "coach",
        title: "Entrepreneur",
        description: "I have been using this product for a while now and I am very satisfied with the results."
    },
    {
        name: "Agnes Sparks",
        avatar: "care",
        title: "Designer",
        description: "Its from the future."
    },
]

export default function LandingContent() {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((item) => (
                    <Card key={item.description} className="bg[#192339] border-none text-black">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">
                                        {item.name}
                                    </p>
                                    <p className="text-zinc-400 text-sm">
                                        {item.title}
                                    </p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}