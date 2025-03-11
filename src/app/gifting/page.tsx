import Gifting from '@/components/Gifting'
import { redirect } from 'next/navigation';
import React from 'react'

const page = () => {
    redirect('/gifting/1')
    return (
        <main>
        </main>
    )
}

export default page