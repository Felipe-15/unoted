"use client";
import { ICategory } from "@/interfaces/Category";
import { useState } from "react";
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
          data-testid="category-filter-list"
          className={`absolute cursor-default flex flex-col  rounded-b-md transition-all w-full ${
            !isOpen
              ? "h-0 overflow-hidden bottom-0"
              : "h-[96px] overflow-y-auto scale-y-100 bottom-[-100px]"
          } bg-background-700`}
        >
          {!categories?.length && (
            <li>
              <span className="text-sm cursor-text text-secondary-500 font-semibold leading-tight">
                Não há categorias ainda
              </span>
            </li>
          )}
          {categories?.map((category) => {
            return (
              <li key={category.id}>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCategory(category);
                  }}
                  data-selected-category={selectedCategory?.id === category.id}
                  className={`p-1 w-full text-center h-1/3 flex items-center justify-center [&:not(:last-child)]:border-b-[1px] overflow-x-hidden overflow-ellipsis data-[selected-category=true]:bg-background-800 data-[selected-category=true]:cursor-default data-[selected-category=true]:text-primary-500 hover:text-primary-500 cursor-pointer text-secondary-500 [&:not(:last-child)]:border-b-gray-500  transition  whitespace-nowrap text-sm`}
                >
                  {category.name}
                </span>
              </li>
            );
          })}
        </ul>
      </button>
      <span className="text-lg text-gray-300">
        {selectedCategory?.name || "Nenhuma"}
      </span>
    </div>
  );
};

export default CategoryDropdown;
