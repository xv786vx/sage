import React from "react";
import { db } from "@/lib/db";
import { auth } from "../../../auth";
import TaskView from "@/components/TaskView";

const Testing = async () => {
  const session = await auth();
  return (
    <div className="mt-24 flex h-screen flex-col">
      <TaskView cards={await db.task.findMany({
          where: {
            userId: session?.user?.id,
          },
        })}/>
      {/* <TaskView cards={await db.task.findMany()} /> */}
    </div>
  );
};

export default Testing;
