"use client";
import { useState } from "react";
import Link from "next/link";
import { openSans } from "@/app/fonts";

import StandardPage from "@/app/components/StandardPage";
import CategoryDropdown from "@/app/components/CategoryDropdown";
import Button from "@/app/components/Button";

import { BsArrowLeft } from "react-icons/bs";
import { BiCalendar, BiHelpCircle } from "react-icons/bi";
import Task from "@/app/components/Task";

const NewTaskPage = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  const addTask = () => {
    setTasks((prev) => [
      { id: prev.length + 1, text: "Nova tarefa", checked: false },
      ...prev,
    ]);
  };
  return (
    <StandardPage>
      <div className="flex justify-between items-center">
        <Link
          href="/tasks"
          className="flex gap-4 text-primary-500 transition hover:text-primary-400 text-xl items-center"
        >
          <BsArrowLeft />
          <span className="hidden md:inline">Voltar</span>
        </Link>
        <h2 className="text-secondary-500 text-2xl md:text-3xl">Nova Tarefa</h2>
        <div className="flex gap-6">
          <CategoryDropdown />
          <div className="flex flex-col items-center">
            <div className="relative flex gap-2 text-lg text-primary-500 items-center">
              <BiCalendar />
              <span>Data</span>
              <input
                type="date"
                className=" cursor-pointer absolute inset-0 opacity-0"
              />
            </div>
            <span className="font-semibold text-lg text-gray-300">Hoje</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 justify-start items-center -ml-10 pt-12">
        <div className="flex flex-col w-fit items-start gap-4">
          {tasks.map((task) => (
            <Task
              editable
              key={task.id.toString()}
              text={task.text}
              isChecked={task.checked}
            />
          ))}
          <button
            onClick={addTask}
            className="flex gap-2 cursor-text text-gray-500 text-semibold"
          >
            <span className="h-[24px] w-[24px] rounded-sm border-[2px] border-gray-500"></span>
            <span className={openSans.className}>
              Clique aqui para adicionar uma tarefa...
            </span>
          </button>
        </div>
      </div>
      <div className="flex justify-between mt-auto w-full items-center">
        <button className="p-1 text-primary-500/70 transition hover:text-primary-500 text-2xl">
          <BiHelpCircle />
        </button>
        <div className="max-w-[100px] w-full">
          <Button text="Salvar" onClick={() => null} />
        </div>
      </div>
    </StandardPage>
  );
};

export default NewTaskPage;
