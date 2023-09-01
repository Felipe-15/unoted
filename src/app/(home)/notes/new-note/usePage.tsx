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

  const { register, handleSubmit, clearErrors } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const handleGetCategories = async () => {
    const categoriesRes = await getCategories(user?.id || "", "note");
    setCategories(categoriesRes);
  };

  const handleCreateNote = async (data: any) => {
    if (!selectedCategory) {
      toast.error("Por favor, selecione uma categoria para criar a nota!");
      return;
    }
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
  };

  useEffect(() => {
    handleGetCategories();
  }, [user]);

  return {
    categories,
    selectedCategory,
    user,
    register,
    handleSubmit,
    handleCreateNote,
    setSelectedCategory,
  };
}
