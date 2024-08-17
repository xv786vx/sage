"use client";

import { ReactTyped } from "react-typed";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <ReactTyped
        className="mt-16 py-4 text-center text-7xl font-bold"
        strings={["Sage"]}
        typeSpeed={100}
        backSpeed={150}
        loop
      />
      <button className="mb-4 mt-4 rounded-xl bg-black px-6 py-4 text-white duration-300 ease-in-out hover:bg-slate-500">
        Get Started
      </button>
    </div>
  );
}
