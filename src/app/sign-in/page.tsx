import LoginForm from "@/components/LoginForm";
import LoginGithub from "@/components/LoginGithub";
import React from "react";

const SignIn = () => {
  return (
    <div className="mt-24 flex w-full justify-center">
      <section className="w=[400px] flex flex-col">
        <h1 className="mb-6 w-full text-center text-3xl font-bold">Sign in</h1>
        <LoginForm />
        <LoginGithub />
      </section>
    </div>
  );
};

export default SignIn;
