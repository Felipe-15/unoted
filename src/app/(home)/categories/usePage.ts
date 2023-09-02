import { useAuth } from "@/hooks/useAuth";
import { ICategory } from "@/interfaces/Category";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/services/category";
import { useEffect, useState } from "react";

export default function usePage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      handleGetCategories();
    }
  }, [user]);

  const handleGetCategories = async () => {
    setIsLoading(true);
    try {
      const categoriesRes = await getCategories(user?.id || "");
      if (!categoriesRes) return;
      setCategories(categoriesRes);
      setFilteredCategories(categoriesRes);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async (type: "note" | "task") => {
    const newCategory: any = await createCategory({
      color: "#ff9000",
      name: "Nova categoria",
      type,
      creator_id: user?.id || "",
    });

    const newData = [newCategory, ...categories];
    setCategories(newData);
    setFilteredCategories(newData);
  };

  const handleUpdateCategory = async (
    data: { color?: string; name?: string },
    categoryId: string
  ) => {
    try {
      await updateCategory(categoryId, data);
    } catch (error) {}
  };

  const handleDeleteCategory = async (
    categoryId: string,
    categoryType: "note" | "task"
  ) => {
    await deleteCategory(categoryId, user?.id || "", categoryType);
    const newData = categories.filter((c) => c.id !== categoryId);

    setCategories(newData);
    setFilteredCategories(newData);
  };

  const handleSearch = (search: string) => {
    const currentSearch = search.toLowerCase();
    setFilteredCategories(
      categories.filter((c) => c.name.toLowerCase().includes(currentSearch))
    );
  };

  return {
    categories,
    user,
    isLoading,
    filteredCategories,
    handleAddCategory,
    handleDeleteCategory,
    handleUpdateCategory,
    handleSearch,
  };
}
