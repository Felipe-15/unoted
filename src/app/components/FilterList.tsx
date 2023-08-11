"use client";
import "@/styles/scroll.css";
import { useEffect, useState } from "react";

import { ICategory } from "@/interfaces/Category";

import FilterSelector from "./FilterSelector";

interface Props {
  children: React.ReactNode;
  dinamicConfig?: {
    selectedFilter: ICategory | null;
    dinamicFilters: ICategory[];
    onSelectFilter: (category: ICategory) => void;
  };
}

const FilterList = ({ children, dinamicConfig }: Props) => {
  const generateFilters = () => {
    if (!dinamicConfig) return;

    const { dinamicFilters, onSelectFilter, selectedFilter } = dinamicConfig;

    return dinamicFilters.map((category) => (
      <FilterSelector
        key={category.id}
        isSelected={category.id === selectedFilter?.id}
        text={category.name}
        onSelect={() => onSelectFilter(category)}
      />
    ));
  };

  return (
    <ul className="flex pb-3 h-fit max-w-full sm:max-w-[400px] overflow-x-auto gap-2">
      {children}
      {generateFilters()}
    </ul>
  );
};

export default FilterList;
