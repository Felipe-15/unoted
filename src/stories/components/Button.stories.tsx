import { Meta, StoryObj } from "@storybook/react";
import Button from "@/app/components/Button";

export default {
  title: "Components/Button",
  component: Button,
  args: {
    onClick: () => null,
    text: "Button",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "120px" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} as Meta<typeof Button>;

export const Default = {};

export const Outline: StoryObj<typeof Button> = {
  args: {
    outline: true,
  },
};

export const Disabled: StoryObj<typeof Button> = {
  args: {
    disabled: true,
  },
};
