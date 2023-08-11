"use client";
import "@/styles/scroll.css";
import { useState, useEffect } from "react";
import Link from "next/link";

import emptyEmoji from "../../../../public/empty-emoji.png";

import { useAuth } from "@/hooks/useAuth";

import { ICategory } from "@/interfaces/Category";

import StandardPage from "../../components/StandardPage";
import FilterSelector from "../../components/FilterSelector";
import Note from "../../components/Note";

import { BsPlus } from "react-icons/bs";
import TaskNote from "@/app/components/TaskNote";
import { getCategories } from "@/services/category";
import { formatDate } from "@/utils/formatDate";
import { getTasks } from "@/services/task/getTasks";
import { FaTasks } from "react-icons/fa";
import { ITask } from "@/interfaces/Task";
import { updateTask } from "@/services/task/updateTask";
import Image from "next/image";
import SkeletonTaskNote from "@/app/components/Skeletons/SkeletonTaskNote";
import FilterList from "@/app/components/FilterList";

const ONE_DAY_MILLIS = 1000 * 60 * 60 * 24;

const filterDates = {
  today: 0,
  tomorrow: ONE_DAY_MILLIS,
  nextWeek: ONE_DAY_MILLIS * 7,
};

const TasksPage = () => {
  const { user } = useAuth();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);

  const [selectedDate, setSelectedDate] = useState<number | null>(0);

  const [search, setSearch] = useState("");

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
  const [showChecked, setShowChecked] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleGetCategories();
    handleGetTasks();
  }, [user]);

  const handleGetCategories = async () => {
    const categoriesRes: any = await getCategories(user?.id || "", "task");
    setCategories(categoriesRes);
    setFilteredCategories(categoriesRes);
  };
  const handleGetTasks = async () => {
    setIsLoading(true);
    const tasksRes: any = await getTasks(user?.id || "");
    setTasks(tasksRes);
    if (!showChecked && tasksRes) {
      setFilteredTasks(tasksRes.filter((t: any) => t.checked === false));
    }
    setIsLoading(false);
  };

  const handleFilterChecked = () => {
    setShowChecked((prev) => !prev);

    if (showChecked) {
      setFilteredTasks(tasks.filter((t) => t.checked === false));
    } else {
      setFilteredTasks(tasks);
    }
  };

  const handleSearch = (search: string) => {
    const currentSearch = search.toLowerCase();
    setSearch(currentSearch);

    setFilteredCategories(
      categories.filter((c) => c.name.toLowerCase().includes(currentSearch))
    );
  };

  const handleToggleCheck = async (checked: boolean, taskId: string) => {
    console.log("atualizou id: ", taskId, " com valor: ", checked);
    await updateTask(taskId, { checked });
    const newTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, checked } : t
    );
    setTasks(newTasks);
    if (!showChecked && checked) {
      setFilteredTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

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
        {isLoading && (
          <section className="grid justify-center md:justify-start pr-4 grid-fit gap-4 overflow-y-auto overflow-x-hidden h-[calc(100%-10vh)]">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <SkeletonTaskNote key={index.toString()} />
              ))}
          </section>
        )}
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
