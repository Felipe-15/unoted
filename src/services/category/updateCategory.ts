import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export const updateCategory = async (
  categoryId: string,
  data: { color?: string; name?: string }
) => {
  try {
    await updateDoc(doc(db, "categories", categoryId), data);
  } catch (error) {
    console.log(error);
  }
};
