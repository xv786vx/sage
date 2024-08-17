"use client";

import React from "react";
import { logout } from "../actions/auth";

const Logout = () => {
  return (
    <div onClick={() => logout()}>
      <button className="rounded-lg bg-black px-3 py-2 text-sm font-semibold text-white duration-300 ease-in-out hover:bg-gray-700">
        Log Out
      </button>
    </div>
  );
};

export default Logout;
