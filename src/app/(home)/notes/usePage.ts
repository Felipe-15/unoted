import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ICategory } from "@/interfaces/Category";
import { INote } from "@/interfaces/Note";
import { getCategories } from "@/services/category";
import { deleteNote, getNotes } from "@/services/note";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function usePage() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const [notes, setNotes] = useState<INote[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<INote[]>([]);

  const [search, setSearch] = useState("");

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<ICategory | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      handleGetCategories();
      handleGetNotes();
    }
  }, [user]);

  const handleNavigation = () => {
    if (!categories.length) {
      toast(
        "Ops, parece que você ainda não criou categorias pra anotações, iremos lhe redirecionar para criá-las antes!",
        {
          icon: "⚠️",
        }
      );
      setTimeout(() => router.push("/categories"), 4000);
      return;
    }

    router.push("/notes/new-note");
  };

  const handleGetNotes = async () => {
    setIsLoading(true);
    try {
      const notesRes = await getNotes(user?.id || "");
      setNotes(notesRes);
      setFilteredNotes(notesRes);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
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

  return {
    handleDeleteNote,
    handleSearch,
    handleFilterNotes,
    handleNavigation,
    isLoading,
    categories,
    notes,
    filteredNotes,
    user,
    selectedFilter,
  };
}
