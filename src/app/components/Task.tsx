"use client";
import "@/styles/animations.css";
import "@/styles/scroll.css";

import { useRef, useState } from "react";
import { openSans } from "../fonts";

import { BsCheck, BsFillTrashFill } from "react-icons/bs";

interface Props {
  checked: boolean;
  text: string;
  editable?: boolean;
  onEdit?: (text: string) => void;
  onToggleCheck: (checked: boolean) => void;
  onDelete: () => void;
  animationOnRemove?: boolean;
}

const Task = ({
  checked,
  text,
  editable,
  animationOnRemove,
  onEdit,
  onToggleCheck,
  onDelete,
}: Props) => {
  const [currentChecked, setCurrentChecked] = useState(checked);
  const contentRef = useRef({} as HTMLParagraphElement);
  const taskRef = useRef({} as HTMLLIElement);

  const handleCheck = () => {
    if (animationOnRemove && !currentChecked) {
      setCurrentChecked((prev) => !prev);
      taskRef.current.classList.add("remove-task");
      setTimeout(() => {
        onToggleCheck(!currentChecked);
      }, 1200);
    } else {
      onToggleCheck(!currentChecked);
      setCurrentChecked((prev) => !prev);
    }
  };
  return (
    <li
      data-is-editable={editable}
      className="flex gap-2 data-[is-editable=true]:h-fit hover:h-[48px] h-[24px] [&:not(:last-child)]:mb-2 w-full group transition-all"
      ref={taskRef}
    >
      <div className="relative flex h-[24px] w-[24px] shrink-0">
        <input
          type="checkbox"
          className="absolute peer opacity-0 inset-0 cursor-pointer"
          defaultChecked={checked}
          checked={currentChecked}
          onChange={handleCheck}
        />
        <span className="h-full w-full flex items-center justify-center text-secondary-500 peer-checked:bg-primary-500 peer-checked:border-primary-500 transition rounded-sm border-2 border-secondary-500">
          {currentChecked && <BsCheck id="draw-svg" size={24} />}
        </span>
      </div>
      <p
        contentEditable={editable}
        ref={contentRef}
        data-current-checked={currentChecked}
        data-is-editable={editable}
        onBlur={
          editable && onEdit
            ? () => {
                if (contentRef.current.innerText !== text) {
                  onEdit(contentRef.current.innerText);
                }
              }
            : () => null
        }
        className={`${openSans.className} invisible-scroll font-normal overflow-hidden
        whitespace-nowrap group-hover:whitespace-normal group-hover:overflow-y-scroll text-secondary-500 data-[current-checked=true]:line-through data-[current-checked=true]:text-gray-500 data-[is-editable=true]:sm:max-w-[80%] data-[is-editable=true]:h-fit data-[is-editable=false]:whitespace-nowrap text-ellipsis`}
      >
        {text}
      </p>
      <button
        onClick={() => onDelete()}
        className="flex align-top pt-1 opacity-0 transition -translate-x-2 text-secondary-500 hover:text-danger group-hover:opacity-100 group-hover:-translate-x-0"
      >
        <BsFillTrashFill />
      </button>
    </li>
  );
};

export default Task;
