import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";

export const signin = async (email: string, password: string) => {
  const auth = getAuth();

  const { user } = await signInWithEmailAndPassword(auth, email, password);

  const snap = await getDoc(doc(db, "users", user.uid));

  if (snap.exists()) {
    const { name } = snap.data();
    return {
      id: user.uid,
      name: name,
      token: await user.getIdToken(),
      photo: user.photoURL || "",
    };
  }
};
