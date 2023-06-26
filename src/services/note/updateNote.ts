import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";

export const updateNote = async (
  noteId: string,
  data: { category_id?: string; title?: string; content?: string }
) => {
  try {
    await updateDoc(doc(db, "notes", noteId), data);
  } catch (error) {}
};
