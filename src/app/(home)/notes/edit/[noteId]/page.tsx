"use client";
import usePage from "./usePage";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { openSans } from "@/app/fonts";

import StandardPage from "@/app/components/StandardPage";
import CategoryDropdown from "@/app/components/CategoryDropdown";
import Button from "@/app/components/Button";

import { BsArrowLeft } from "react-icons/bs";
import { BiHelpCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";

const EditNotePage = ({
  params: { noteId },
}: {
  params: { noteId: string };
}) => {
  const router = useRouter();
  const {
    categories,
    user,
    selectedCategory,
    handleSubmit,
    handleUpdateNote,
    setSelectedCategory,
    register,
  } = usePage(router, noteId);

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
        <h2 className="text-secondary-500 text-2xl md:text-3xl">Editar nota</h2>
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
          <Button text="Salvar" onClick={handleSubmit(handleUpdateNote)} />
        </div>
      </div>
    </StandardPage>
  );
};

export default EditNotePage;
