import { openSans } from "../fonts";

import { MdEdit } from "react-icons/md";
import { BsCheck, BsFillTrashFill } from "react-icons/bs";
import Task from "./Task";
import { ITask } from "@/interfaces/Task";
import { DateTime } from "luxon";
import { formatDate } from "@/utils/formatDate";

interface Props {
  categorieName: string;
  expireAt: number | null;
  tasks: ITask[];
  color?: string;
  removeChecked: boolean;
  onEditTask: (checked: boolean, id: string) => void;
  onRemoveTask: (taskId: string) => Promise<void>;
}

const TaskNote = ({
  categorieName,
  tasks,
  expireAt,
  color,
  removeChecked,
  onEditTask,
  onRemoveTask,
}: Props) => {
  let titleDate = "";
  if (!expireAt) {
    console.log("zero");
    titleDate = formatDate(Date.now());
  } else {
    titleDate = formatDate(Date.now() + expireAt);
  }

  return (
    <div
      style={{ borderTopColor: color || "#ff9000" }}
      className="relative flex flex-col rounded-md border-t-4 bg-background-700 p-4 gap-2 max-w-[280px] min-w-[240px] h-[300px] group"
    >
      <div className="flex flex-col gap-2 h-full">
        {expireAt !== null && (
          <span
            className={`${openSans.className} text-sm text-gray-400 font-bold`}
          >
            {titleDate}
          </span>
        )}
        <h4 className="text-xl text-secondary-500 mb-2">{categorieName}</h4>
        <ul className="flex flex-col pl-2 transition-all h-full overflow-x-hidden text-ellipsis overflow-y-auto ">
          {tasks
            .filter((t) => {
              console.log(t.expires_at);
              console.log("Data da task: ", DateTime.fromISO(t.expires_at));
              console.log(
                "Data de expiração máxima: ",
                DateTime.fromMillis(expireAt || Date.now()),
                expireAt
              );
              let formatedDate = t.expires_at.split("/");
              formatedDate = `${formatedDate[2]}-${formatedDate[1]}-${formatedDate[0]}`;
              return expireAt !== null
                ? DateTime.fromMillis(Date.now() + expireAt).startOf("day") >=
                    DateTime.fromISO(formatedDate).startOf("day")
                : true;
            })
            .map((t) => (
              <div key={t.id} className="flex gap-2 group">
                <Task
                  {...t}
                  key={t.id}
                  animationOnRemove={removeChecked}
                  onToggleCheck={(checked) => onEditTask(checked, t.id)}
                />
                <button
                  onClick={() => onRemoveTask(t.id)}
                  className="opacity-0 group-hover:opacity-100 transition text-secondary-500 hover:text-danger"
                >
                  <BsFillTrashFill />
                </button>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskNote;
