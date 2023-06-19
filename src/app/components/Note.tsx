import { openSans } from "../fonts";

import { MdEdit } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

interface Props {
  title: string;
  createdAt: string;
  content: string;
}

const Note = ({ title, content, createdAt }: Props) => {
  return (
    <div className="relative flex flex-col rounded-md border-t-4 border-primary-500 bg-background-700 p-4 gap-2 max-w-[280px] min-w-[240px] h-[300px] group">
      <div className="flex flex-col gap-2">
        <span
          className={`${openSans.className} text-sm text-gray-400 font-bold`}
        >
          {createdAt}
        </span>
        <h4 className="text-xl text-secondary-500 mb-2">{title}</h4>
        <p className={`${openSans.className} font-normal text-secondary-500 `}>
          {content}
        </p>
      </div>
      <div className="transition-opacity opacity-0 absolute bottom-2 right-2 flex items-center group-hover:opacity-100 justify-center gap-1">
        <button className="p-2 text-secondary-500 transition hover:text-primary-500">
          <MdEdit />
        </button>
        <button className="p-2 text-secondary-500 transition hover:text-danger">
          <BsFillTrashFill />
        </button>
      </div>
    </div>
  );
};

export default Note;
