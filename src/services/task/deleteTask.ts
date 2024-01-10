import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";

export const deleteTask = async (taskId: string) => {
  try {
    await deleteDoc(doc(db, "tasks", taskId));
  } catch (error) {}
};
