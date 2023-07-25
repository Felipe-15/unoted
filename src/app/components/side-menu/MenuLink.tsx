import Link from "next/link";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  text: string;
  path: string;
  isSelected: boolean;
}

const MenuLink = ({ icon: Icon, path, text, isSelected }: Props) => {
  return (
    <Link
      href={path}
      data-is-selected={isSelected}
      className={`flex w-full border-l-4 data-[is-selected=true]:border-primary-500 border-transparent lg:hover:pl-6 lg:hover:text-primary-500 text-secondary-500 gap-3 cursor-pointer items-center justify-center lg:justify-start py-2 lg:py-0 lg:pl-4 transition-all duration-400 mb-4`}
    >
      {Icon && <Icon className="shrink-0" size={20} />}
      <span className="hidden lg:inline">{text}</span>
    </Link>
  );
};

export default MenuLink;
