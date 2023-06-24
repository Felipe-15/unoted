import { collection, addDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "@/config/firebase";
import { INote } from "@/interfaces/Note";

export const createNote = async (note: Omit<INote, "id" | "created_at">) => {
  try {
    const snap = await getDoc(
      await addDoc(collection(db, "notes"), {
        ...note,
        created_at: Timestamp.now(),
      })
    );
    if (snap.exists()) {
      const data = snap.data();
      return { ...data, id: snap.id };
    }
  } catch (error) {}
};
