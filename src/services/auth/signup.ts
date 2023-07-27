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
      photo:
        user.photoURL ||
        `https://ui-avatars.com/api/?name=${name
          .split(" ")
          .join("+")}&background=233C43&rounded=true&length=${
          name.split(" ").length
        }&color=FDFFFC`,
    });

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: user.uid,
        name,
        photo:
          user.photoURL ||
          `https://ui-avatars.com/api/?name=${name
            .split(" ")
            .join("+")}&background=FF9000&rounded=true&length=${
            name.split(" ").length
          }&color=FDFFFC`,
      })
    );
  } catch (err: any) {
    console.error(`${err.code}: ${err.message}`);
  }
};
