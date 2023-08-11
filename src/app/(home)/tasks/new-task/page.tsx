"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
import { openSans } from "@/app/fonts";

import { useAuth } from "@/hooks/useAuth";

import StandardPage from "@/app/components/StandardPage";
import CategoryDropdown from "@/app/components/CategoryDropdown";
import Button from "@/app/components/Button";

import { BsArrowLeft, BsFillTrashFill } from "react-icons/bs";
import { BiCalendar, BiHelpCircle } from "react-icons/bi";
import Task from "@/app/components/Task";
import { ITask } from "@/interfaces/Task";
import DateInput from "@/app/components/DateInput";
import { ICategory } from "@/interfaces/Category";
import { getCategories } from "@/services/category";
import { createTasks } from "@/services/task/createTasks";
import ResponsiveHolder from "@/app/components/ResponsiveHolder";

const NewTaskPage = () => {
  const router = useRouter();

  const { user } = useAuth();
  const [tasks, setTasks] = useState<
    Omit<ITask, "creator_id" | "category_id" | "expires_at">[]
  >([]);
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();

  useEffect(() => {
    handleGetCategories();
  }, [user]);

  const handleGetCategories = async () => {
    const categoriesRes: any = await getCategories(user?.id || "", "task");
    setCategories(categoriesRes);
  };

  const handleAddTask = () => {
    setTasks((prev) => [
      { id: (prev.length + 1).toString(), text: "Nova tarefa", checked: false },
      ...prev,
    ]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEditTask = (text: string, id: string) => {
    setTasks((prev) => prev.map((t) => (t.id !== id ? t : { ...t, text })));
  };

  const handleCheckTask = (checked: boolean, id: string) => {
    setTasks((prev) => prev.map((t) => (t.id !== id ? t : { ...t, checked })));
  };

  const handleCreateTasks = async () => {
    if (!tasks) return;
    if (!selectedCategory) {
      toast.error("Por favor, selecione uma categoria para criar as tarefas!");
      return;
    }
    const tasksWithData: Omit<ITask, "id">[] = tasks.map((t) => {
      const { id, ...rest } = t;
      return {
        ...rest,
        creator_id: user?.id || "",
        category_id: selectedCategory?.id || "",
        expires_at: date || Date.now(),
      };
    });

    try {
      await createTasks(tasksWithData, user?.id || "");
      router.push("/tasks");
    } catch (err) {
      toast.error(
        "Houve um erro enquanto eram criadas as tarefas, tente novamente!"
      );
    }
  };

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
        <ResponsiveHolder title="Categoria e Data">
          <CategoryDropdown
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(category) => setSelectedCategory(category)}
          />
          <DateInput
            date={date && new Date(date).toLocaleDateString("pt-BR")}
            onSelectDate={(date: any) => setDate(date)}
          />
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
              />
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="opacity-0 transition -translate-x-2 text-secondary-500 hover:text-danger group-hover:opacity-100 group-hover:-translate-x-0"
              >
                <BsFillTrashFill />
              </button>
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
          <Button text="Salvar" onClick={handleCreateTasks} />
        </div>
      </div>
    </StandardPage>
  );
};

export default NewTaskPage;
