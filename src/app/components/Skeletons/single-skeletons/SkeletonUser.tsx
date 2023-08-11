const SkeletonUser = () => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <div className="rounded-full h-[32px] w-[32px] bg-secondary-500 animate-pulse" />
      <div className="hidden sm:block bg-secondary-500 rounded-sm animate-pulse h-4 w-12" />
    </div>
  );
};

export default SkeletonUser;
