import {
  deleteDoc,
  doc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "@/config/firebase";

export const deleteCategory = async (
  categoryId: string,
  userId: string,
  typeCategory: "note" | "task"
) => {
  try {
    await deleteDoc(doc(db, "categories", categoryId));
    const typeC = typeCategory === "note" ? "notes" : "tasks";

    const q = query(
      collection(db, typeC),
      where("category_id", "==", categoryId),
      where("creator_id", "==", userId)
    );
    const snap = await getDocs(q);

    snap.forEach(async (note) => {
      await deleteDoc(doc(db, typeC, note.id));
    });
  } catch (error) {}
};
