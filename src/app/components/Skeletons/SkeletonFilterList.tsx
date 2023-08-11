const SkeletonFilterList = () => {
  return (
    <ul className="flex pb-3 h-fit max-w-full sm:max-w-[400px] overflow-x-auto gap-2">
      <li className="animate-pulse bg-secondary-500 rounded-md w-16 h-11"></li>
      <li className="animate-pulse bg-secondary-500 rounded-md w-16 h-11"></li>
      <li className="animate-pulse bg-secondary-500 rounded-md w-16 h-11"></li>
    </ul>
  );
};

export default SkeletonFilterList;
