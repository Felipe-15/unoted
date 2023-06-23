import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";

export const signup = async (email: string, password: string, name: string) => {
  const auth = getAuth();
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

    return { token: await user.getIdToken(), id: user.uid };
  } catch (err: any) {
    console.error(`${err.code}: ${err.message}`);
  }
};
