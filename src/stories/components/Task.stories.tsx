import { Meta, StoryObj } from "@storybook/react";
import Task from "@/app/components/Task";

export default {
  title: "Components/Task",
  component: Task,
  args: {
    text: "Exemplo de tarefa",
  },
  tags: ["autodocs"],
} as Meta<typeof Task>;

export const Default = {};

export const Marked: StoryObj<typeof Task> = {
  args: {
    checked: true,
  },
};
