import { useAuth } from "@/hooks/useAuth";
import { ICategory } from "@/interfaces/Category";
import { ITask } from "@/interfaces/Task";
import { getCategories } from "@/services/category";
import { createTasks } from "@/services/task/createTasks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function usePage(router: any) {
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

  const handleSelectDate = (date: string) => {
    const dateObj = new Date(date);
    dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());

    setDate(dateObj.toLocaleDateString("pt-BR"));
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
        expires_at: date || new Date().toLocaleDateString("pt-BR"),
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

  return {
    categories,
    selectedCategory,
    date,
    tasks,
    user,
    setDate,
    setSelectedCategory,
    handleSelectDate,
    handleAddTask,
    handleCheckTask,
    handleCreateTasks,
    handleDeleteTask,
    handleEditTask,
  };
}
