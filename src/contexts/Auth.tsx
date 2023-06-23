import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "@/config/firebase";
import { User } from "@/interfaces/User";

interface AuthContext {
  user: User | undefined;
  setUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const auth = getAuth(firebase);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid, photoURL } = user;

        setUser({
          id: uid,
          name: user.displayName || "",
          photo: photoURL || "",
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
