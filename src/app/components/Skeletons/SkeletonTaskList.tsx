import SkeletonTaskNote from "./single-skeletons/SkeletonTaskNote";

const SkeletonTaskList = () => {
  return (
    <section className="grid justify-center md:justify-start pr-4 grid-fit gap-4 overflow-y-auto overflow-x-hidden h-[calc(100%-10vh)]">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <SkeletonTaskNote key={index.toString()} />
        ))}
    </section>
  );
};

export default SkeletonTaskList;
