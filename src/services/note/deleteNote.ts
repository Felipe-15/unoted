import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";

export const deleteNote = async (noteId: string) => {
  try {
    await deleteDoc(doc(db, "notes", noteId));
  } catch (error) {}
};
