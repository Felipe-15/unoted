import SideMenu from "../components/side-menu/SideMenu";
import { useAuth } from "@/hooks/useAuth";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      <SideMenu />
      {children}
    </main>
  );
}
