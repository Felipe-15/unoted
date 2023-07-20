import { Meta, StoryObj } from "@storybook/react";
import NewNote from "@/app/(home)/notes/new-note/page";
import Layout from "@/app/(home)/layout";

export default {
  title: "Pages/Home/New Note",
  component: NewNote,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof NewNote>;

export const Default: StoryObj<typeof NewNote> = {
  decorators: [(Story) => <Layout>{Story()}</Layout>],
};
