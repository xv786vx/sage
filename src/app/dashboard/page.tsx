import React from 'react'
import Link from 'next/link';
import prisma from "@/lib/db"

export default async function Dashboard({ params }) {

  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: params.email
  //   }
  // })
  return (
      <div className="flex-col flex items-center">
        <h1 className = "text-7xl font-bold mt-16 py-4 text-center">DASHBOARD WIP</h1>
        {/* <h1 className='text-4xl'>{user?.email}</h1> */}
        <h1 className='text-4xl'>shlawg</h1>
      </div>
  )
}