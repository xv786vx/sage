import React from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

const CreateSchedule = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  return (
    <div className="relative mx-auto mt-14 flex h-screen w-[50%] flex-col items-center">
      <h1 className="my-8 pb-8 text-4xl font-bold">Create Tasks Here</h1>
    </div>
  );
};

export default CreateSchedule;
