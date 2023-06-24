import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import { INote } from "@/interfaces/Note";

export const getNotes = async (userId: string) => {
  const q = query(collection(db, "notes"), where("creator_id", "==", userId));
  const snap = await getDocs(q);
  const notes: INote[] = [];

  snap.forEach((note) => {
    const data = note.data();
    notes.push({ ...(data as INote), id: note.id });
  });

  return notes;
};
