"use client";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";

const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex gap-2 text-primary-500 cursor-pointer items-center text-lg"
      >
        <BiCategoryAlt />
        <span>Categoria</span>
        <AiFillCaretDown
          size={12}
          className={`transition-all ${isOpen ? "-rotate-180" : "rotate-0"} `}
        />
        <div
          className={`absolute cursor-default flex  rounded-b-md transition-all w-full ${
            !isOpen
              ? "h-0 overflow-hidden bottom-0"
              : "h-[96px] overflow-y-auto scale-y-100 bottom-[-100px]"
          } bg-background-700`}
        >
          <span className="p-1 text-secondary-500 cursor-pointer w-full text-center h-fit border-b-[1px] border-b-gray-400 hover:text-primary-500 transition bg-background-800">
            Faculdade
          </span>
        </div>
      </div>
      <span className="text-lg text-gray-300">Nenhuma</span>
    </div>
  );
};

export default CategoryDropdown;
