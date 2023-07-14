"use client";
import { usePathname } from "next/navigation";
import MenuLink from "./MenuLink";

import { pages } from "./pages";

import { BsDiscord } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";

const SideMenu = () => {
  const pathName = usePathname();
  const selectedRoute = "/" + pathName.split("/").filter((path) => !!path)[0];

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
        <a
          target="_blank"
          href="https://discord.com/users/318361153698791425"
          className="cursor-pointer p-1 text-secondary-500 transition hover:text-primary-500"
        >
          <BsDiscord size={24} />
        </a>
        <a
          target="_blank"
          href="https://github.com/Felipe-15"
          className="cursor-pointer p-1 text-secondary-500 transition hover:text-primary-500"
        >
          <AiFillGithub size={24} />
        </a>
        <a
          href="https://www.instagram.com/felipe_souza_25/"
          target="_blank"
          className="cursor-pointer p-1 text-secondary-500 transition hover:text-primary-500"
        >
          <AiOutlineInstagram size={24} />
        </a>
      </div>
    </nav>
  );
};

export default SideMenu;
