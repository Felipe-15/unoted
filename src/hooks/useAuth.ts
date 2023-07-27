"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/interfaces/User";

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const userRecovered = JSON.parse(sessionStorage.getItem("user") || "{}");

    if (!Object.keys(userRecovered).length) {
      router.push("/auth/login");
    } else {
      setUser(userRecovered);
    }
  }, []);

  return { user: user || undefined, setUser };
}
