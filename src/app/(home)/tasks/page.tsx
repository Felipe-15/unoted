"use client";
import "@/styles/scroll.css";
import { useState, useEffect } from "react";
import Link from "next/link";

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

const ONE_DAY_MILLIS = 1000 * 60 * 60 * 24;

const filterDates = {
  today: 0,
  tomorrow: ONE_DAY_MILLIS,
  nextWeek: ONE_DAY_MILLIS * 7,
};

const HomePage = () => {
  const { user, setUser } = useAuth();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(0);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
  const [showChecked, setShowChecked] = useState(false);

  useEffect(() => {
    handleGetCategories();
    handleGetTasks();
  }, [user]);

  const handleGetCategories = async () => {
    const categoriesRes: any = await getCategories(user?.id || "", "task");
    setCategories(categoriesRes);
  };
  const handleGetTasks = async () => {
    const tasksRes: any = await getTasks(user?.id || "");
    setTasks(tasksRes);
    if (!showChecked && tasksRes) {
      setFilteredTasks(tasksRes.filter((t: any) => t.checked === false));
    }
  };

  const handleFilterChecked = () => {
    setShowChecked((prev) => !prev);

    if (showChecked) {
      setFilteredTasks((prev) => prev.filter((t) => t.checked === false));
    } else {
      setFilteredTasks(tasks);
    }
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
    <StandardPage user={user}>
      <>
        <div className="flex w-full h-fit justify-between gap-3 items-center mb-4">
          <div className="flex invisible-scroll h-fit max-w-full sm:max-w-[400px] overflow-x-auto gap-2">
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
        <div className="grid justify-center md:justify-start pr-4 grid-fit gap-4 overflow-y-auto overflow-x-hidden h-[calc(100%-10vh)]">
          {categories?.length ? (
            categories.map((c) => {
              const currentTasks = filteredTasks?.length
                ? filteredTasks.filter((t) => t.category_id === c.id)
                : [];
              if (!currentTasks.length) return <></>;
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
        </div>
        <button
          className="text-primary-500 w-fit transition hover:text-primary-400"
          onClick={handleFilterChecked}
        >
          {showChecked ? "Esconder concluídas" : "Ver concluídas"}
        </button>
      </>
    </StandardPage>
  );
};

export default HomePage;
