import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/contexts/Auth";

export function useAuth() {
  const router = useRouter();

  const { setUser, user } = useContext(AuthContext);
  useEffect(() => {
    const userRecovered = JSON.parse(sessionStorage.getItem("user") || "{}");

    if (!userRecovered) {
      router.push("/auth/login");
    } else {
      setUser(userRecovered);
    }
  }, []);

  return { user, setUser };
}
