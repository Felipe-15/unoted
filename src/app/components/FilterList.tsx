"use client";
import "@/styles/scroll.css";
import "@/styles/animations.css";

import { ICategory } from "@/interfaces/Category";

import FilterSelector from "./FilterSelector";
import { useEffect, useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";

import { AnimatePresence, motion } from "framer-motion";

import { MdOutlineKeyboardArrowLeft as LeftArrowIcon } from "react-icons/md";
import { MdOutlineKeyboardArrowRight as RightArrowIcon } from "react-icons/md";

interface Props {
  children: React.ReactNode;
  dinamicConfig?: {
    selectedFilter: ICategory | null;
    dinamicFilters: ICategory[];
    onSelectFilter: (category: ICategory) => void;
  };
}

const FilterList = ({ children, dinamicConfig }: Props) => {
  const dragRef = useRef<HTMLUListElement>({} as any);
  const { events } = useDraggable(dragRef, { applyRubberBandEffect: true });
  const [arrowConditions, setArrowContidions] = useState<{
    general: boolean;
    right: boolean;
    left: boolean;
  }>({} as any);
  const generateFilters = () => {
    if (!dinamicConfig) return;

    const { dinamicFilters, onSelectFilter, selectedFilter } = dinamicConfig;

    return dinamicFilters.map((category) => (
      <FilterSelector
        key={category.id}
        isSelected={category.id === selectedFilter?.id}
        text={category.name}
        onSelect={() => onSelectFilter(category)}
      />
    ));
  };

  const handleScroll = () => {
    if (arrowConditions.general) {
      if (
        Math.round(dragRef.current.scrollLeft + dragRef.current.clientWidth) >=
        dragRef.current.scrollWidth
      ) {
        setArrowContidions((prev) => ({ ...prev, right: false }));
      } else {
        setArrowContidions((prev) => ({ ...prev, right: true }));
      }
      if (
        !(
          Math.round(
            dragRef.current.scrollLeft + dragRef.current.clientWidth
          ) >= dragRef.current.scrollWidth
        )
      ) {
        setArrowContidions((prev) => ({ ...prev, left: false }));
      } else {
        setArrowContidions((prev) => ({ ...prev, left: true }));
      }
    }
  };

  useEffect(() => {
    setArrowContidions({
      general: dragRef.current.scrollWidth > dragRef.current.clientWidth,
      left:
        Math.round(dragRef.current.scrollLeft + dragRef.current.clientWidth) >=
        dragRef.current.scrollWidth,
      right: !(
        Math.round(dragRef.current.scrollLeft + dragRef.current.clientWidth) >=
        dragRef.current.scrollWidth
      ),
    });
  }, []);

  return (
    <div className="relative flex items-center">
      <AnimatePresence>
        {arrowConditions.general && arrowConditions.left && (
          <motion.button
            initial={{ x: -25, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -25, opacity: 0 }}
            onClick={() =>
              dragRef.current.scrollBy({
                left: -Math.floor(dragRef.current.scrollLeft),
                behavior: "smooth",
              })
            }
            className="absolute z-10 -left-5 p-1 -mt-4 rounded-full text-lg transition-all hover:bg-background-600 text-primary-500 hover:text-secondary-500 pulse-left"
          >
            <LeftArrowIcon />
          </motion.button>
        )}
      </AnimatePresence>
      <ul
        className="relative flex cursor-grab active:cursor-grabbing pb-3 h-fit max-w-full sm:max-w-[660px] overflow-x-scroll gap-2 invisible-scroll"
        {...events}
        ref={dragRef}
        onClick={() => {
          console.log("scrollWidth");
          console.log("clientWidth");
        }}
        onScroll={handleScroll}
      >
        {children}
        {generateFilters()}
      </ul>
      <AnimatePresence>
        {arrowConditions.general && arrowConditions.right && (
          <motion.button
            initial={{ x: 25, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 15, opacity: 0 }}
            onClick={() =>
              dragRef.current.scrollBy({
                left: Math.floor(
                  dragRef.current.scrollWidth -
                    dragRef.current.clientWidth -
                    dragRef.current.scrollLeft
                ),
                behavior: "smooth",
              })
            }
            className="absolute z-10 -right-5 p-1 -mt-4 rounded-full text-lg transition-all hover:bg-background-600 text-primary-500 hover:text-secondary-500 pulse-right"
          >
            <RightArrowIcon />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterList;
