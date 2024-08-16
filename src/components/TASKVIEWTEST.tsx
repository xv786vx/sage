"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click"
import { Task } from "@prisma/client";

interface Props {
    cards: Task[]
}

const ExpandableCardDemo = ( {cards}: Props ) => {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);

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
              className="mt-12 w-[45%] h-[70%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-2xl overflow-hidden"
            >

              <div>
                <div className="flex justify-between items-start p-6">
                  <div className="">
                    {/* title in expanded card */}
                    <motion.h3
                      layoutId={`title-${active.title}`}
                      className="font-bold text-white text-3xl"
                    >
                      {active.title}
                    </motion.h3>
                  </div>

                    {/* button (change this to an edit button and duplicate for the delete) */}
                  <motion.a
                    layoutId={`button-${active.title}`}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white cursor-pointer"
                  >
                    edit
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-white ml-2 text-lg h-fit pb-10 flex flex-col items-start gap-4 overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    active.context
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((cards, index) => (
            // This div is responsible for the card before expanding 
          <motion.div
            layoutId={`card-${cards.title}`}
            key={`card-${cards.title}`}
            onClick={() => setActive(cards)}
            // div containing everything inside of it 
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer" 
          >
            {/* div containing header (song name) + subtitle (artist) */}
            <div className="flex gap-4 flex-col md:flex-row ">
              <motion.div layoutId={`image-${cards.title}`}>
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${cards.title}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {cards.title}
                </motion.h3>
                {/* subtitle (artist name) */}
              </div>
            </div>
            <motion.button
              layoutId={`button-${cards.title}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
            >
              edit
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export default ExpandableCardDemo