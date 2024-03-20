"use client";
import { useEffect, useRef } from "react";

interface Props {
  defaultName: string;
  isNew?: boolean;
  onUpdate: ({ name }: { name: string }) => void;
}

const CategoryName = ({ defaultName, isNew, onUpdate }: Props) => {
  const inputRef = useRef({} as HTMLInputElement);

  useEffect(() => {
    if (inputRef) {
      inputRef.current.style.width = `${inputRef.current.value.length}ch`;
    }
    if (isNew) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <input
      ref={inputRef}
      placeholder="Digite..."
      defaultValue={defaultName}
      className="bg-transparent max-w-[200px] outline-none placeholder:text-secondary-500 text-secondary-500 text-2xl md:text-3xl mr-2"
      onBlur={(e) => {
        if (e.target.value !== defaultName) {
          onUpdate({ name: e.target.value });
        }
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter" && e.currentTarget.value !== defaultName) {
          onUpdate({ name: e.currentTarget.value });
        }
      }}
      onChange={(e) => {
        e.target.style.width = `${e.target.value.length}ch`;
      }}
    />
  );
};

export default CategoryName;
