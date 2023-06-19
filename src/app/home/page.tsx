import "@/styles/scroll.css";
import StandardPage from "../components/side-menu/StandardPage";

import { BsPlus } from "react-icons/bs";
import CategorySelector from "../components/CategorySelector";
import Note from "../components/Note";

const HomePage = () => {
  return (
    <StandardPage>
      <>
        <div className="flex w-full h-fit justify-between gap-3 items-center mb-4">
          <div className="flex invisible-scroll h-fit max-w-full sm:max-w-[300px] overflow-x-auto gap-2">
            <CategorySelector text="Todas" isSelected />
            <CategorySelector text="Faculdade" isSelected={false} />
            <CategorySelector text="Trabalho" isSelected={false} />
            <CategorySelector text="Férias" isSelected={false} />
            <CategorySelector text="Ideias" isSelected={false} />
          </div>
          <button className="absolute bottom-4 right-4 p-2 sm:p-0 text-secondary-500 sm:static rounded-full sm:rounded-none bg-primary-500 sm:bg-transparent flex gap-2 items-center justify-center sm:text-primary-500 transition hover:text-primary-400">
            <BsPlus size={24} />
            <span className="hidden sm:inline whitespace-nowrap">
              Nova nota
            </span>
          </button>
        </div>
        <div className="grid justify-center md:justify-start pr-4 grid-fit gap-4 overflow-y-auto overflow-x-hidden h-[calc(100%-25vh)]">
          <Note
            title="Arquétipo de Projeto"
            createdAt="22 Jun, 2023"
            content="Mudar a estratégia de prototipação ajustando o modelo para envio de SMS via nodemailer."
          />
          <Note
            title="Arquétipo de Projeto"
            createdAt="22 Jun, 2023"
            content="Mudar a estratégia de prototipação ajustando o modelo para envio de SMS via nodemailer."
          />
          <Note
            title="Arquétipo de Projeto"
            createdAt="22 Jun, 2023"
            content="Mudar a estratégia de prototipação ajustando o modelo para envio de SMS via nodemailer."
          />
        </div>
      </>
    </StandardPage>
  );
};

export default HomePage;
