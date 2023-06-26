import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export const updateTask = async (
  taskId: string,
  data: { text?: string; checked?: boolean }
) => {
  try {
    await updateDoc(doc(db, "tasks", taskId), data);
  } catch (error) {}
};
