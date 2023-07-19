import { Meta, StoryObj } from "@storybook/react";
import SideMenu from "@/app/components/side-menu/SideMenu";
import { pages } from "@/app/components/side-menu/pages";

export default {
  title: "Components/Side Menu",
  component: SideMenu,
  args: {
    pages,
  },
  tags: ["autodocs"],
} as Meta<typeof SideMenu>;

export const Default = {};
