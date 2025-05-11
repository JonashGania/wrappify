const PlaylistPageSkeleton = () => {
  return (
    <div className="min-h-screen max-w-3xl w-full mx-auto pt-24 px-4">
      <div className="flex items-end gap-6">
        <div className="w-[130px] h-[130px] min-[580px]:w-[180px] min-[580px]:h-[180px] animate-pulse bg-neutral-700 rounded-sm"></div>
        <div className="flex flex-col">
          <div className="h-4 w-[100px] bg-neutral-700 animate-pulse rounded-md mb-3"></div>
          <div className="h-14 w-[250px] bg-neutral-700 animate-pulse rounded-md mb-5"></div>
          <div className="h-5 w-[150px] bg-neutral-700 animate-pulse rounded-md"></div>
        </div>
      </div>
      <div className="pt-8 flex flex-col gap-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4 ">
            <div className="size-11 bg-neutral-700 animate-pulse rounded-sm"></div>
            <div className="w-full">
              <div className="w-full h-5 bg-neutral-700 animate-pulse rounded-md mb-2"></div>
              <div className="w-[180px] h-4 bg-neutral-700 animate-pulse rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPageSkeleton;
