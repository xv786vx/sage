import React from 'react'
import { db } from "../../lib/db"
import { auth } from '../../../auth'
import { redirect } from 'next/navigation';
import { LuPlusSquare } from 'react-icons/lu'

import Link from 'next/link';

const Dashboard = async () => {
  const session = await auth()
    if (!session?.user) {
        redirect("/")
    }
  return (
      <div className="flex-col flex h-screen">
        <h1 className = "text-7xl font-bold mt-16 py-4 text-left">Dashboard</h1>
        <h1 className='text-4xl'>shlawg</h1>
        {/* TO-DO: Add paginated list / blocks to view your schedules from */}
        <Link href="/create-schedule" className='mt-auto mb-8'>
          <div className='relative flex items-center justify-center w-20 h-20 rounded-2xl hover:bg-black ease-in-out duration-300 group'>
            <LuPlusSquare size='48' className='group-hover:rotate-90 ease-in-out duration-300 text-black group-hover:text-white'/>
            <span className='sidebar-tooltip absolute w-auto p-2 m-2 min-w-max left-20
                            rounded-md shadow-md
                          text-white bg-gray-900
                            text-base font-bold
                            transition-all duration-100 scale-0 origin-left group-hover:scale-100'>Create Schedule</span>
          </div>
        </Link>
      </div>
  )
}

export default Dashboard