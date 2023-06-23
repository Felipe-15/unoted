import { collection, addDoc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { ICategory } from "@/interfaces/Category";

export const createCategory = async (category: Omit<ICategory, "id">) => {
  try {
    const snap = await getDoc(
      await addDoc(collection(db, "categories"), {
        ...category,
      })
    );

    if (snap.exists()) {
      const data = snap.data();
      return { ...data, id: snap.id };
    }
  } catch (error) {
    console.log(error);
  }
};
