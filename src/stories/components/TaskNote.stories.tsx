import { Meta, StoryObj } from "@storybook/react";
import TaskNote from "@/app/components/TaskNote";

export default {
  title: "Components/Task Note",
  component: TaskNote,
  args: {
    categorieName: "Categoria teste",
    color: "#ff9000",
    expireAt: null,
    tasks: [
      {
        category_id: "123",
        checked: false,
        creator_id: "123",
        expires_at: {
          toMillis: () => Date.now() + 9999999,
        },
        id: "123",
        text: "Fazer projeto",
      },
      {
        category_id: "123",
        checked: false,
        creator_id: "123",
        expires_at: {
          toMillis: () => Date.now() + 99999999,
        },
        id: "123",
        text: "Fazer projeto",
      },
      {
        category_id: "123",
        checked: false,
        creator_id: "123",
        expires_at: {
          toMillis: () => Date.now() + 99999999,
        },
        id: "123",
        text: "Fazer projeto",
      },
    ],
  },
  tags: ["autodocs"],
} as Meta<typeof TaskNote>;

export const Default = {};
