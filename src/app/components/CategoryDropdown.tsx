"use client";
import { useState, useEffect, useRef, MouseEvent } from "react";
import { ICategory } from "@/interfaces/Category";
import { AiFillCaretDown } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";

interface Props {
  categories: ICategory[];
  selectedCategory?: ICategory;
  onSelectCategory: (category: ICategory) => void;
}

const CategoryDropdown = ({
  categories,
  onSelectCategory,
  selectedCategory,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOutsideClick = (e: Event) => {
    if (listRef.current && !listRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const listRef = useRef({} as HTMLUListElement);

  useEffect(() => {
    window.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [listRef]);

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex gap-2 text-primary-500 cursor-pointer items-center text-lg"
      >
        <BiCategoryAlt />
        <span>Categoria</span>
        <AiFillCaretDown
          size={12}
          className={`transition-all ${isOpen ? "-rotate-180" : "rotate-0"} `}
        />
        <ul
          ref={listRef}
          data-testid="category-filter-list"
          className={`absolute cursor-default flex flex-col  rounded-b-md transition-all w-full ${
            !isOpen
              ? "h-0 overflow-hidden bottom-0"
              : "h-[96px] overflow-y-auto scale-y-100 bottom-[-100px]"
          } bg-background-700`}
        >
          {!categories?.length && (
            <li className="p-1 pt-2">
              <p className="text-sm cursor-text text-secondary-500 font-semibold leading-tight">
                Sem categorias
              </p>
            </li>
          )}
          {categories?.map((category) => {
            return (
              <li
                key={category.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCategory(category);
                  setTimeout(() => setIsOpen(false), 250);
                }}
                data-selected-category={selectedCategory?.id === category.id}
                className={`p-1 w-full h-1/3 text-center  flex items-center justify-center border-b-[1px] overflow-x-hidden overflow-ellipsis data-[selected-category=true]:bg-background-800 data-[selected-category=true]:cursor-default data-[selected-category=false]:hover:bg-background-800/20 data-[selected-category=true]:text-primary-500 hover:text-primary-500 cursor-pointer text-secondary-500 border-b-zinc-400  transition  whitespace-nowrap text-sm`}
              >
                {category.name}
              </li>
            );
          })}
        </ul>
      </button>
      <p className="text-lg text-gray-300">
        {selectedCategory?.name || "Nenhuma"}
      </p>
    </div>
  );
};

export default CategoryDropdown;
