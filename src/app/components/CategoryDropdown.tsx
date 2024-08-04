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
          className={`absolute cursor-default flex flex-col gap-1 rounded-t-sm rounded-b-md transition-all w-[150%] ${
            !isOpen
              ? "h-0 overflow-hidden bottom-0"
              : "h-[160px] overflow-y-auto scale-y-100 bottom-[-160px] p-2 right-1"
          } bg-secondary-500`}
        >
          {!categories?.length && (
            <li className="p-1 pt-2">
              <p className="text-sm cursor-text text-background-900 font-semibold leading-tight">
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
                className={`w-full flex items-center text-background-900 pl-3 py-2 border-b-[1px] overflow-ellipsis data-[selected-category=true]:bg-background-600 data-[selected-category=true]:cursor-default data-[selected-category=false]:hover:bg-gray-100 data-[selected-category=true]:text-secondary-500  cursor-pointer hover:shadow-md hover:border-transparent justify-between border-b-background-900 hover:rounded-md data-[selected-category=true]:rounded-md  transition-all text-base group`}
              >
                {category.name}
                <div
                  style={{ backgroundColor: category.color }}
                  data-selected-category={selectedCategory?.id === category.id}
                  className="p-2 rounded-md mr-2 shadow-sm transition-all group-hover:rounded-sm data-[selected-category=true]:rounded-sm"
                ></div>
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
