"use server";

import { Priority, Task } from "@prisma/client";
import { db } from "../lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "../../auth";
import { sessionId } from "@/lib/sessiontracker";

export async function createDefaultTask() {
  const session = await auth();
  await db.task.create({
    data: {
      title: "New Task",
      context: "Describe your task here",
      priority: Priority.MEDIUM,
      userId: session?.user?.id,
      sessionId: sessionId,
    },
  });

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

  revalidatePath("/testing");
}

export async function deleteTask(id: number) {
  await db.task.delete({
    where: { id },
  });

  revalidatePath("/testing");
}

export async function makeSchedule() {
  const tasks: Task[] = await db.task.findMany({
    where: {
      sessionId: sessionId,
    },
  });

  await db.schedule.create({
    data: {
      tasks: {
        connect: tasks.map((task) => ({ id: task.id })),
      },
    },
  });

  console.log(tasks.map((task) => ({ id: task.id })));
  console.log(tasks);
}
