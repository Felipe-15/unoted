import { Meta, StoryObj } from "@storybook/react";
import SkeletonCategory from "@/app/components/Skeletons/SkeletonCategory";

export default {
  title: "Skeletons/Skeleton Category",
  component: SkeletonCategory,
  args: {
    onClick: () => null,
  },
  tags: ["autodocs"],
} as Meta<typeof SkeletonCategory>;

export const Default = {};
