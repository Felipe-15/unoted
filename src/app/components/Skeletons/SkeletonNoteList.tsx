import SkeletonNote from "./single-skeletons/SkeletonNote";

const SkeletonNoteList = () => {
  return (
    <section className="grid justify-center md:justify-start pr-4 grid-fit gap-4 overflow-y-auto overflow-x-hidden h-[calc(100%-10vh)]">
      {Array(3)
        .fill({})
        .map((_, index) => (
          <SkeletonNote key={index.toString()} />
        ))}
    </section>
  );
};

export default SkeletonNoteList;
