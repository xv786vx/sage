"use client";

// To-do:
// 3. add a delete button
// 5. add button to export current tasks (only add in functionality to clear localStorage and save all tasks to prisma db)

// Later:
// 2. actually export as a .ics (calendar file)
// 3. fix UI colours
// 4. ???

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";
import { Task } from "@prisma/client";
import { LuTrash2, LuPenSquare, LuCheck, LuPlusSquare } from "react-icons/lu";
import { createDefaultTask, updateTask } from "@/actions/actions";
import { auth } from "../../auth";

interface Props {
    task: Task;
  }

const Tv3 = ({task}: Props) => {
    return (
        <div className="bg-inherit">
            <div className="flex items-start justify-between p-6 bg-neutral-800">
                <motion.h3 className="text-3xl font-bold text-white">
                    {task.title}
                </motion.h3>
                    </div>
                    <div className="relative px-4 pt-4">
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="ml-2 flex h-fit flex-col items-start gap-4 overflow-auto pb-10 text-lg text-white [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none]"
                      >
                        {task.context}
                      </motion.div>
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
    )
}

export default Tv3