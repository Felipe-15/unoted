import { User } from "@/interfaces/User";
import SearchInput from "./SearchInput";
import Image from "next/image";
import { FiUser } from "react-icons/fi";
import SkeletonUser from "./Skeletons/single-skeletons/SkeletonUser";

interface Props {
  user?: User;
  headerType?: "full" | "noSearch";
  onSearch?: (search: string) => void;
}

const Header = ({ headerType, onSearch, user }: Props) => {
  return (
    <header
      data-header-type={headerType}
      className={`flex w-full data-[header-type=noSearch]:justify-end justify-between items-center p-6 h-[75px]`}
    >
      {headerType !== "noSearch" && onSearch && (
        <SearchInput onSearch={onSearch} />
      )}
      {user?.name ? (
        <div className="flex rounded-full border-[1px] border-secondary-500 sm:p-0 sm:border-none sm:gap-2 text-secondary-500 items-center justify-center overflow-hidden group">
          {user?.photo ? (
            <div className="rounded-full max-h-[32px] max-w-[32px] flex items-center justify-center overflow-hidden cursor-pointer">
              <Image
                src={user.photo}
                alt="Foto de perfil"
                width={32}
                height={32}
                className="w-full h-auto transition hover:brightness-75"
              />
            </div>
          ) : (
            <FiUser size={20} />
          )}
          <span className="hidden sm:inline">
            Olá, {user?.name?.split(" ")[0]}
          </span>
        </div>
      ) : (
        <SkeletonUser />
      )}
    </header>
  );
};

export default Header;
