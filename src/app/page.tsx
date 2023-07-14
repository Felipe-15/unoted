"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();
  useEffect(() => {
    const recoverUser = window.sessionStorage.getItem("user");
    if (!recoverUser) {
      router.push("/auth/login");
    } else {
      router.push("/notes");
    }
  }, []);
  return <></>;
};

export default HomePage;
