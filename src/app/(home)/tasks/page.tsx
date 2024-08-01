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
import { Toaster } from "react-hot-toast";

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
    showLate,
    handleShowLate,
    handleSearch,
    setSelectedDate,
    handleToggleCheck,
    handleFilterChecked,
    handleNavigation,
    handleRemoveTask,
  } = usePage();

  const taskList = isLoading ? (
    <SkeletonTaskList />
  ) : !tasks?.length ? (
    <article className="flex items-center justify-center gap-3 w-full flex-1 pb-10">
      <Image src={emptyEmoji} width={64} height={64} alt="Empty data" />
      <p className="font-bold text-secondary-500 text-xl">
        Não há tarefas ainda...
      </p>
    </article>
  ) : (
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
              onRemoveTask={handleRemoveTask}
              expireAt={selectedDate}
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
  );

  const footer = !!tasks?.length ? (
    <footer className="flex gap-3">
      {!showLate && (
        <button
          className="text-primary-500 w-fit transition hover:text-primary-400"
          onClick={handleFilterChecked}
        >
          {showChecked ? "Esconder concluídas" : "Mostrar concluídas"}
        </button>
      )}
      <button
        onClick={handleShowLate}
        className="text-danger w-fit transition hover:brightness-150"
      >
        {showLate ? "Esconder tarefas atrasadas" : "Ver tarefas atrasadas"}
      </button>
    </footer>
  ) : (
    <></>
  );

  return (
    <StandardPage user={user} onSearch={handleSearch}>
      <Toaster />
      <>
        <header className="flex w-full h-fit justify-between gap-3 items-center mb-4">
          {showLate ? (
            <h3 className="text-secondary-500 text-xl">Tarefas atrasadas</h3>
          ) : (
            <FilterList>
              <FilterSelector
                text="Hoje"
                onSelect={() =>
                  setSelectedDate({ value: filterDates.today, text: "hoje" })
                }
                isSelected={selectedDate?.value === filterDates.today}
              />
              <FilterSelector
                text="Amanhã"
                onSelect={() =>
                  setSelectedDate({
                    value: filterDates.tomorrow,
                    text: "amanhã",
                  })
                }
                isSelected={selectedDate?.value === filterDates.tomorrow}
              />
              <FilterSelector
                text="Próx. Semana"
                onSelect={() =>
                  setSelectedDate({
                    value: filterDates.nextWeek,
                    text: "próxima semana",
                  })
                }
                isSelected={selectedDate?.value === filterDates.nextWeek}
              />
              <FilterSelector
                text="Todas"
                onSelect={() => setSelectedDate(null)}
                isSelected={selectedDate === null}
              />
            </FilterList>
          )}
          <button
            role="link"
            onClick={handleNavigation}
            className="fixed z-10 bottom-4 right-4 p-2 sm:p-0 text-secondary-500 sm:static rounded-full sm:rounded-none bg-primary-500 sm:bg-transparent flex gap-2 items-center justify-center sm:text-primary-500 transition hover:text-primary-400"
          >
            <BsPlus size={24} />
            <p className="hidden sm:inline whitespace-nowrap">Nova tarefa</p>
          </button>
        </header>
        {taskList}
        {footer}
      </>
    </StandardPage>
  );
};

export default TasksPage;
