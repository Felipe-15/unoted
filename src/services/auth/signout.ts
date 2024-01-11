import { signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import firebase, { auth, db } from "@/config/firebase";

export const signout = async () => {
  try {
    await signOut(auth);

    sessionStorage.removeItem("user");
  } catch (err) {
    console.error("Erro durante o signout: ", err);
  }
};
