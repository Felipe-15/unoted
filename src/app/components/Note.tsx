import { openSans } from "../fonts";
import Link from "next/link";

import { motion } from "framer-motion";

import { MdEdit } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

interface Props {
  noteId: string;
  index: number;
  title: string;
  createdAt: string;
  content: string;
  color?: string;
  onDelete: () => void;
}

const Note = ({
  title,
  index,
  noteId,
  content,
  createdAt,
  color,
  onDelete,
}: Props) => {
  return (
    <motion.article
      layout
      initial={{ y: 500, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{
        type: "ease-in-out",
        delay: 0.1 * (index + 1),
      }}
      style={{ borderTopColor: color || "#ff9000" }}
      className="relative flex flex-col rounded-md border-t-4 bg-background-700 p-4 gap-2 max-w-[280px] min-w-[240px] h-[300px] group"
    >
      <header className="flex flex-col gap-2">
        <p className={`${openSans.className} text-sm text-gray-400 font-bold`}>
          {createdAt}
        </p>
        <h4 className="text-xl text-secondary-500 mb-2">{title}</h4>
        <p className={`${openSans.className} font-normal text-secondary-500 `}>
          {content}
        </p>
      </header>
      <footer className="transition-opacity opacity-0 absolute bottom-2 right-2 flex items-center group-hover:opacity-100 justify-center gap-1">
        <Link
          href={`notes/edit/${noteId}`}
          className="p-2 text-secondary-500 transition hover:text-primary-500"
        >
          <MdEdit />
        </Link>
        <button
          onClick={onDelete}
          className="p-2 text-secondary-500 transition hover:text-danger"
        >
          <BsFillTrashFill />
        </button>
      </footer>
    </motion.article>
  );
};

export default Note;
