"use client";
import "@/styles/animations.css";
import { useState, useEffect, useRef } from "react";
import { GoGear } from "react-icons/go";
import { IoMdClose } from "react-icons/io";

interface Props {
  children: React.ReactNode;
  title: string;
}

const ResponsiveHolder = ({ title, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const configRef = useRef({} as HTMLDivElement);

  const handleToggleOpen = () => {
    if (isOpen) {
      setTimeout(() => setIsOpen(false), 450);
      configRef.current.classList.replace("fade-in", "fade-out");
    } else {
      configRef.current.classList.replace("fade-out", "fade-in");
      setIsOpen(true);
    }
  };

  useEffect(() => {
    console.log("Use effect");
    if (window.innerWidth <= 480) {
      console.log("Use effect condicional");
      setIsMobile(true);
    }
  }, []);
  return (
    <div data-is-open={isOpen} className="flex">
      <button
        style={{ display: isMobile ? "flex" : "none" }}
        onClick={handleToggleOpen}
        className="p-1 fixed right-6 bottom-20 cursor-pointer transition hover:rotate-45 rounded-full bg-background-700 hover:bg-primary-500 "
      >
        <GoGear size={24} className="static sm:hidden text-secondary-500" />
      </button>

      <div
        style={{ display: isMobile ? (isOpen ? "flex" : "none") : "flex" }}
        ref={configRef}
        className="fade-in absolute min-w-[70%] top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4 bg-background-800 w-fit h-fit  rounded-md sm:static sm:w-fit sm:h-fit sm:translate-x-0 sm:translate-y-0 sm:bg-transparent p-4 pb-28 sm:p-0"
      >
        <div className="w-full flex justify-between text-secondary-500 items-center border-b-[1px] border-b-zinc-400 pb-2 sm:hidden">
          <p className="text-lg">{title}</p>
          <IoMdClose
            size={24}
            className="text-secondary-500 cursor-pointer"
            onClick={handleToggleOpen}
          />
        </div>
        <div className="flex gap-6">{children}</div>
      </div>
    </div>
  );
};

export default ResponsiveHolder;
