import { openSans } from "../fonts";

import { MdEdit } from "react-icons/md";
import { BsCheck, BsFillTrashFill } from "react-icons/bs";
import Task from "./Task";
import { ITask } from "@/interfaces/Task";

interface Props {
  categorieName: string;
  expireAt: string | null;
  tasks: ITask[];
  color?: string;
  removeChecked: boolean;
  onEditTask: (checked: boolean, id: string) => void;
}

const TaskNote = ({
  categorieName,
  tasks,
  expireAt,
  color,
  removeChecked,
  onEditTask,
}: Props) => {
  return (
    <div
      style={{ borderTopColor: color || "#ff9000" }}
      className="relative flex flex-col rounded-md border-t-4 bg-background-700 p-4 gap-2 max-w-[280px] min-w-[240px] h-[300px] group"
    >
      <div className="flex flex-col gap-2 h-full">
        {expireAt && (
          <span
            className={`${openSans.className} text-sm text-gray-400 font-bold`}
          >
            {expireAt}
          </span>
        )}
        <h4 className="text-xl text-secondary-500 mb-2">{categorieName}</h4>
        <div className="flex flex-col pl-2 gap-2 transition-all h-full overflow-x-hidden text-ellipsis overflow-y-auto ">
          {tasks
            .filter((t) =>
              expireAt !== null
                ? new Date(expireAt || "").getTime() > t.expires_at.toMillis()
                : true
            )
            .map((t) => (
              <Task
                {...t}
                key={t.id}
                animationOnRemove={removeChecked}
                onToggleCheck={(checked) => onEditTask(checked, t.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TaskNote;
