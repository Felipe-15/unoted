import { Meta, StoryObj } from "@storybook/react";
import AddCategoryButton from "@/app/components/AddCategoryButton";

export default {
  title: "Components/Add Category Button",
  component: AddCategoryButton,
  args: {
    onClick: () => null,
  },
  tags: ["autodocs"],
} as Meta<typeof AddCategoryButton>;

export const Default = {};
