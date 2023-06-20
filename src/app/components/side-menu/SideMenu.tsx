"use client";
import { usePathname } from "next/navigation";
import MenuLink from "./MenuLink";

import { pages } from "./pages";

import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";

const SideMenu = () => {
  const pathName = usePathname();
  const selectedRoute = "/" + pathName.split("/").filter((path) => !!path)[0];
  console.log(selectedRoute);

  return (
    <nav className="flex z-10 shadow-md flex-col h-screen w-full max-w-[48px] lg:max-w-[180px] bg-background-800">
      <h3 className="text-2xl py-4 text-center text-secondary-500 mb-4">
        <span className="text-primary-500">u</span>
        <span className="hidden lg:inline">noted</span>
      </h3>
      <div className="flex flex-col h-full">
        {pages.firstBlockPages.map((page, index) => (
          <MenuLink
            key={index}
            {...page}
            isSelected={selectedRoute.includes(page.path)}
          />
        ))}
        <div className="flex w-full pt-6 pb-12 items-center justify-center">
          <div className="w-[60%] bg-gray-500 h-[1px]"></div>
        </div>
        {pages.secondBlockPages.map((page, index) => (
          <MenuLink
            key={index}
            {...page}
            isSelected={selectedRoute.includes(page.path)}
          />
        ))}
      </div>
      <div className="flex flex-col lg:flex-row pb-4 pl-3 gap-3 py">
        <div className="cursor-pointer p-1 text-secondary-500 transition hover:text-primary-500">
          <AiOutlineTwitter size={24} />
        </div>
        <div className="cursor-pointer p-1 text-secondary-500 transition hover:text-primary-500">
          <AiFillGithub size={24} />
        </div>
        <div className="cursor-pointer p-1 text-secondary-500 transition hover:text-primary-500">
          <AiOutlineInstagram size={24} />
        </div>
      </div>
    </nav>
  );
};

export default SideMenu;
