"use client";
import usePage from "./usePage";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
import { openSans } from "@/app/fonts";

import StandardPage from "@/app/components/StandardPage";
import CategoryDropdown from "@/app/components/CategoryDropdown";
import Button from "@/app/components/Button";

import { BsArrowLeft, BsFillTrashFill } from "react-icons/bs";
import { BiCalendar, BiHelpCircle } from "react-icons/bi";
import { MdOutlineMoreTime } from "react-icons/md";
import Task from "@/app/components/Task";
import DateInput from "@/app/components/DateInput";
import ResponsiveHolder from "@/app/components/ResponsiveHolder";
import { useRouter } from "next/navigation";

const NewTaskPage = () => {
  const router = useRouter();
  const {
    categories,
    date,
    tasks,
    selectedCategory,
    user,
    handleAddTask,
    handleCheckTask,
    handleCreateTasks,
    handleDeleteTask,
    handleEditTask,
    handleSelectDate,
    setSelectedCategory,
  } = usePage(router);

  return (
    <StandardPage headerType="noSearch" user={user}>
      <Toaster />
      <div className="flex justify-between items-center">
        <Link
          href="/tasks "
          className="flex gap-4 text-primary-500 transition hover:text-primary-400 text-xl items-center"
        >
          <BsArrowLeft />
          <span className="hidden md:inline">Voltar</span>
        </Link>
        <h2 className="text-secondary-500 text-2xl md:text-3xl">Nova Tarefa</h2>
        <ResponsiveHolder
          title="Categoria e data"
          buttonTitle="Detalhes"
          buttonIcon={MdOutlineMoreTime}
        >
          <CategoryDropdown
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(category) => setSelectedCategory(category)}
          />
          <DateInput date={date} onSelectDate={handleSelectDate} />
        </ResponsiveHolder>
      </div>
      <div className="flex flex-col gap-3 justify-start items-center md:-ml-10 pt-12 max-h-8/10 overflow-y-auto my-2">
        <div className="flex flex-col w-fit items-start gap-4">
          {tasks?.map((task) => (
            <div
              key={task.id.toString()}
              className="flex gap-2 items-center justify-center group sm:max-w-[95%]"
            >
              <Task
                editable
                text={task.text}
                checked={task.checked}
                onEdit={(text) => handleEditTask(text, task.id)}
                onToggleCheck={(checked) => handleCheckTask(checked, task.id)}
                onDelete={() => handleDeleteTask(task.id)}
              />
            </div>
          ))}
          <button
            onClick={handleAddTask}
            className="flex gap-2 text-gray-500 text-semibold w-full cursor-pointer"
          >
            <span className="h-[24px] w-[24px] rounded-sm border-[2px] border-gray-500 shrink-0"></span>
            <p className={openSans.className}>
              Clique aqui para adicionar uma tarefa...
            </p>
          </button>
        </div>
      </div>
      <div className="flex justify-between mt-auto w-full items-center">
        <button className="p-1 text-primary-500/70 transition hover:text-primary-500 text-2xl">
          <BiHelpCircle />
        </button>
        <div className="max-w-[100px] w-full">
          <Button
            disabled={!categories?.length || !selectedCategory}
            text="Salvar"
            onClick={handleCreateTasks}
          />
        </div>
      </div>
    </StandardPage>
  );
};

export default NewTaskPage;
