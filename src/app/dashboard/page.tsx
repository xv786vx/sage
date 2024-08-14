import React from 'react'
import { db } from "../../lib/db"
import { auth } from '../../../auth'
import { redirect } from 'next/navigation';

const Dashboard = async () => {
  const session = await auth()
    if (!session?.user) {
        redirect("/")
    }
  return (
      <div className="flex-col flex">
        <h1 className = "text-7xl font-bold mt-16 py-4 text-left">DASHBOARD WIP</h1>
        {/* <h1 className='text-4xl'>{user?.email}</h1> */}
        <h1 className='text-4xl'>shlawg</h1>
        {/* TO-DO: Add paginated list / blocks to view your schedules from */}
        <button className='flex align-bottom mt-96'>Hello</button>
      </div>
  )
}

export default Dashboard