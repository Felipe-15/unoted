"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "@/services/category";

import { ICategory } from "@/interfaces/Category";

import AddCategoryButton from "@/app/components/AddCategoryButton";
import Category from "@/app/components/category/Category";
import StandardPage from "@/app/components/StandardPage";

const CategoriesPage = () => {
  const { user, setUser } = useAuth();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    if (user) {
      handleGetCategories();
    }
  }, [user]);

  const handleGetCategories = async () => {
    try {
      const categoriesRes = await getCategories(user?.id || "");
      if (!categoriesRes) return;
      setCategories(categoriesRes);
      setFilteredCategories(categoriesRes);
    } catch (error) {
      console.log(error);
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

  return (
    <StandardPage user={user} onSearch={handleSearch}>
      <h2 className="pt-4 text-3xl md:text-4xl text-secondary-500 mb-4">
        Notas
      </h2>
      <div className="flex overflow-x-auto p-4 items-center gap-8 mb-4 mx-6 overflow-y-hidden">
        <AddCategoryButton onClick={() => handleAddCategory("note")} />
        {filteredCategories.map((category: ICategory, index) => {
          if (category.type === "task") return <></>;
          return (
            <Category
              {...category}
              key={category.id}
              onUpdate={(data) => handleUpdateCategory(data, category.id)}
              onDelete={() => handleDeleteCategory(category.id, category.type)}
            />
          );
        })}
      </div>
      <h2 className="pt-4 text-3xl md:text-4xl text-secondary-500 mb-4">
        Tarefas
      </h2>
      <div className="flex overflow-x-auto p-4 mx-6 items-center gap-8 overflow-y-hidden">
        <AddCategoryButton onClick={() => handleAddCategory("task")} />
        {filteredCategories.map((category: ICategory, index) => {
          if (category.type === "note") return <></>;
          return (
            <Category
              {...category}
              key={category.id}
              onUpdate={(data) => handleUpdateCategory(data, category.id)}
              onDelete={() => handleDeleteCategory(category.id, category.type)}
            />
          );
        })}
      </div>
    </StandardPage>
  );
};

export default CategoriesPage;
