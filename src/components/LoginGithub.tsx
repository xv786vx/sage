"use client";

import React from "react";
import { FaGithub } from "react-icons/fa";
import { login } from "../actions/auth";

const LoginGithub = () => {
  return (
    <div
      onClick={() => login("github")}
      className="mt-6 flex h-12 w-full items-center justify-center gap-4 rounded-md bg-black p-4 hover:cursor-pointer"
    >
      <FaGithub className="text-white" />
      <p className="text-white">Login with GitHub</p>
    </div>
  );
};

export default LoginGithub;
