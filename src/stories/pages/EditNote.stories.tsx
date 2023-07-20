import { Meta, StoryObj } from "@storybook/react";
import EditNote from "@/app/(home)/notes/edit/[noteId]/page";
import Layout from "@/app/(home)/layout";

export default {
  title: "Pages/Home/Edit Note",
  component: EditNote,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
      router: {
        path: "/notes/edit/[noteId]",
        asPath: "/notes/edit/3123123434134",
        query: {
          noteId: "3123123434134",
        },
      },
    },
  },
} as Meta<typeof EditNote>;

export const Default: StoryObj<typeof EditNote> = {
  decorators: [(Story) => <Layout>{Story()}</Layout>],
};
