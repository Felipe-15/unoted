import { Meta, StoryObj } from "@storybook/react";
import CategoryName from "@/app/components/category/CategoryName";

export default {
  title: "Components/Category Name",
  component: CategoryName,
  args: {
    defaultName: "Categoria teste",
  },
  tags: ["autodocs"],
} as Meta<typeof CategoryName>;

export const Default = {};
