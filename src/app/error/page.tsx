'use client';

import { useRouter } from "next/navigation";


const Page = () => {
    const router = useRouter()

    router.replace('/dashboard')

    return (
        <div>
            <span>Redirecting...</span>
        </div>
    )
}

export default Page
