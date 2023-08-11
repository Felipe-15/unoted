const SkeletonCategory = () => {
  return (
    <div className="flex gap-4 max-w-[260px] w-full shrink-0 items-center">
      <div className="rounded-[50%] shrink-0 h-8 w-8 pulse bg-secondary-500 animate-pulse " />
      <div className="w-full bg-secondary-500 rounded-md h-8 animate-pulse" />
    </div>
  );
};

export default SkeletonCategory;
