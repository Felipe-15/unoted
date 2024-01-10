import { HTMLAttributes } from "react";
import { IconType } from "react-icons";
import Loader from "./Loader";

interface Props {
  text: string;
  icon?: IconType;
  onClick: () => void;
  outline?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({
  text,
  outline,
  icon: Icon,
  onClick,
  disabled,
  loading,
  ...rest
}: Props & HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...rest}
      disabled={disabled}
      data-outline={outline}
      className={`flex gap-2 data-[outline=true]:border-[1px] data-[outline=true]:text-primary-500 data-[outline=true]:border-primary-500 data-[outline=true]:hover:bg-primary-500 data-[outline=true]:hover:text-secondary-500 bg-primary-500 text-secondary-500 hover:bg-primary-400 items-center justify-center w-full py-2 max-h-[40px] data-[outline=true]:bg-transparent transition rounded-md text-lg disabled:brightness-90 disabled:hover:brightness-90 disabled:hover:bg-primary-500 data-[outline=true]:disabled:hover:bg-transparent data-[outline=true]:disabled:brightness-90 data-[outline=true]:disabled:hover:text-primary-500 disabled:cursor-not-allowed`}
      onClick={onClick}
    >
      {Icon && !loading && <Icon />}
      {loading ? <Loader alternative={outline} /> : text}
    </button>
  );
};

export default Button;
