import Heading from "@/components/Heading";
import { Settings2 } from "lucide-react";

import { checkSubscription } from "@/lib/subscription";
import { Button } from "@/components/ui/button";
import SubscriptionButton from "@/components/SubscriptionButton";

export default async function Settings() {
    const isPro = await checkSubscription()

    return (
        <div>
            <Heading 
                title="Settings"
                description="Manage your account settings..."
                icon={Settings2}
                iconColor="text-gray-500"
                bgColor="bg-gray-100"
            />
            <div className="px-4 lg:px-8 space-y-4">
                <Button variant={isPro ? "premium" : "ghost"} className="text-muted-foreground text-sm bg-premium">
                    {isPro ? "You are currently a Pro user" : "You are currently on a free plan"}
                </Button>
                <br />
                <SubscriptionButton isPro={isPro} />
            </div>
        </div>
    )
}