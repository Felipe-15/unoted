import { Meta, StoryObj } from "@storybook/react";
import Input from "@/app/components/Input";
import { BsAt } from "react-icons/bs";

export default {
  title: "Components/Input",
  component: Input,
  args: {
    placeholder: "Digite aqui...",
    icon: BsAt,
  },
  tags: ["autodocs"],
} as Meta<typeof Input>;

export const Default = {};

export const WithError: StoryObj<typeof Input> = {
  args: {
    error: "Email inválido!",
  },
};

export const WithVisibility: StoryObj<typeof Input> = {
  args: {
    type: "password",
    visibility: true,
  },
};
