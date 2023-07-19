import { Meta, StoryObj } from "@storybook/react";
import Tasks from "@/app/(home)/tasks/page";
import Layout from "@/app/(home)/layout";

export default {
  title: "Pages/Home/Tasks",
  component: Tasks,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof Tasks>;

export const Default: StoryObj<typeof Tasks> = {
  decorators: [(Story) => <Layout>{Story()}</Layout>],
};
