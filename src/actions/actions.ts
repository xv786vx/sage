"use server";

import { Priority, Task } from "@prisma/client";
import { db } from "../lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "../../auth";

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

  // console.log(
  //   "trying to fetch userId from createDefaultTask" + session?.user?.id,
  // );

  revalidatePath("/testing"); //change this redirect url to the actual one when done or find a better solution to refresh the page
}

export async function updateTask(formData: FormData, id: number) {
  await db.task.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      context: formData.get("context") as string,
      priority: Priority.LOW,
    },
  });

  console.log(formData.get("title") as string);
  console.log(formData.get("context") as string);
}
