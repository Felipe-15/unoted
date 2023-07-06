"use client";
import { useRef, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import CategoryName from "./CategoryName";

interface Props {
  name: string;
  color: string;
  onUpdate: (data: { color?: string; name?: string }) => void;
  onDelete: () => void;
}

const Category = ({ name, color, onUpdate, onDelete }: Props) => {
  const colorRef = useRef({} as HTMLInputElement);
  const [currentColor, setCurrentColor] = useState(color);

  const handleEditColor = () => {
    setCurrentColor(colorRef.current.value);
    onUpdate({ color: colorRef.current.value });
  };

  return (
    <div className="flex group w-[260px] shrink-0">
      <div
        style={{ backgroundColor: currentColor }}
        className="peer mr-4 cursor-pointer transition-[border-radius_width] ease-in-out rounded-[50%] h-[32px] w-[32px] duration-300 hover:w-[64px] hover:rounded-md shrink-0"
      >
        <input
          type="color"
          ref={colorRef}
          className="w-full h-full opacity-0 cursor-pointer"
          defaultValue={color}
          onBlur={handleEditColor}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleEditColor();
            }
          }}
        />
      </div>
      <CategoryName defaultName={name} onUpdate={onUpdate} />
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
