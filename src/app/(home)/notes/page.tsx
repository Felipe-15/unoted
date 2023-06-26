"use client";
import "@/styles/scroll.css";
import { useEffect, useState } from "react";
import Link from "next/link";

import { getNotes, deleteNote } from "@/services/note";
import { getCategories } from "@/services/category";

import StandardPage from "../../components/StandardPage";
import FilterSelector from "../../components/FilterSelector";
import Note from "../../components/Note";

import { BsPlus } from "react-icons/bs";
import { useAuth } from "@/hooks/useAuth";
import { INote } from "@/interfaces/Note";
import { ICategory } from "@/interfaces/Category";
import { formatDate } from "@/utils/formatDate";

const HomePage = () => {
  const { user, setUser } = useAuth();
  const [notes, setNotes] = useState<INote[]>([]);
  const [search, setSearch] = useState("");
  const [filteredNotes, setFilteredNotes] = useState<INote[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<ICategory | null>(null);

  useEffect(() => {
    if (user) {
      handleGetCategories();
      handleGetNotes();
    }
  }, [user]);

  const handleGetNotes = async () => {
    try {
      const notesRes = await getNotes(user?.id || "");
      setNotes(notesRes);
      setFilteredNotes(notesRes);
    } catch (error) {}
  };

  const handleGetCategories = async () => {
    try {
      const categoriesRes = await getCategories(user?.id || "", "note");
      setCategories(categoriesRes || []);
    } catch (error) {}
  };

  const handleFilterNotes = (category: ICategory | null) => {
    setSelectedFilter(category);
    if (!category) {
      setFilteredNotes(notes);
      return;
    }
    setFilteredNotes(notes.filter((note) => note.category_id === category.id));
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId);
      const filteredData = notes.filter((note) => note.id !== noteId);
      setNotes(filteredData);
      setFilteredNotes(filteredData);
    } catch (error) {}
  };

  const handleSearch = (search: string) => {
    const currentSearch = search.toLowerCase();
    setSearch(currentSearch);

    if (selectedFilter) {
      setFilteredNotes(
        notes.filter(
          (note) =>
            note.category_id === selectedFilter.id &&
            note.title.toLowerCase().includes(currentSearch)
        )
      );
    } else {
      setFilteredNotes(
        notes.filter((note) => note.title.toLowerCase().includes(currentSearch))
      );
    }
  };

  return (
    <StandardPage user={user} onSearch={handleSearch}>
      <>
        <div className="flex w-full h-fit justify-between gap-3 items-center mb-4">
          <div className="flex pb-3 h-fit max-w-full sm:max-w-[400px] overflow-x-auto gap-2">
            <FilterSelector
              text="Todas"
              isSelected={!selectedFilter}
              onSelect={() => handleFilterNotes(null)}
            />
            {categories.map((category) => (
              <FilterSelector
                key={category.id}
                text={category.name}
                isSelected={
                  !!selectedFilter && selectedFilter.id === category.id
                }
                onSelect={() => handleFilterNotes(category)}
              />
            ))}
          </div>
          <Link
            href="/notes/new-note"
            className="absolute bottom-4 right-4 p-2 sm:p-0 text-secondary-500 sm:static rounded-full sm:rounded-none bg-primary-500 sm:bg-transparent flex gap-2 items-center justify-center sm:text-primary-500 transition hover:text-primary-400"
          >
            <BsPlus size={24} />
            <span className="hidden sm:inline whitespace-nowrap">
              Nova nota
            </span>
          </Link>
        </div>
        <div className="grid justify-center md:justify-start pr-4 grid-fit gap-4 overflow-y-auto overflow-x-hidden h-[calc(100%-10vh)]">
          {filteredNotes.map((note) => {
            return (
              <Note
                {...note}
                key={note.id}
                noteId={note.id}
                color={
                  categories.filter(
                    (category) => category.id === note.category_id
                  )[0].color
                }
                createdAt={formatDate(note.created_at.toMillis())}
                onDelete={() => handleDeleteNote(note.id)}
              />
            );
          })}
        </div>
      </>
    </StandardPage>
  );
};

export default HomePage;
