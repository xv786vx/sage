import React from 'react'
import { auth } from '../../../auth'
import { redirect } from 'next/navigation'

const CreateSchedule = async () => {
    const session = await auth()
    if (!session?.user) {
        redirect("/")
    }
  return (
    <main className='flex h-full items-center justify-center flex-col gap-2'>
        <h1 className='text-3xl'>Create Tasks Here</h1>
        <p className='text-lg'>{session?.user?.email}</p>
    </main>
  )
}

export default CreateSchedule