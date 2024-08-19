'use client'

// To-do:
// 3. add a delete button
// 5. add button to export current tasks (only add in functionality to clear localStorage and save all tasks to prisma db)

// Later:
// 2. actually export as a .ics (calendar file)
// 3. fix UI colours
// 4. ???

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";
import { Task } from "@prisma/client";
import { LuTrash2, LuPenSquare, LuCheck, LuPlusSquare } from "react-icons/lu";
import { createDefaultTask, updateTask } from "@/actions/actions";
import { auth } from "../../auth";

interface Props {
  task: Task;
}

const Tv4 = ({ task }: Props) => {
  return (
    <div className="bg-inherit">
      <div className="flex items-start justify-between bg-neutral-800 p-6">
        <form name="update" onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const taskId = task.id

          updateTask(formData, taskId)
        }}>
          <motion.input
            // layoutId={`title-${active.title}`}
            className="bg-inherit text-3xl font-bold text-white decoration-green-300 placeholder-white focus:underline focus:outline-none"
            type="text"
            placeholder="New Task..."
            name="title"
          />

          <motion.button
            layoutId={`button-${task.title}`}
            type="submit"
            className="flex flex-col items-center justify-center"
            >
            <LuCheck
              size={28}
              className="text-white hover:text-neutral-300"
              />
          </motion.button>
          <div className="relative px-4 pt-4">
            <motion.input
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              placeholder="Describe your task here..."
              name="context"
              className="mx-2 flex h-min w-[98%] flex-col items-start overflow-auto bg-inherit pb-10 text-lg text-white decoration-green-300 placeholder-white [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] focus:underline focus:outline-none"
            />
          </div>
        </form>
      </div>
      {/* <div className="flex justify-between px-16 pt-8">
                      <div className="mx-5">
                        <fieldset className="border border-white rounded-md pb-2 px-2">
                          <legend className="text-white text-sm px-1">Start Date</legend>
                          <input className="bg-transparent text-white focus:outline-none text-md w-72" type="datetime-local"/>
                        </fieldset>
                      </div>
                      <div className="mx-5">
                        <fieldset className="border border-white rounded-md pb-2 px-2">
                          <legend className="text-white text-sm px-1">End Date</legend>
                          <input className="bg-transparent text-white focus:outline-none text-md w-72" type="datetime-local"/>
                        </fieldset>
                      </div>
                    </div> */}
      {/* <div className="flex flex-col items-center mx-auto pt-16">
                      <select name="Priority" className="peer font-sans block text-xl rounded-lg border p-2 bg-neutral-900 text-white font-semibold">
                        <option className="text-green-300">Low</option>
                        <option className="text-yellow-300">Medium</option>
                        <option className="text-red-300">High</option>
                      </select>
                    </div> */}
      {/* <div>
                      
                    </div> */}
    </div>
  );
};

export default Tv4;
