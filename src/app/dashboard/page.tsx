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
      <div className="flex-col flex items-center">
        <h1 className = "text-7xl font-bold mt-16 py-4 text-center">DASHBOARD WIP</h1>
        {/* <h1 className='text-4xl'>{user?.email}</h1> */}
        <h1 className='text-4xl'>shlawg</h1>
      </div>
  )
}

export default Dashboard