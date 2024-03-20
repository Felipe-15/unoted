"use client";
import { BsPlus } from "react-icons/bs";

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

const AddCategoryButton = ({ onClick, disabled }: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="flex flex-col gap-3 md:gap-4 items-center justify-center group"
    >
      <div className="p-4 md:p-6 rounded-full bg-background-700 text-background-900 transition group-hover:text-secondary-500 group-hover:bg-primary-500">
        <BsPlus size={32} />
      </div>
      <span className="text-xl text-gray-500 whitespace-nowrap">
        Adicionar categoria
      </span>
    </button>
  );
};

export default AddCategoryButton;
