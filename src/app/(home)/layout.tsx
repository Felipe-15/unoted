import SideMenu from "../components/side-menu/SideMenu";

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
