"use client";

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
  cards: Task[];
}

const Tv2 = ({ cards }: Props) => {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null,
  );
  const ref = useRef<HTMLDivElement>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(50);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => {
    setActive(null), setIsEdit(false);
  });

  return (
    <>
      <div className="absolute bottom-8 z-0">
        <button className="group relative flex h-20 w-20 items-center justify-center rounded-2xl duration-300 ease-in-out hover:bg-black">
          <LuPlusSquare
            size="48"
            className="text-black duration-300 ease-in-out group-hover:rotate-90 group-hover:text-white"
            onClick={() => {
              createDefaultTask();
            }}
          />
          <span className="sidebar-tooltip absolute left-20 m-2 w-auto min-w-max origin-left scale-0 rounded-md bg-gray-900 p-2 text-base font-bold text-white shadow-md transition-all duration-100 group-hover:scale-100">
            Create Task
          </span>
        </button>
      </div>
      {/* The below controls the background presence when you expand the card. Nothing to do with the card itself */}
      {cards.length == 0 ? (
        <div className="flex flex-col items-center">Make a task already</div>
      ) : (
        <div>
          <AnimatePresence>
            {active && typeof active === "object" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-10 h-full w-full bg-gray-300"
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {active && typeof active === "object" ? (
              <div className="fixed inset-0 z-[100] grid place-items-center">
                <motion.div
                  layoutId={`card-${active.title}`}
                  ref={ref}
                  className="mt-12 flex h-[70%] w-[45%] flex-col overflow-hidden bg-neutral-900 sm:rounded-2xl"
                >
                  {isEdit == false ? (
                    <div className="bg-inherit">
                      <div className="flex items-start justify-between bg-neutral-800 p-6">
                        <motion.h3 className="text-3xl font-bold text-white">
                          {active.title}
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
                          {active.context}
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
                  ) : (
                    <div className="bg-inherit">
                      <form
                        name="update"
                        onSubmit={(e: FormEvent<HTMLFormElement>) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          const taskId = active.id;

                          updateTask(formData, taskId);
                        }}
                      >
                        <div className="flex items-start justify-between bg-neutral-800 p-6">
                          <motion.input
                            // layoutId={`title-${active.title}`}
                            className="bg-inherit text-3xl font-bold text-white decoration-green-300 placeholder-white focus:underline focus:outline-none"
                            type="text"
                            placeholder={`${active.title}` + "..."}
                            name="title"
                          />

                          <motion.button
                            layoutId={`button-${active.title}`}
                            type="submit"
                            className="items-center justify-center"
                            onClick={()=>setActive(null)}
                          >
                            <LuCheck
                              size={28}
                              className="text-white hover:text-neutral-300"
                            />
                          </motion.button>
                        </div>
                        <div className="relative px-4 pt-4">
                          <motion.input
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            placeholder={`${active.context}` + "..."}
                            name="context"
                            className="mx-2 flex h-min w-[98%] flex-col items-start overflow-auto bg-inherit pb-10 text-lg text-white decoration-green-300 placeholder-white [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] focus:underline focus:outline-none"
                          />
                        </div>
                      </form>
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
                  )}
                </motion.div>
              </div>
            ) : null}
          </AnimatePresence>
          <ul className="mx-auto w-full max-w-2xl gap-4">
            {cards.map((cards) => (
              // This div is responsible for the card before expanding
              <motion.div
                layoutId={`card-${cards.title}`}
                key={`card-${cards.title}`}
                onClick={() => setActive(cards)}
                // div containing everything inside of it
                className="my-4 flex cursor-pointer flex-col items-center justify-between rounded-xl p-4 hover:bg-gray-200 md:flex-row"
              >
                {/* div containing header (song name) + subtitle (artist) */}
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${cards.title}`}
                      className="text-center font-medium text-blue-500 md:text-left"
                    >
                      {cards.title}
                    </motion.h3>
                    {/* subtitle (artist name) */}
                  </div>
                </div>
                <div className="mt-1">
                  <button>
                    <LuTrash2
                      size={24}
                      className="text-red-600 hover:text-red-400"
                    />
                  </button>
                  <button>
                    <LuPenSquare
                      size={24}
                      className="ml-4 text-blue-600 hover:text-blue-400"
                      onClick={() => {
                        setActive(cards), setIsEdit(true);
                      }}
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Tv2;
