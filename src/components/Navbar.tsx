import React from "react";
import Link from "next/link";
import { auth } from "../../auth";
import { logout } from "../actions/auth";
import Logout from "./Logout";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-md">
      <div className="mx-auto w-full px-12">
        <div className="relative flex h-14 items-center justify-between">
          <nav className="z-10 float-left flex gap-4">
            <Link
              href="/testing"
              className="flex items-center text-sm font-medium transition-colors hover:underline"
              prefetch={false}
            >
              TESTING
            </Link>
            {session?.user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="flex items-center text-sm font-medium transition-colors hover:underline"
                  prefetch={false}
                >
                  Dashboard
                </Link>
                <Link
                  href="/create-schedule"
                  className="flex items-center text-sm font-medium transition-colors hover:underline"
                  prefetch={false}
                >
                  Create Schedule
                </Link>
              </div>
            ) : (
              <a></a>
            )}
            <Link
              href="#"
              className="flex items-center text-sm font-medium transition-colors hover:underline"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
          <div className="relative z-20 float-right flex place-items-end gap-4">
            {!session?.user ? (
              <div className="space-x-2">
                <Link
                  className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black duration-300 ease-in-out hover:bg-gray-200"
                  href="/sign-in"
                >
                  Sign In
                </Link>
                {/* <Link className='bg-black hover:bg-gray-700 text-white font-semibold py-2 px-3 text-sm rounded-lg ease-in-out duration-300' href="#">Sign up</Link> */}
              </div>
            ) : (
              <div className="flex items-center gap-x-6 text-sm">
                {session?.user?.email}
                <Logout />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
