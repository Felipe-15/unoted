import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import firebase, { db } from "@/config/firebase";

export const signin = async (email: string, password: string) => {
  const auth = getAuth(firebase);

  const { user } = await signInWithEmailAndPassword(auth, email, password);

  const snap = await getDoc(doc(db, "users", user.uid));

  if (snap.exists()) {
    const { name } = snap.data();
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: user.uid,
        name: name,
        photo: user.photoURL || "",
      })
    );
  }
};
