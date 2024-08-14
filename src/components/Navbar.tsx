import React from 'react'
import Link from "next/link"
import { auth } from '../../auth'
import { logout } from '../actions/auth'
import Logout from './Logout'


const Navbar = async() => {
    const session = await auth()
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-md">
      <div className="w-full mx-auto px-12">
        <div className="flex justify-between h-14 items-center relative">
          <nav className="flex gap-4 z-10 float-left">
            {session?.user ? (
              <div className='gap-4 flex items-center'>
                <Link
                  href="/dashboard"
                  className="font-medium flex items-center text-sm transition-colors hover:underline"
                  prefetch={false}
                >
                  Dashboard
                </Link>
                <Link
                  href="/create-task"
                  className="font-medium flex items-center text-sm transition-colors hover:underline"
                  prefetch={false}
                >
                  Create Task
                </Link>
              </div>
            ): (
              <a></a>
            )}
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
          <div className="flex place-items-end gap-4 z-20 relative float-right">
            {!session?.user ? (
                <div className="space-x-2">
                    <Link className='bg-white hover:bg-gray-200 text-black font-semibold py-2 px-3 text-sm rounded-lg ease-in-out duration-300' href="/sign-in">Sign In</Link>
                    {/* <Link className='bg-black hover:bg-gray-700 text-white font-semibold py-2 px-3 text-sm rounded-lg ease-in-out duration-300' href="#">Sign up</Link> */}
                </div>
            ): (
                <div className='flex items-center gap-x-6 text-sm'>
                    {session?.user?.email}
                    <Logout/>
                </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar