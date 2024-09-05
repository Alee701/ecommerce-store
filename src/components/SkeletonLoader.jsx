const SkeletonLoader = () => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-gray-200 rounded-lg p-4 animate-pulse h-60" />
        ))}
      </div>
    );
  };
  
  export default SkeletonLoader;
  