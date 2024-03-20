"use client";
import { useRef, useState, useEffect } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import CategoryName from "./CategoryName";

interface Props {
  name: string;
  color: string;
  isNew?: boolean;
  onUpdate: (data: { color?: string; name?: string }) => void;
  onDelete: () => void;
}

const Category = ({ name, color, isNew, onUpdate, onDelete }: Props) => {
  const colorRef = useRef({} as HTMLInputElement);
  const [currentColor, setCurrentColor] = useState(color);

  const handleEditColor = () => {
    setCurrentColor(colorRef.current.value);
    onUpdate({ color: colorRef.current.value });
  };

  useEffect(() => {});

  return (
    <div className="flex group w-[220px] md:w-[260px] shrink-0 items-center">
      <div
        style={{ backgroundColor: currentColor }}
        className="peer mr-4 cursor-pointer transition-[border-radius_width] ease-in-out rounded-[50%] h-[24px] w-[24px] md:h-[32px] md:w-[32px] duration-300 hover:w-[64px] hover:rounded-md shrink-0"
      >
        <input
          type="color"
          ref={colorRef}
          className="w-full h-full opacity-0 cursor-pointer"
          defaultValue={color}
          onBlur={handleEditColor}
        />
      </div>
      <CategoryName isNew={isNew} defaultName={name} onUpdate={onUpdate} />
      <button
        onClick={onDelete}
        className="flex opacity-0 peer-hover:-translate-x-6 peer-hover:opacity-0 -translate-x-6 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 items-center text-xl p-1 cursor-pointer text-secondary-500 hover:text-danger"
      >
        <BsFillTrashFill />
      </button>
    </div>
  );
};

export default Category;
