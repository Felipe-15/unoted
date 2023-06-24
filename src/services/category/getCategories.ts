import { getDocs, collection, query, where, and } from "firebase/firestore";
import { db } from "@/config/firebase";
import { ICategory } from "@/interfaces/Category";

export const getCategories = async (
  userId: string,
  filter?: "note" | "task"
) => {
  try {
    let q = null;
    if (filter) {
      q = query(
        collection(db, "categories"),
        where("creator_id", "==", userId),
        where("type", "==", filter)
      );
    } else {
      q = query(
        collection(db, "categories"),
        where("creator_id", "==", userId)
      );
    }

    const querySnapshot = await getDocs(q);
    const categories: ICategory[] = [];
    querySnapshot.forEach((category: any) => {
      const categoryData = category.data();
      categories.push({ ...categoryData, id: category.id });
    });

    return categories;
  } catch (error) {
    console.log(error);
  }
};
