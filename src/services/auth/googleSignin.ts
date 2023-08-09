import firebase from "@/config/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/config/firebase";

export const googleSignin = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    if (result.user) {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const { displayName, photoURL, uid } = result.user;

      sessionStorage.setItem(
        "user",
        JSON.stringify({
          id: uid,
          name: displayName || "",
          photo: photoURL || "",
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
};
