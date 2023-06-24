interface Props {
  text: string;
  isSelected: boolean;
  onSelect: () => void;
}

const FilterSelector = ({ text, isSelected, onSelect }: Props) => {
  return (
    <span
      onClick={onSelect}
      className={`px-3 text-secondary-500 py-2 w-fit transition flex justify-center items-center rounded-md ${
        isSelected
          ? "bg-primary-500 cursor-default"
          : "bg-transparent cursor-pointer hover:text-primary-500"
      }   text-lg whitespace-nowrap`}
    >
      {text}
    </span>
  );
};

export default FilterSelector;
