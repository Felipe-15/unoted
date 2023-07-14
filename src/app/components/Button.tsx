"use client";
import { HTMLAttributes } from "react";
import { IconType } from "react-icons";

interface Props {
  text: string;
  icon?: IconType;
  onClick: () => void;
  outline?: boolean;
  disabled?: boolean;
}

const Button = ({
  text,
  outline,
  icon: Icon,
  onClick,
  disabled,
  ...rest
}: Props & HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...rest}
      className={`flex gap-2 ${
        outline
          ? "border-[1px] text-primary-500 border-primary-500 hover:bg-primary-500 hover:text-secondary-500"
          : "bg-primary-500 text-secondary-500 hover:bg-primary-400"
      } items-center justify-center w-full py-2 max-h-[40px] transition rounded-md  text-lg`}
      onClick={onClick}
    >
      {Icon && <Icon />}
      {text}
    </button>
  );
};

export default Button;
