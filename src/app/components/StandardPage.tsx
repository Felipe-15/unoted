import Image from "next/image";

import SearchInput from "./SearchInput";
import Header from "./Header";
import SkeletonUser from "./Skeletons/single-skeletons/SkeletonUser";

import { FiUser } from "react-icons/fi";
import { User } from "@/interfaces/User";

interface Props {
  user?: User;
  headerType?: "full" | "noSearch";
  onSearch?: (search: string) => void;
}

const StandardPage = ({
  children,
  ...headerProps
}: Props & { children: React.ReactNode }) => {
  return (
    <section className="w-full h-screen flex-col bg-background-800 overflow-hidden">
      <Header {...headerProps} />
      <section className="relative flex flex-col w-full h-[calc(100vh-75px)] bg-background-900 rounded-tl-2xl px-6 py-4">
        {children}
      </section>
    </section>
  );
};

export default StandardPage;
