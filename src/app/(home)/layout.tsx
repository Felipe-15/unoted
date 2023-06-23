"use client";
import { AuthProvider } from "@/contexts/Auth";
import SideMenu from "../components/side-menu/SideMenu";
import { useAuth } from "@/hooks/useAuth";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <main className="flex">
        <SideMenu />
        {children}
      </main>
    </AuthProvider>
  );
}
