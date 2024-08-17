import React from "react";
import { db } from "../../lib/db";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { LuPlusSquare } from "react-icons/lu";

import Link from "next/link";

const Dashboard = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  return (
    <div className="flex h-screen flex-col">
      <h1 className="mt-16 py-4 text-left text-7xl font-bold">Dashboard</h1>
      <h1 className="text-4xl">shlawg</h1>
      {/* TO-DO: Add paginated list / blocks to view your schedules from */}
      <Link href="/create-schedule" className="mb-8 mt-auto">
        <div className="group relative flex h-20 w-20 items-center justify-center rounded-2xl duration-300 ease-in-out hover:bg-black">
          <LuPlusSquare
            size="48"
            className="text-black duration-300 ease-in-out group-hover:rotate-90 group-hover:text-white"
          />
          <span className="sidebar-tooltip absolute left-20 m-2 w-auto min-w-max origin-left scale-0 rounded-md bg-gray-900 p-2 text-base font-bold text-white shadow-md transition-all duration-100 group-hover:scale-100">
            Create Schedule
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Dashboard;
