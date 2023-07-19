import { Meta, StoryObj } from "@storybook/react";
import MenuLink from "@/app/components/side-menu/MenuLink";
import { MdDashboard } from "react-icons/md";

export default {
  title: "Components/Menu Link",
  component: MenuLink,
  args: {
    icon: MdDashboard,
    isSelected: false,
    path: "teste",
    text: "Link de teste",
  },
  tags: ["autodocs"],
} as Meta<typeof MenuLink>;

export const Default: StoryObj = {};

export const Selected: StoryObj<typeof MenuLink> = {
  args: {
    isSelected: true,
  },
};
