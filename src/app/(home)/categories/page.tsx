"use client";
import usePage from "./usePage";

import { ICategory } from "@/interfaces/Category";

import AddCategoryButton from "@/app/components/AddCategoryButton";
import Category from "@/app/components/category/Category";
import StandardPage from "@/app/components/StandardPage";
import SkeletonCategory from "@/app/components/Skeletons/single-skeletons/SkeletonCategory";

const CategoriesPage = () => {
  const {
    categories,
    isLoading,
    user,
    filteredCategories,
    handleAddCategory,
    handleDeleteCategory,
    handleSearch,
    handleUpdateCategory,
  } = usePage();

  const noteCategories = isLoading
    ? Array(3)
        .fill(0)
        .map((_, index) => <SkeletonCategory key={index.toString()} />)
    : filteredCategories.map((category: ICategory, index) => {
        if (category.type === "task") return;
        return (
          <Category
            {...category}
            key={category.id}
            onUpdate={(data) => handleUpdateCategory(data, category.id)}
            onDelete={() => handleDeleteCategory(category.id, category.type)}
          />
        );
      });
  const taskCategories = isLoading
    ? Array(3)
        .fill(0)
        .map((_, index) => <SkeletonCategory key={index.toString()} />)
    : filteredCategories.map((category: ICategory, index) => {
        if (category.type === "note") return;
        return (
          <Category
            {...category}
            key={category.id}
            onUpdate={(data) => handleUpdateCategory(data, category.id)}
            onDelete={() => handleDeleteCategory(category.id, category.type)}
          />
        );
      });

  return (
    <StandardPage user={user} onSearch={handleSearch}>
      <h2 className="pt-4 text-3xl md:text-4xl text-secondary-500 mb-4">
        Notas
      </h2>
      <div className="flex overflow-x-auto p-4 items-center gap-8 mb-4 mx-6 overflow-y-hidden">
        <AddCategoryButton onClick={() => handleAddCategory("note")} />
        {noteCategories}
      </div>
      <h2 className="pt-4 text-3xl md:text-4xl text-secondary-500 mb-4">
        Tarefas
      </h2>
      <div className="flex overflow-x-auto p-4 mx-6 items-center gap-8 overflow-y-hidden">
        <AddCategoryButton onClick={() => handleAddCategory("task")} />
        {taskCategories}
      </div>
    </StandardPage>
  );
};

export default CategoriesPage;
