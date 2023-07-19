import { Meta, StoryObj } from "@storybook/react";
import StandardPage from "@/app/components/StandardPage";

export default {
  title: "Components/Standard Page",
  component: StandardPage,
  args: {
    user: {
      id: "123",
      name: "Felipe",
    },
    headerType: "full",
  },
  tags: ["autodocs"],
} as Meta<typeof StandardPage>;

export const Default = {};

export const WithoutSearch: StoryObj<typeof StandardPage> = {
  args: {
    headerType: "noSearch",
  },
};
