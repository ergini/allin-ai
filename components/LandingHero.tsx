import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Experiment, Variant } from 'splitter-gg'
import { useSplitter } from 'splitter-gg/client'


export const LandingHero = () => {
    const { isSignedIn } = useAuth();
    const { trackClick } = useSplitter()

    return (
        <Experiment name="get-started-clicks">
            <div className="text-white font-bold py-36 text-center space-y-5">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                    <h1>
                        The Best AI Tool for
                    </h1>
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                        <TypewriterComponent
                            options={{
                                strings: [
                                    "Chatbot.",
                                    "Code Generation.",
                                    "Image Generation.",
                                    "Video generation."
                                ],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </div>
                </div>
                <div className="text-sm md:text-xl font-light text-zinc-400">
                    Create your own AI generated content in seconds.
                </div>
                <div>
                    <Variant name="get-started-clicks">
                        <Link
                            onClick={() => trackClick('get-started-clicks')}
                            href={isSignedIn ? "/dashboard" : "/sign-up"}
                        >
                            <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-xl font-semibold">
                                Start Generating For Free
                            </Button>
                        </Link>
                    </Variant>
                </div>
                <div className="text-zinc-400 text-xs md:text-sm font-normal">
                    No credit card required.
                </div>
            </div>
        </Experiment>
    );
};

export default LandingHero;