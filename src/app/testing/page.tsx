import React from "react";
import { db } from "@/lib/db";
import { auth } from "../../../auth";
import TaskView from "@/components/TaskView";
import Tv2 from "@/components/tv2"

const Testing = async () => {
  const session = await auth();
  return (
    <div className="mt-24 flex h-screen flex-col">
      {/* <TaskView cards={await db.task.findMany({
          where: {
            userId: session?.user?.id,
          },
        })}/> */}
        <Tv2 cards={await db.task.findMany({
          where: {
            userId: session?.user?.id,
          },
        })}/>
    </div>
  );
};

export default Testing;
