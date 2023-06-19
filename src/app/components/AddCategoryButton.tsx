"use client";
import { BsPlus } from "react-icons/bs";

interface Props {
  onClick: () => void;
}

const AddCategoryButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-4 items-center justify-center group"
    >
      <div className="p-6 rounded-full bg-background-700 text-background-900 transition group-hover:text-secondary-500 group-hover:bg-primary-500">
        <BsPlus size={40} />
      </div>
      <span className="text-xl text-gray-500 whitespace-nowrap">
        Adicionar categoria
      </span>
    </button>
  );
};

export default AddCategoryButton;
