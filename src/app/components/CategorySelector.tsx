interface Props {
  text: string;
  isSelected: boolean;
}

const CategorySelector = ({ text, isSelected }: Props) => {
  return (
    <div
      className={`px-3 text-secondary-500 py-2 min-w-[100px] transition flex justify-center items-center rounded-md ${
        isSelected
          ? "bg-primary-500 cursor-default"
          : "bg-transparent cursor-pointer hover:text-primary-500"
      }   text-lg`}
    >
      <span>{text}</span>
    </div>
  );
};

export default CategorySelector;
