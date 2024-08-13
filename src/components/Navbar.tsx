import React from 'react'
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center relative">
          <div className='flex items-center hover:bg-gray-200 p-2 rounded-lg transition-colors ease-in-out duration-300 z-20'>
          <Link href="#" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
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
            <Link href="/sign-in">
                <button className='bg-white hover:bg-gray-200 text-black font-semibold py-2 px-3 text-sm rounded-lg ease-in-out duration-300'>Sign in</button>
            </Link>
            <button className='bg-black hover:bg-gray-700 text-white font-semibold py-2 px-3 text-sm rounded-lg ease-in-out duration-300'>Sign up</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="https://i.postimg.cc/76qGZ6zP/sagelogo-1.png"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}