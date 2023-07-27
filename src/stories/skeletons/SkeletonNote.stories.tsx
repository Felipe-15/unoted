import { Meta, StoryObj } from "@storybook/react";
import SkeletonNote from "@/app/components/Skeletons/SkeletonNote";

export default {
  title: "Skeletons/Skeleton Note",
  component: SkeletonNote,
  args: {
    onClick: () => null,
  },
  tags: ["autodocs"],
} as Meta<typeof SkeletonNote>;

export const Default = {};
