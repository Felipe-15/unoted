import { Meta, StoryObj } from "@storybook/react";
import CategoryDropdown from "@/app/components/CategoryDropdown";
import { ICategory } from "@/interfaces/Category";

const mockCategories: ICategory[] = [
  {
    color: "#fff",
    creator_id: "123",
    id: "123",
    name: "Categoria teste",
    type: "note",
  },
  {
    color: "#fff",
    creator_id: "123",
    id: "123",
    name: "Categoria teste",
    type: "note",
  },
  {
    color: "#fff",
    creator_id: "123",
    id: "123",
    name: "Categoria teste",
    type: "note",
  },
];

export default {
  title: "Components/Category Drop Down",
  component: CategoryDropdown,
  args: {
    categories: mockCategories,
  },
  tags: ["autodocs"],
} as Meta<typeof CategoryDropdown>;

export const Default = {};

export const CategorySelected: StoryObj<typeof CategoryDropdown> = {
  args: {
    selectedCategory: mockCategories[0],
  },
};
