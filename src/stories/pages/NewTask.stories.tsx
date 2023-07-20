import { Meta, StoryObj } from "@storybook/react";
import NewTask from "@/app/(home)/tasks/new-task/page";
import Layout from "@/app/(home)/layout";

export default {
  title: "Pages/Home/New Task",
  component: NewTask,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof NewTask>;

export const Default: StoryObj<typeof NewTask> = {
  decorators: [(Story) => <Layout>{Story()}</Layout>],
};
