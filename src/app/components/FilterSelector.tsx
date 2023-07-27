interface Props {
  text: string;
  isSelected: boolean;
  onSelect: () => void;
}

const FilterSelector = ({ text, isSelected, onSelect }: Props) => {
  return (
    <li className="list-none cursor-pointer" onClick={onSelect}>
      <span
        data-is-selected={isSelected}
        className={`px-3 text-secondary-500 py-2 w-fit transition flex justify-center items-center rounded-md bg-transparent cursor-pointer data-[is-selected=false]:hover:text-primary-500 data-[is-selected=true]:bg-primary-500 data-[is-selected=true]:cursor-default text-lg whitespace-nowrap`}
      >
        {text}
      </span>
    </li>
  );
};

export default FilterSelector;
