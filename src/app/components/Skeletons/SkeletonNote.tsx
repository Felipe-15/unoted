const SkeletonNote = () => {
  return (
    <div className="flex flex-col w-[280px] h-[300px] border-t-4 border-secondary-500 p-4 rounded-md animate-pulse bg-background-600 gap-2">
      <div
        style={{ animationDelay: "0.5s" }}
        className="bg-secondary-500 w-12 h-3 animate-pulse rounded-sm"
      />
      <div className="bg-secondary-500 w-full h-6 animate-pulse rounded-sm mb-2" />
      <div className="flex flex-col w-full gap-2">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div
              key={index.toString()}
              className="w-full rounded-sm h-2 bg-secondary-500 pulse"
            />
          ))}
      </div>
      <div className="flex justify-end gap-3 items-end flex-1">
        <div className="w-8 h-6 rounded-sm pulse bg-secondary-500" />
        <div className="w-8 h-6 rounded-sm pulse bg-secondary-500" />
      </div>
    </div>
  );
};

export default SkeletonNote;
