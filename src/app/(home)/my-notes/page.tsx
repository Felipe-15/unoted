"use client";
import "@/styles/scroll.css";
import { useEffect, useState } from "react";
import Link from "next/link";

import StandardPage from "../../components/StandardPage";
import FilterSelector from "../../components/FilterSelector";
import Note from "../../components/Note";

import { BsPlus } from "react-icons/bs";
import { useAuth } from "@/hooks/useAuth";
import { INote } from "@/interfaces/Note";
import { getNotes } from "@/services/note/getNotes";
import { getCategories } from "@/services/category";
import { ICategory } from "@/interfaces/Category";
import { formatDate } from "@/utils/formatDate";

const HomePage = () => {
  const { user, setUser } = useAuth();
  const [notes, setNotes] = useState<INote[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<ICategory | null>(null);

  const handleGetNotes = async () => {
    try {
      const notesRes = await getNotes(user?.id || "");
      setNotes(notesRes);
    } catch (error) {}
  };

  const handleGetCategories = async () => {
    try {
      const categoriesRes = await getCategories(user?.id || "", "note");
      setCategories(categoriesRes || []);
    } catch (error) {}
  };

  useEffect(() => {
    if (user) {
      handleGetCategories();
      handleGetNotes();
    }
  }, []);

  return (
    <StandardPage user={user}>
      <>
        <div className="flex w-full h-fit justify-between gap-3 items-center mb-4">
          <div className="flex pb-3 h-fit max-w-full sm:max-w-[400px] overflow-x-auto gap-2">
            <FilterSelector
              text="Todas"
              isSelected={!selectedFilter}
              onSelect={() => setSelectedFilter(null)}
            />
            {categories.map((category) => (
              <FilterSelector
                key={category.id}
                text={category.name}
                isSelected={
                  !!selectedFilter && selectedFilter.id === category.id
                }
                onSelect={() => setSelectedFilter(category)}
              />
            ))}
          </div>
          <Link
            href="/my-notes/new-note"
            className="absolute bottom-4 right-4 p-2 sm:p-0 text-secondary-500 sm:static rounded-full sm:rounded-none bg-primary-500 sm:bg-transparent flex gap-2 items-center justify-center sm:text-primary-500 transition hover:text-primary-400"
          >
            <BsPlus size={24} />
            <span className="hidden sm:inline whitespace-nowrap">
              Nova nota
            </span>
          </Link>
        </div>
        <div className="grid justify-center md:justify-start pr-4 grid-fit gap-4 overflow-y-auto overflow-x-hidden h-[calc(100%-10vh)]">
          {notes.map((note) => {
            console.log("Data: ", note.created_at.toDate());

            return (
              <Note
                {...note}
                key={note.id}
                color={
                  categories.filter(
                    (category) => category.id === note.category_id
                  )[0].color
                }
                createdAt={formatDate(note.created_at.toMillis())}
              />
            );
          })}
        </div>
      </>
    </StandardPage>
  );
};

export default HomePage;
