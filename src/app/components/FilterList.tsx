import "@/styles/scroll.css";

import { ICategory } from "@/interfaces/Category";

import FilterSelector from "./FilterSelector";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

interface Props {
  children: React.ReactNode;
  dinamicConfig?: {
    selectedFilter: ICategory | null;
    dinamicFilters: ICategory[];
    onSelectFilter: (category: ICategory) => void;
  };
}

const FilterList = ({ children, dinamicConfig }: Props) => {
  const dragRef = useRef<HTMLUListElement>({} as any);
  const { events } = useDraggable(dragRef, { applyRubberBandEffect: true });
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
    <ul
      className="flex cursor-grab active:cursor-grabbing pb-3 h-fit max-w-full sm:max-w-[400px] overflow-x-scroll gap-2 invisible-scroll"
      {...events}
      ref={dragRef}
    >
      {children}
      {generateFilters()}
    </ul>
  );
};

export default FilterList;
