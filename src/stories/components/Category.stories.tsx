import { Meta, StoryObj } from "@storybook/react";
import Category from "@/app/components/category/Category";

export default {
  title: "Components/Category",
  component: Category,
  args: {
    name: "Categoria teste",
    color: "#ff9000",
  },
  tags: ["autodocs"],
} as Meta<typeof Category>;

export const Default = {};
