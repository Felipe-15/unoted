"use client";
import usePage from "./usePage";

import { ICategory } from "@/interfaces/Category";

import { motion } from "framer-motion";

import AddCategoryButton from "@/app/components/AddCategoryButton";
import Category from "@/app/components/category/Category";
import StandardPage from "@/app/components/StandardPage";
import SkeletonCategory from "@/app/components/Skeletons/single-skeletons/SkeletonCategory";
import { AnimatePresence } from "framer-motion";

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

  const noteCategories = isLoading.isInitial
    ? Array(3)
        .fill(0)
        .map((_, index) => <SkeletonCategory key={index.toString()} />)
    : filteredCategories.map((category: ICategory, index) => {
        if (category.type === "task") return;
        return (
          <motion.li
            layout
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{
              type: "ease-in-out",
              delay: 0.1 * (index + 1),
            }}
            key={category.id}
          >
            <Category
              {...category}
              onUpdate={(data) => handleUpdateCategory(data, category.id)}
              onDelete={() => handleDeleteCategory(category.id, category.type)}
            />
          </motion.li>
        );
      });
  const taskCategories = isLoading.isInitial
    ? Array(3)
        .fill(0)
        .map((_, index) => <SkeletonCategory key={index.toString()} />)
    : filteredCategories.map((category: ICategory, index) => {
        if (category.type === "note") return;
        return (
          <motion.li
            layout
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{
              type: "ease-in-out",
              delay: 0.1 * (index + 1),
            }}
            key={category.id}
          >
            <Category
              {...category}
              onUpdate={(data) => handleUpdateCategory(data, category.id)}
              onDelete={() => handleDeleteCategory(category.id, category.type)}
            />
          </motion.li>
        );
      });

  return (
    <StandardPage user={user} onSearch={handleSearch}>
      <h2 className="pt-4 text-3xl md:text-4xl text-secondary-500 mb-4">
        Notas
      </h2>
      <ul
        id="note-categories"
        className="flex overflow-x-auto p-4 items-center gap-8 mb-4 mx-6 overflow-y-hidden"
      >
        <AddCategoryButton
          disabled={isLoading.value && !isLoading.isInitial}
          onClick={() => handleAddCategory("note")}
        />
        <AnimatePresence>{noteCategories}</AnimatePresence>
      </ul>
      <h2 className="pt-4 text-3xl md:text-4xl text-secondary-500 mb-4">
        Tarefas
      </h2>
      <ul
        id="task-categories"
        className="flex overflow-x-auto p-4 mx-6 items-center gap-8 overflow-y-hidden"
      >
        <AddCategoryButton onClick={() => handleAddCategory("task")} />
        <AnimatePresence>{taskCategories}</AnimatePresence>
      </ul>
    </StandardPage>
  );
};

export default CategoriesPage;
