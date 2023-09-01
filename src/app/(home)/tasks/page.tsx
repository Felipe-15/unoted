"use client";
import "@/styles/scroll.css";
import usePage from "./usePage";
import Link from "next/link";

import emptyEmoji from "../../../../public/empty-emoji.png";

import StandardPage from "../../components/StandardPage";
import FilterSelector from "../../components/FilterSelector";
import Note from "../../components/Note";

import { BsPlus } from "react-icons/bs";
import TaskNote from "@/app/components/TaskNote";
import { formatDate } from "@/utils/formatDate";
import { FaTasks } from "react-icons/fa";
import Image from "next/image";

import FilterList from "@/app/components/FilterList";
import SkeletonTaskList from "@/app/components/Skeletons/SkeletonTaskList";

const ONE_DAY_MILLIS = 1000 * 60 * 60 * 24;

const filterDates = {
  today: 0,
  tomorrow: ONE_DAY_MILLIS,
  nextWeek: ONE_DAY_MILLIS * 7,
};

const TasksPage = () => {
  const {
    user,
    selectedDate,
    isLoading,
    tasks,
    filteredCategories,
    filteredTasks,
    showChecked,
    handleSearch,
    setSelectedDate,
    handleToggleCheck,
    handleFilterChecked,
  } = usePage();

  return (
    <StandardPage user={user} onSearch={handleSearch}>
      <>
        <header className="flex w-full h-fit justify-between gap-3 items-center mb-4">
          <FilterList>
            <FilterSelector
              text="Hoje"
              onSelect={() => setSelectedDate(filterDates.today)}
              isSelected={selectedDate === filterDates.today}
            />
            <FilterSelector
              text="Amanhã"
              onSelect={() => setSelectedDate(filterDates.tomorrow)}
              isSelected={selectedDate === filterDates.tomorrow}
            />
            <FilterSelector
              text="Próx. Semana"
              onSelect={() => setSelectedDate(filterDates.nextWeek)}
              isSelected={selectedDate === filterDates.nextWeek}
            />
            <FilterSelector
              text="Todas"
              onSelect={() => setSelectedDate(null)}
              isSelected={selectedDate === null}
            />
          </FilterList>
          <Link
            href="/tasks/new-task"
            className="fixed z-10 bottom-4 right-4 p-2 sm:p-0 text-secondary-500 sm:static rounded-full sm:rounded-none bg-primary-500 sm:bg-transparent flex gap-2 items-center justify-center sm:text-primary-500 transition hover:text-primary-400"
          >
            <BsPlus size={24} />
            <p className="hidden sm:inline whitespace-nowrap">Nova tarefa</p>
          </Link>
        </header>
        {isLoading && <SkeletonTaskList />}
        {!tasks?.length && !isLoading && (
          <article className="flex items-center justify-center gap-3 w-full flex-1 pb-10">
            <Image src={emptyEmoji} width={64} height={64} alt="Empty data" />
            <p className="font-bold text-secondary-500 text-xl">
              Não há tarefas ainda...
            </p>
          </article>
        )}
        {!!tasks?.length && (
          <section className="grid justify-center md:justify-start pr-4 grid-fit gap-4 overflow-y-auto overflow-x-hidden h-[calc(100%-10vh)]">
            {filteredCategories?.length ? (
              filteredCategories.map((c) => {
                const currentTasks = filteredTasks?.length
                  ? filteredTasks.filter((t) => t.category_id === c.id)
                  : [];
                if (!currentTasks?.length) return <></>;
                return (
                  <TaskNote
                    {...c}
                    key={c.id}
                    expireAt={
                      selectedDate === null
                        ? selectedDate
                        : selectedDate === 0
                        ? formatDate(Date.now())
                        : formatDate(Date.now() + selectedDate)
                    }
                    categorieName={c.name}
                    tasks={currentTasks}
                    onEditTask={handleToggleCheck}
                    removeChecked={!showChecked}
                  />
                );
              })
            ) : (
              <></>
            )}
          </section>
        )}
        {!!tasks?.length && (
          <footer className="flex gap-3">
            <button
              className="text-primary-500 w-fit transition hover:text-primary-400"
              onClick={handleFilterChecked}
            >
              {showChecked ? "Esconder concluídas" : "Mostrar concluídas"}
            </button>
            <button className="text-danger w-fit transition hover:brightness-150">
              Tarefas atrasadas
            </button>
          </footer>
        )}
      </>
    </StandardPage>
  );
};

export default TasksPage;
