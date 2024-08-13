'use client'

import React from 'react'
import { logout } from '../actions/auth'

const Logout = () => {
  return (
    <div onClick={() => logout()}>
        <button className='bg-black hover:bg-gray-700 text-white font-semibold py-2 px-3 text-sm rounded-lg ease-in-out duration-300'>Log Out</button>
    </div>
  )
}

export default Logout