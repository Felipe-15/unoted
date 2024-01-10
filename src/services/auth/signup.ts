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

    const photo =
      user.photoURL ||
      `https://ui-avatars.com/api/?name=${name.replace(
        " ",
        "+"
      )}&background=233C43&rounded=true&length=${
        name.split(" ").length
      }&color=FDFFFC`;

    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      photo,
    });

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: user.uid,
        name,
        photo,
      })
    );
  } catch (err: any) {
    console.error(`${err.code}: ${err.message}`);
  }
};
