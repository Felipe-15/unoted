import { Meta, StoryObj } from "@storybook/react";
import Notes from "@/app/(home)/notes/page";
import Layout from "@/app/(home)/layout";

export default {
  title: "Pages/Home/Notes",
  component: Notes,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof Notes>;

export const Default: StoryObj<typeof Notes> = {
  decorators: [(Story) => <Layout>{Story()}</Layout>],
};
