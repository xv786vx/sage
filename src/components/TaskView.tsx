"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click"
import { Task } from "@prisma/client";
import { LuTrash2, LuPenSquare, LuPen } from "react-icons/lu"

interface Props {
    cards: Task[]
}

const TaskView = ( {cards}: Props ) => {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false)

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
    {/* The below controls the background presence when you expand the card. Nothing to do with the card itself */}
    {cards.length == 0 ? (
      <div>Make a task already</div>
    ) : (
      <div>
      <AnimatePresence> 
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-300 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.div
              layoutId={`card-${active.title}`}
              ref={ref}
              className="mt-12 w-[45%] h-[70%] flex flex-col bg-blue-500 sm:rounded-2xl overflow-hidden"
            >
              <div>
                <div className="flex justify-between items-start p-6">
                  <div className="">
                    {/* title in expanded card */}
                    {/* fix the below conditional so that it actually works as intended */}
                    { isEdit == false ? (
                      <motion.h3
                        layoutId={`title-${active.title}`}
                        className="font-bold text-white text-3xl"
                      >
                        {active.title}
                      </motion.h3>

                    ) : (
                      <motion.input
                        layoutId={`title-${active.title}`}
                        className="font-bold text-red-500 text-3xl"
                        type="text"
                        placeholder="Task Name"
                        name="task-name"
                      />
                    )}
                  </div>

                    {/* button (change this to an edit button and duplicate for the delete) */}
                  <motion.button layoutId={`button-${active.title}`} onClick={() => setIsEdit(true)}>
                    <LuPenSquare size={28} className="text-white"/>
                  </motion.button>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-white ml-2 text-lg h-fit pb-10 flex flex-col items-start gap-4 overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]">
                      {active.context}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((cards) => (
            // This div is responsible for the card before expanding 
          <motion.div
            layoutId={`card-${cards.title}`}
            key={`card-${cards.title}`}
            onClick={() => setActive(cards)}
            // div containing everything inside of it 
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-gray-200 rounded-xl cursor-pointer my-4" 
          >
            {/* div containing header (song name) + subtitle (artist) */}
            <div className="flex gap-4 flex-col md:flex-row ">
              <div className="">
                <motion.h3 layoutId={`title-${cards.title}`} className="font-medium text-red-500 text-center md:text-left">
                  {cards.title}
                </motion.h3>
                {/* subtitle (artist name) */}
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
      </div>
    )}
    </>
  );
}

export default TaskView