const SkeletonTaskNote = () => {
  return (
    <div className="flex flex-col w-[280px] h-[300px] border-t-4 border-secondary-500 p-4 rounded-md animate-pulse bg-zinc-400 gap-2">
      <div
        style={{ animationDelay: "0.5s" }}
        className="bg-secondary-500 w-12 h-3 animate-pulse rounded-sm"
      />
      <div className="bg-secondary-500 w-full h-6 animate-pulse rounded-sm mb-2" />
      <div className="flex flex-col w-full gap-2">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              key={index.toString()}
              className="flex gap-2 items-center shrink-0"
            >
              <div className="w-6 h-6 rounded-sm bg-secondary-500 pulse" />
              <div className="w-full rounded-sm h-4 bg-secondary-500 pulse" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SkeletonTaskNote;
