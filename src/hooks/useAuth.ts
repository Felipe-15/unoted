"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase";
import { User } from "@/interfaces/User";

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((user) => {
      const recoveredUser: User = JSON.parse(
        sessionStorage.getItem("user") || "{}"
      );
      if (!user || !Object.keys(recoveredUser).length) {
        router.push("/auth/login");
        return;
      }

      const { displayName, uid, photoURL } = user;
      const { id, name, photo } = recoveredUser;

      setUser({
        id: uid || id,
        name: displayName || name,
        photo: photoURL || photo,
      });
    });
  }, []);

  return { user: user || undefined, setUser };
}
