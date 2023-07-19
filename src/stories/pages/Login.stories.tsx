import { Meta, StoryObj } from "@storybook/react";
import Login from "@/app/auth/login/page";
import Layout from "@/app/auth/layout";

export default {
  title: "Pages/Auth/Login",
  component: Login,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof Login>;

export const Default: StoryObj<typeof Login> = {
  decorators: [(Story) => <Layout>{Story()}</Layout>],
};

export const WithoutLayout: StoryObj<typeof Login> = {};
