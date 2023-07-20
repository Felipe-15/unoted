import { Meta, StoryObj } from "@storybook/react";
import Categories from "@/app/(home)/categories/page";
import Layout from "@/app/(home)/layout";

export default {
  title: "Pages/Home/Categories",
  component: Categories,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof Categories>;

export const Default: StoryObj<typeof Categories> = {
  decorators: [(Story) => <Layout>{Story()}</Layout>],
};
