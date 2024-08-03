import { openSans } from "../fonts";

import Task from "./Task";
import { ITask } from "@/interfaces/Task";
import { DateTime } from "luxon";
import { formatDate } from "@/utils/formatDate";
import { motion } from "framer-motion";

interface Props {
  categorieName: string;
  expireAt: { value: number; text: string } | null;
  tasks: ITask[];
  color?: string;
  index: number;
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
  index,
  onEditTask,
  onRemoveTask,
}: Props) => {
  let titleDate = "";
  if (!expireAt) {
    titleDate = formatDate(Date.now());
  } else {
    titleDate = formatDate(Date.now() + expireAt.value);
  }

  const filteredTasks = tasks
    .filter((t) => {
      let formatedDate = t.expires_at.split("/");
      formatedDate = `${formatedDate[2]}-${formatedDate[1]}-${formatedDate[0]}`;

      const stillOnDeadline =
        expireAt !== null
          ? DateTime.fromMillis(Date.now() + expireAt?.value).startOf("day") >=
            DateTime.fromISO(formatedDate).startOf("day")
          : true;
      return stillOnDeadline;
    })
    .map((t) => (
      <Task
        {...t}
        key={t.id}
        animationOnRemove={removeChecked}
        onToggleCheck={(checked) => onEditTask(checked, t.id)}
        onDelete={() => onRemoveTask(t.id)}
      />
    ));

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
      className="relative flex flex-col rounded-md border-t-4 bg-background-700 p-4 gap-2 max-w-[280px] min-w-[240px] h-[300px]"
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
          {filteredTasks.length ? (
            filteredTasks
          ) : (
            <p className="text-sm text-secondary-500 font-light">
              Sem tasks com prazo até{" "}
              <span className="font-bold text-primary-500">
                {expireAt ? expireAt.text : "hoje"}! &#128526;
              </span>
            </p>
          )}
        </ul>
      </div>
    </motion.article>
  );
};

export default TaskNote;
