"use client";

import { HTMLAttributes, HTMLInputTypeAttribute, useState } from "react";
import { IconType } from "react-icons";

import { openSans } from "../fonts";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

interface Props {
  registerField?: any;
  error?: string;
  icon?: IconType;
  type?: HTMLInputTypeAttribute;
  visibility?: boolean;
}

const Input = ({
  registerField,
  icon: Icon,
  type,
  visibility,
  error,
  ...rest
}: Props & HTMLAttributes<HTMLInputElement>) => {
  const [focus, setFocus] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="w-full max-w-[280px]">
      <div
        data-testid="input-holder"
        className={`w-full rounded-md transition flex gap-2 p-2 pr-0 bg-background-700 text-lg items-center border-[1px] ${
          focus
            ? "border-primary-500 shadow-primary-500/20 shadow-md "
            : error
            ? "border-danger"
            : "border-transparent"
        }`}
      >
        {Icon && <Icon data-testid="input-icon" className="text-primary-500" />}
        <input
          {...rest}
          {...registerField}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          type={type === "password" && isVisible ? "text" : type || "text"}
          className={`${openSans.className} w-full text-secondary-500 font-normal bg-transparent outline-none`}
        />
        {visibility && (
          <div
            className="text-gray-400 transition hover:text-primary-500 cursor-pointer px-1"
            onClick={() => setIsVisible((prev) => !prev)}
          >
            {isVisible ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
          </div>
        )}
      </div>
      <small className="text-sm text-danger h-1">{error}</small>
    </div>
  );
};

export default Input;
