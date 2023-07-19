import { Meta, StoryObj } from "@storybook/react";
import Register from "@/app/auth/register/page";
import Layout from "@/app/auth/layout";

export default {
  title: "Pages/Auth/Register",
  component: Register,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof Register>;

export const Default: StoryObj<typeof Register> = {
  decorators: [(Story) => <Layout>{Story()}</Layout>],
};

export const WithoutLayout: StoryObj<typeof Register> = {};
