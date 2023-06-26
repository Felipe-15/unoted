"use client";
import "@/styles/animations.css";

import { useRef, useState } from "react";
import { openSans } from "../fonts";

import { BsCheck } from "react-icons/bs";

interface Props {
  checked: boolean;
  text: string;
  editable?: boolean;
  onEdit?: (text: string) => void;
  onToggleCheck: (checked: boolean) => void;
  animationOnRemove?: boolean;
}

const Task = ({
  checked,
  text,
  editable,
  animationOnRemove,
  onEdit,
  onToggleCheck,
}: Props) => {
  const [currentChecked, setCurrentChecked] = useState(checked);
  const contentRef = useRef({} as HTMLParagraphElement);
  const taskRef = useRef({} as HTMLDivElement);

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
    <div className="flex gap-2 h-[24px]" ref={taskRef}>
      <div className="relative flex h-[24px] w-[24px]">
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
        onBlur={
          editable && onEdit
            ? () => {
                if (contentRef.current.innerText !== text) {
                  onEdit(contentRef.current.innerText);
                }
              }
            : () => null
        }
        className={`${
          openSans.className
        } font-semibold overflow-hidden font-normal  ${
          currentChecked ? "line-through text-gray-500" : "text-secondary-500"
        } whitespace-nowrap text-ellipsis`}
      >
        {text}
      </p>
    </div>
  );
};

export default Task;
