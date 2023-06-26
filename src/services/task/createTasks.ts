import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/config/firebase";
import { ITask } from "@/interfaces/Task";

export const createTasks = async (
  tasks: Omit<ITask, "id">[],
  userId: string
) => {
  try {
    tasks.forEach(async (task) => {
      await addDoc(collection(db, "tasks"), {
        ...task,
        expires_at: Timestamp.fromDate(new Date(task.expires_at)),
      });
    });
  } catch (error) {}
};
