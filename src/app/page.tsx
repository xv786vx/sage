import Image from "next/image";
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex-col flex items-center">
      <h1 className = "text-7xl font-bold mt-16 py-4 text-center">Sage</h1>
      <Link href="/api/auth/login">
        <button className="py-4 px-6 mt-16 bg-black rounded-xl hover:bg-slate-500 text-white ease-in-out duration-300">Login</button>
      </Link>
    </div>
    
  );
}
