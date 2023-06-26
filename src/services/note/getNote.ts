import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { INote } from "@/interfaces/Note";

export const getNote = async (userId: string, noteId: string) => {
  try {
    const snap = await getDoc(doc(db, "notes", noteId));

    if (snap.exists()) {
      const data = snap.data();

      return { ...data, id: snap.id } as INote;
    }
  } catch (error) {
    console.log(error);
  }
};
