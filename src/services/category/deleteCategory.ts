import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";

export const deleteCategory = async (categoryId: string) => {
  try {
    await deleteDoc(doc(db, "categories", categoryId));
  } catch (error) {}
};
