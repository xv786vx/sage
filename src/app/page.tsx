"use client";

import { ReactTyped } from "react-typed";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex-col flex items-center">
      <ReactTyped className="text-7xl font-bold mt-16 py-4 text-center" 
                      strings={['Sage']} 
                      typeSpeed={100} backSpeed={150} loop />
      <button className="py-4 px-6 mt-4 mb-4 bg-black rounded-xl hover:bg-slate-500 text-white ease-in-out duration-300">Get Started</button>
    </div>
    
  );
}