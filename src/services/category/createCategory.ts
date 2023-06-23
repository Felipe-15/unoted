import { collection, addDoc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Category } from "@/interfaces/Category";

export const createCategory = async (
  category: Omit<Category, "id">,
  userId: string
) => {
  try {
    const snap = await getDoc(
      await addDoc(collection(db, "categories"), {
        ...category,
        creator_id: userId,
      })
    );

    if (snap.exists()) {
      return snap.data();
    }
  } catch (error) {
    console.log(error);
  }
};
