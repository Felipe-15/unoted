"use client";
import "@/styles/scroll.css";
import emptyEmoji from "../../../../public/empty-emoji.png";
import Link from "next/link";
import usePage from "./usePage";

import StandardPage from "../../components/StandardPage";
import FilterSelector from "../../components/FilterSelector";
import Note from "../../components/Note";

import { BsPlus } from "react-icons/bs";

import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import FilterList from "@/app/components/FilterList";
import SkeletonNoteList from "@/app/components/Skeletons/SkeletonNoteList";
import SkeletonFilterList from "@/app/components/Skeletons/SkeletonFilterList";
import { Toaster } from "react-hot-toast";

const NotePage = () => {
  const {
    categories,
    filteredNotes,
    notes,
    isLoading,
    user,
    selectedFilter,
    handleDeleteNote,
    handleFilterNotes,
    handleSearch,
    handleNavigation,
  } = usePage();

  const filterList = !isLoading ? (
    <FilterList
      dinamicConfig={{
        dinamicFilters: categories,
        onSelectFilter: handleFilterNotes,
        selectedFilter,
      }}
    >
      <FilterSelector
        text="Todas"
        isSelected={!selectedFilter}
        onSelect={() => handleFilterNotes(null)}
      />
    </FilterList>
  ) : (
    <SkeletonFilterList />
  );

  const noteList = isLoading ? (
    <SkeletonNoteList />
  ) : !notes?.length && !isLoading ? (
    <article className="flex items-center justify-center gap-3 w-full flex-1 pb-10">
      <Image src={emptyEmoji} width={64} height={64} alt="Empty data" />
      <p className="font-bold text-secondary-500 text-xl">
        Não há anotações ainda...
      </p>
    </article>
  ) : (
    <section className="grid justify-center md:justify-start pr-4 grid-fit gap-4 overflow-y-auto overflow-x-hidden h-[calc(100%-10vh)]">
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
    </section>
  );

  return (
    <StandardPage user={user} onSearch={handleSearch}>
      <>
        <Toaster />
        <header className="flex w-full h-fit justify-between gap-3 items-center mb-4">
          {filterList}
          <button
            onClick={handleNavigation}
            role="link"
            className="fixed z-10 bottom-4 right-4 p-2 sm:p-0 text-secondary-500 sm:static rounded-full sm:rounded-none bg-primary-500 sm:bg-transparent flex gap-2 items-center justify-center sm:text-primary-500 transition hover:text-primary-400"
          >
            <BsPlus size={24} />
            <span className="hidden sm:inline whitespace-nowrap">
              Nova nota
            </span>
          </button>
        </header>
        {noteList}
      </>
    </StandardPage>
  );
};

export default NotePage;
