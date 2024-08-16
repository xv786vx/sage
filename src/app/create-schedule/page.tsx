import React from 'react'
import { auth } from '../../../auth'
import { redirect } from 'next/navigation'

const CreateSchedule = async () => {
    const session = await auth()
    if (!session?.user) {
        redirect("/")
    }
  return (
    <div className='flex flex-col relative items-center h-screen mt-14 mx-auto w-[50%]'>
        <h1 className='text-4xl font-bold my-8 pb-8'>Create Tasks Here</h1>
    </div>
  )
}

export default CreateSchedule