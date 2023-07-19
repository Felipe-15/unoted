import { Meta, StoryObj } from "@storybook/react";
import Note from "@/app/components/Note";

export default {
  title: "Components/Note",
  component: Note,
  args: {
    title: "Nota teste",
    color: "#ff9000",
    content: "Exemplo de conteúdo para a nota, storybook preview!",
    createdAt: "15 Jun, 2023",
  },
  argTypes: {
    color: {
      name: "color",
      type: "string",
      description: "Note category color",
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Note>;

export const Default = {};
