import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import firebase, { db } from "@/config/firebase";

export const signup = async (email: string, password: string, name: string) => {
  const auth = getAuth(firebase);
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      photo: user.photoURL || "",
    });

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: user.uid,
        name,
        photo: user.photoURL || "",
      })
    );
  } catch (err: any) {
    console.error(`${err.code}: ${err.message}`);
  }
};
