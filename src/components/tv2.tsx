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
import Tv3 from "./tv3";
import Tv4 from "./tv4";
interface Props {
  cards: Task[];
}

const Tv2 = ({ cards }: Props) => {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null,
  );
  const ref = useRef<HTMLDivElement>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(50)

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

  useOutsideClick(ref, () => setActive(null));

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
                    <Tv3 task={active}/>
                  ) : (
                    <Tv4 task={active}/>
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
                    <LuTrash2 size={24} className="text-red-600 hover:text-red-400"/>
                  </button>
                  <button>
                    <LuPenSquare size={24} className="text-blue-600 hover:text-blue-400 ml-4" onClick={()=>{setActive(cards), setIsEdit(true)}} />
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
