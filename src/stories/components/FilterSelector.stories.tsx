import { Meta, StoryObj } from "@storybook/react";
import FilterSelector from "@/app/components/FilterSelector";

export default {
  title: "Components/Filter Selector",
  component: FilterSelector,
  args: {
    isSelected: false,
    text: "Filtro teste",
  },
  tags: ["autodocs"],
} as Meta<typeof FilterSelector>;

export const Default = {};

export const Selected: StoryObj<typeof FilterSelector> = {
  args: {
    isSelected: true,
  },
};
