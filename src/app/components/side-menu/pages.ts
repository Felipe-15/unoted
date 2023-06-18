import { MdDashboard } from "react-icons/md";
import { TbFolders } from "react-icons/tb";
import { BsListCheck } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { IoMdHelp } from "react-icons/io";

export const pages = {
  firstBlockPages: [
    {
      icon: MdDashboard,
      text: "Minhas notas",
      path: "#",
    },
    {
      icon: TbFolders,
      text: "Categorias",
      path: "#",
    },
    {
      icon: BsListCheck,
      text: "Tarefas",
      path: "#",
    },
  ],
  secondBlockPages: [
    {
      icon: FiUser,
      text: "Perfil",
      path: "#",
    },
    {
      icon: IoMdHelp,
      text: "Ajuda",
      path: "#",
    },
  ],
};
