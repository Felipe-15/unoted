import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ICategory } from "@/interfaces/Category";
import { ITask } from "@/interfaces/Task";
import { getCategories } from "@/services/category";
import { getTasks } from "@/services/task/getTasks";
import { updateTask } from "@/services/task/updateTask";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteTask } from "@/services/task/deleteTask";

export default function usePage() {
  const { user } = useAuth();
  const router = useRouter();

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

  const handleNavigation = () => {
    if (!categories.length) {
      toast(
        "Ops, parece que você ainda não criou categorias pra tarefas, iremos lhe redirecionar para criá-las antes!",
        {
          icon: "⚠️",
        }
      );
      setTimeout(() => router.push("/categories"), 4000);
      return;
    }

    router.push("/tasks/new-task");
  };

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
    await updateTask(taskId, { checked });
    const newTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, checked } : t
    );
    setTasks(newTasks);
    if (!showChecked && checked) {
      setFilteredTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  const handleRemoveTask = async (taskId: string) => {
    await deleteTask(taskId);

    setTasks((prev) => prev.filter((t) => t.id !== taskId));

    if (selectedDate) {
      setFilteredTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  return {
    user,
    selectedDate,
    tasks,
    filteredTasks,
    filteredCategories,
    isLoading,
    showChecked,
    setSelectedDate,
    handleToggleCheck,
    handleSearch,
    handleFilterChecked,
    handleNavigation,
    handleRemoveTask,
  };
}
