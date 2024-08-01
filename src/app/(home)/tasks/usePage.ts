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
import { DateTime } from "luxon";

export default function usePage() {
  const { user } = useAuth();
  const router = useRouter();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);

  const [selectedDate, setSelectedDate] = useState<{
    value: number;
    text: string;
  } | null>({ value: 0, text: "hoje" });

  const [search, setSearch] = useState("");

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);

  const [showChecked, setShowChecked] = useState(false);
  const [showLate, setShowLate] = useState(false);

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
      setFilteredTasks(
        tasksRes.filter((t: any) => {
          let formatedDate = t.expires_at.split("/");
          formatedDate = `${formatedDate[2]}-${formatedDate[1]}-${formatedDate[0]}`;
          const isNotLate =
            DateTime.fromISO(formatedDate) >= DateTime.fromMillis(Date.now());
          return t.checked === false && isNotLate;
        })
      );
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

  const handleShowLate = () => {
    setSelectedDate(null);
    setShowLate((prev) => !prev);
    if (showLate) {
      setFilteredTasks(
        tasks.filter((t) => {
          let formatedDate = t.expires_at.split("/");
          formatedDate = `${formatedDate[2]}-${formatedDate[1]}-${formatedDate[0]}`;
          const isNotLate =
            DateTime.fromISO(formatedDate) >= DateTime.fromMillis(Date.now());
          return isNotLate;
        })
      );
    } else {
      setFilteredTasks(
        tasks.filter((t) => {
          let formatedDate = t.expires_at.split("/");
          formatedDate = `${formatedDate[2]}-${formatedDate[1]}-${formatedDate[0]}`;
          const isLate = !(
            DateTime.fromISO(formatedDate) >= DateTime.fromMillis(Date.now())
          );
          return isLate;
        })
      );
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
    showLate,
    setSelectedDate,
    handleToggleCheck,
    handleSearch,
    handleFilterChecked,
    handleShowLate,
    handleNavigation,
    handleRemoveTask,
  };
}
