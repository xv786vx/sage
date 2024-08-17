"use server";

import { Priority, Task } from "@prisma/client";
import { db } from "../lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "../../auth";

// export interface Props {
//   index: number;
//   task: Task;
// }

export async function createDefaultTask() {
  const session = await auth();
  await db.task.create({
    data: {
      title: "New Task",
      context: "Describe your task here",
      priority: Priority.MEDIUM,
      userId: session?.user?.id,
    },
  });

  console.log(
    "trying to fetch userId from createDefaultTask" + session?.user?.id,
  );

  revalidatePath("/testing"); //change this redirect url to the actual one when done or find a better solution to refresh the page
}
