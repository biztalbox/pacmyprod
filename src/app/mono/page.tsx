import { redirect } from 'next/navigation';
import React from 'react'

const page = () => {
    redirect('/mono/1')
    return (
        <main>
        </main>
    )
}

export default page