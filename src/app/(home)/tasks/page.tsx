import "@/styles/scroll.css";
import Link from "next/link";

import StandardPage from "../../components/StandardPage";
import FilterSelector from "../../components/FilterSelector";
import Note from "../../components/Note";

import { BsPlus } from "react-icons/bs";
import TaskNote from "@/app/components/TaskNote";

const HomePage = () => {
  return (
    <StandardPage>
      <>
        <div className="flex w-full h-fit justify-between gap-3 items-center mb-4">
          <div className="flex invisible-scroll h-fit max-w-full sm:max-w-[400px] overflow-x-auto gap-2">
            <FilterSelector text="Hoje" isSelected />
            <FilterSelector text="Amanhã" isSelected={false} />
            <FilterSelector text="Próx. Semana" isSelected={false} />
            <FilterSelector text="Todas" isSelected={false} />
          </div>
          <Link
            href="/tasks/new-task"
            className="absolute bottom-4 right-4 p-2 sm:p-0 text-secondary-500 sm:static rounded-full sm:rounded-none bg-primary-500 sm:bg-transparent flex gap-2 items-center justify-center sm:text-primary-500 transition hover:text-primary-400"
          >
            <BsPlus size={24} />
            <span className="hidden sm:inline whitespace-nowrap">
              Nova tarefa
            </span>
          </Link>
        </div>
        <div className="grid justify-center md:justify-start pr-4 grid-fit gap-4 overflow-y-auto overflow-x-hidden h-[calc(100%-25vh)]">
          <TaskNote
            categorieName="Faculdade"
            expireAt="22 Jun, 2023"
            tasks={[""]}
          />
        </div>
      </>
    </StandardPage>
  );
};

export default HomePage;
