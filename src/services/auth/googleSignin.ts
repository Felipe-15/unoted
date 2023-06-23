import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const googleSignin = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    if (result.user) {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const { getIdToken, displayName, photoURL } = result.user;

      return {
        token,
        name: displayName || "",
        photo: photoURL || "",
      };
    }
  } catch (err) {
    console.log(err);
  }
};
