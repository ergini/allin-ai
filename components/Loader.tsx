import Image from "next/image";

export default function Loader() {
    return (
        <div className='h-full flex flex-col gap-y-4 items-center justify-center'>
            <div className="w-10 h-10 relative animate-spin">
                <Image
                    alt="logo"
                    fill
                    src='/mainlogo.png'
                />
            </div>
            <p className='text-sm text-muted-foreground'>
                AllIn AI is thinking <span className='animate-ping'>...</span>
            </p>
        </div>
    )
}