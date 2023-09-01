import { useAuth } from "@/hooks/useAuth";
import { ICategory } from "@/interfaces/Category";
import { INote } from "@/interfaces/Note";
import { getCategories } from "@/services/category";
import { getNote, updateNote } from "@/services/note";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function usePage(router: any, noteId: string) {
  const { user } = useAuth();
  const [categories, setCategories] = useState<ICategory[]>();
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();
  const [note, setNote] = useState<INote>();

  const { register, handleSubmit, clearErrors } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
    values: {
      title: note?.title || "",
      content: note?.content || "",
    },
  });

  const handleInitialData = async () => {
    const categoriesRes = await handleGetCategories();
    const noteRes = await handleGetNote();

    setSelectedCategory(
      categoriesRes?.filter((c) => c.id === noteRes?.category_id)[0]
    );
  };

  const handleGetCategories = async () => {
    const categoriesRes = await getCategories(user?.id || "", "note");
    setCategories(categoriesRes);

    return categoriesRes;
  };

  const handleUpdateNote = async (data: any) => {
    const newData = {
      title: data.title !== note?.title,
      content: data.content !== note?.content,
      category_id: selectedCategory?.id !== note?.category_id,
    };

    const updatedData = {
      title: data.title,
      content: data.content,
      category_id: selectedCategory?.id,
    };

    for (let key of Object.keys(updatedData)) {
      let currentKey: "title" | "content" | "category_id" = key as any;
      if (!newData[currentKey]) {
        delete updatedData[currentKey];
      }
    }

    try {
      await updateNote(note?.id || "", updatedData);
      router.push("/notes");
    } catch (err) {
      toast.error(
        "Um erro ocorreu enquanto a nota era atualizada, tente novamente!"
      );
    }
  };

  const handleGetNote = async () => {
    const noteRes = await getNote(user?.id || "", noteId);

    setNote(noteRes);

    return noteRes;
  };

  useEffect(() => {
    handleInitialData();
  }, [user]);

  return {
    categories,
    user,
    selectedCategory,
    setSelectedCategory,
    register,
    handleSubmit,
    handleUpdateNote,
  };
}
