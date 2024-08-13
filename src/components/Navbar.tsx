import React from 'react'
import Link from "next/link"
import { auth } from '../../auth'
import { logout } from '../actions/auth'
import Logout from './Logout'


const Navbar = async() => {
    const session = await auth()
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-md">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center relative">
          <div className='flex items-center hover:bg-gray-200 p-2 rounded-lg transition-colors ease-in-out duration-300 z-20'>

          <Link href="#" prefetch={false}>
            
            <span className="sr-only">Sage</span>
          </Link>
          </div>
          
          <nav className="absolute m-auto left-0 right-0 hidden md:flex gap-4 justify-center z-10">
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="/middleware"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Middleware
            </Link>
            <Link
              href="/server"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Server
            </Link>
            <Link
              href="#"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4 z-20 relative">
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