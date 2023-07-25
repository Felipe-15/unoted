import Image from "next/image";
import SearchInput from "./SearchInput";

import { FiUser } from "react-icons/fi";
import { User } from "@/interfaces/User";

interface Props {
  user?: User;
  headerType?: "full" | "noSearch";
  onSearch?: (search: string) => void;
}

const StandardPage = ({
  children,
  user,
  onSearch,
  headerType,
}: Props & { children: React.ReactNode }) => {
  return (
    <section className="w-full h-screen flex-col bg-background-800 overflow-hidden">
      <header
        data-header-type={headerType}
        className={`flex w-full data-[header-type=noSearch]:justify-end justify-between items-center p-6 h-[75px]`}
      >
        {headerType !== "noSearch" && onSearch && (
          <SearchInput onSearch={onSearch} />
        )}
        <div className="flex rounded-full border-[1px] border-secondary-500 sm:p-0 sm:border-none sm:gap-2 text-secondary-500 items-center justify-center overflow-hidden group">
          {user?.photo ? (
            <div className="rounded-full max-h-[32px] max-w-[32px] flex items-center justify-center overflow-hidden cursor-pointer">
              <Image
                src={user.photo}
                alt="Foto de perfil"
                width={24}
                height={24}
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
      </header>
      <section className="flex flex-col w-full h-[calc(100vh-75px)] bg-background-900 rounded-tl-2xl px-6 py-4">
        {children}
      </section>
    </section>
  );
};

export default StandardPage;
