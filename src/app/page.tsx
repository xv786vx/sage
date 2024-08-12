import Image from "next/image";

export default function Home() {
  return (
    <div className="items-center flex-col">
      <h1 className = "text-7xl font-bold mt-16 py-4 text-center">Sage</h1>
      <a href="/api/auth/login">Login</a>
    </div>
    
  );
}
