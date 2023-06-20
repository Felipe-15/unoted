import { FiUser } from "react-icons/fi";
import SearchInput from "./SearchInput";

const StandardPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full h-screen flex-col bg-background-800 overflow-hidden">
      <header className="flex w-full justify-between items-center p-6 h-[75px]">
        <SearchInput />
        <div className="flex rounded-full border-[1px] border-secondary-500 p-2 sm:p-0 sm:border-none sm:gap-2 text-secondary-500 items-center justify-center">
          <FiUser size={20} />
          <span className="hidden sm:inline">Olá, Felipe</span>
        </div>
      </header>
      <section className="flex flex-col w-full h-[calc(100vh-75px)] bg-background-900 rounded-tl-2xl px-6 py-4">
        {children}
      </section>
    </section>
  );
};

export default StandardPage;
