import { BiSearch } from "react-icons/bi";
import { FiUser } from "react-icons/fi";

const StandardPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full h-screen flex-col bg-background-800 overflow-hidden">
      <header className="flex w-full justify-between items-center p-6">
        <div className="flex gap-3 text-secondary-500 text-xl  items-center">
          <BiSearch />
          <input
            placeholder="Buscar"
            className="placeholder:text-secondary-500 bg-transparent"
          />
        </div>
        <div className="flex gap-2 text-secondary-500 items-center justify-center">
          <FiUser size={20} />
          <span>Olá, Felipe</span>
        </div>
      </header>
      <section className="flex w-full h-full bg-background-900 rounded-tl-2xl">
        {children}
      </section>
    </section>
  );
};

export default StandardPage;
