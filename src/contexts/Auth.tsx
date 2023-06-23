import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface User {
  id: string;
  name: string;
  token: string;
  photo?: string;
}

interface AuthContext {
  user: User | undefined;
  setUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid, photoURL, getIdToken } = user;

        setUser({
          id: uid,
          name: user.displayName || "",
          token: await getIdToken(),
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
