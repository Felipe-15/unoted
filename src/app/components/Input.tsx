"use client";

import { HTMLAttributes, HTMLInputTypeAttribute, useState } from "react";
import { IconType } from "react-icons";

import { openSans } from "../fonts";

interface Props {
  registerField?: any;
  icon: IconType;
  type?: HTMLInputTypeAttribute;
}

const Input = ({
  registerField,
  icon: Icon,
  type,
  ...rest
}: Props & HTMLAttributes<HTMLInputElement>) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className="w-full max-w-[280px]">
      <div
        className={`w-full rounded-md transition flex gap-3 p-2 bg-background-700 text-lg items-center border-[1px] ${
          focus
            ? "border-primary-500 shadow-primary-500/20 shadow-md "
            : "border-transparent"
        }`}
      >
        {Icon && <Icon className="text-primary-500" />}
        <input
          {...rest}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          type={type || "text"}
          className={`${openSans.className} w-full text-secondary-500 font-normal bg-transparent outline-none`}
        />
      </div>
      <small></small>
    </div>
  );
};

export default Input;
