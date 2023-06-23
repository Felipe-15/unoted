"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { createCategory } from "@/services/category/createCategory";

import { ICategory } from "@/interfaces/Category";

import AddCategoryButton from "@/app/components/AddCategoryButton";
import Category from "@/app/components/Category";
import StandardPage from "@/app/components/StandardPage";
import { getCategories } from "@/services/category/getCategories";

const CategoriesPage = () => {
  const { user, setUser } = useAuth();
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    if (user) {
      console.log("User id: ", user.id);
      handleGetCategories();
    }
  }, [user]);

  const handleGetCategories = async () => {
    try {
      const categoriesRes = await getCategories(user?.id || "");
      if (!categoriesRes) return;
      console.log("Categories res: ", categoriesRes);
      setCategories(categoriesRes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCategory = async (type: "note" | "task") => {
    await createCategory({
      color: "#ff9000",
      name: "Nova categoria",
      type,
      creator_id: user?.id || "",
    });
  };

  return (
    <StandardPage>
      <h2 className="pt-4 text-4xl text-secondary-500 mb-4">Notas</h2>
      <div className="flex overflow-x-auto p-4 items-center gap-8 mb-4 mx-6 overflow-y-hidden">
        <AddCategoryButton onClick={() => handleAddCategory("note")} />
        {categories.map((category: ICategory, index) => {
          return <Category {...category} key={category.id} onChangeColor={} />;
        })}
        <Category name="Faculdade" color="#ff9000" onDelete={() => null} />
        <Category name="Faculdade" color="#ff9000" onDelete={() => null} />
        <Category name="Faculdade" color="#ff9000" onDelete={() => null} />
        <Category name="Faculdade" color="#ff9000" onDelete={() => null} />
        <Category name="Faculdade" color="#ff9000" onDelete={() => null} />
      </div>
      <h2 className="pt-4 text-4xl text-secondary-500 mb-4">Tarefas</h2>
      <div className="flex overflow-x-auto p-4 mx-6 items-center gap-8 overflow-y-hidden">
        <AddCategoryButton onClick={() => handleAddCategory("task")} />
        <Category name="Faculdade" color="#ff9000" onDelete={() => null} />
        <Category name="Faculdade" color="#ff9000" onDelete={() => null} />
        <Category name="Faculdade" color="#ff9000" onDelete={() => null} />
        <Category name="Faculdade" color="#ff9000" onDelete={() => null} />
        <Category name="Faculdade" color="#ff9000" onDelete={() => null} />
      </div>
    </StandardPage>
  );
};

export default CategoriesPage;
