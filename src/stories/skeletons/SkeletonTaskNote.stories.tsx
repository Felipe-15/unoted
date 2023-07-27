import { Meta, StoryObj } from "@storybook/react";
import SkeletonTaskNote from "@/app/components/Skeletons/SkeletonTaskNote";

export default {
  title: "Skeletons/Skeleton Task Note",
  component: SkeletonTaskNote,
  args: {
    onClick: () => null,
  },
  tags: ["autodocs"],
} as Meta<typeof SkeletonTaskNote>;

export const Default = {};
