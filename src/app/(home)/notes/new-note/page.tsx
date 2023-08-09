"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { openSans } from "@/app/fonts";
import { getCategories } from "@/services/category";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";

import StandardPage from "@/app/components/StandardPage";
import CategoryDropdown from "@/app/components/CategoryDropdown";
import Button from "@/app/components/Button";

import { BsArrowLeft } from "react-icons/bs";
import { BiHelpCircle } from "react-icons/bi";
import { ICategory } from "@/interfaces/Category";
import { createNote } from "@/services/note/createNote";
import ResponsiveHolder from "@/app/components/ResponsiveHolder";

const NewNotePage = () => {
  const router = useRouter();

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

  return (
    <StandardPage headerType="noSearch" user={user}>
      <Toaster />
      <div className="flex justify-between items-center">
        <Link
          href="/notes"
          className="flex gap-4 text-primary-500 transition hover:text-primary-400 text-xl items-center"
        >
          <BsArrowLeft />
          <span className="hidden md:inline">Voltar</span>
        </Link>
        <h2 className="text-secondary-500 text-2xl md:text-3xl">Nova nota</h2>
        <CategoryDropdown
          categories={categories || []}
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <div className="flex flex-col gap-3 justify-center items-center -ml-10 pt-12 h-full">
        <input
          {...register("title", { required: true })}
          className="placeholder:text-gray-500 border-b-2 text-2xl md:text-3xl bg-transparent max-w-[180px] md:max-w-[240px] border-gray-500 pb-3 text-secondary-500 outline-none"
          placeholder="Título"
        />
        <textarea
          {...register("content", { required: true })}
          className={`${openSans.className} w-full resize-none placeholder:text-gray-500 text-secondary-500 max-h-[240px] max-w-[180px] md:max-w-[240px] h-full bg-transparent text-base outline-none`}
          placeholder="Digite aqui..."
        />
      </div>
      <div className="flex justify-between mt-auto w-full items-center">
        <button className="p-1 text-primary-500/70 transition hover:text-primary-500 text-2xl">
          <BiHelpCircle />
        </button>
        <div className="max-w-[100px] w-full">
          <Button text="Salvar" onClick={handleSubmit(handleCreateNote)} />
        </div>
      </div>
    </StandardPage>
  );
};

export default NewNotePage;
