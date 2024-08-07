import { useAuth } from "@/hooks/useAuth";
import { ICategory } from "@/interfaces/Category";
import { getCategories } from "@/services/category";
import { createNote } from "@/services/note";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function usePage(router: any) {
  const { user, setUser } = useAuth();
  const [categories, setCategories] = useState<ICategory[]>();
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, clearErrors, watch } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const contentWatcher = watch("content");
  const titleWatcher = watch("title");

  const handleGetCategories = async () => {
    const categoriesRes = await getCategories(user?.id || "", "note");
    setCategories(categoriesRes);
  };

  const handleCreateNote = async (data: any) => {
    if (!selectedCategory) {
      toast.error("Por favor, selecione uma categoria para criar a nota!");
      return;
    }
    setIsLoading(true);
    try {
      await createNote({
        title: data.title,
        content: data.content,
        creator_id: user?.id || "",
        category_id: selectedCategory?.id || "",
      });

      router.push("/notes");
    } catch (err) {
      toast.error(
        "Algum erro ocorreu enquanto ocorria a criação da nota, tente novamente!"
      );
    }

    setIsLoading(false);
  };

  useEffect(() => {
    handleGetCategories();
  }, [user]);

  return {
    categories,
    selectedCategory,
    user,
    contentWatcher,
    titleWatcher,
    isLoading,
    register,
    handleSubmit,
    handleCreateNote,
    setSelectedCategory,
  };
}
