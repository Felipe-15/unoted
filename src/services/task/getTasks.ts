import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import { ITask } from "@/interfaces/Task";

export const getTasks = async (userId: string) => {
  try {
    const q = query(collection(db, "tasks"), where("creator_id", "==", userId));
    const snap = await getDocs(q);

    const tasks: ITask[] = [];

    snap.forEach((task) => {
      const data: ITask = task.data() as any;
      tasks.push({ ...data, id: task.id });
    });

    return tasks;
  } catch (error) {}
};
