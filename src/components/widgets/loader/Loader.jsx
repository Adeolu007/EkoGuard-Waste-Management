const Loader = ({ color, className }) => {
  const circleCommonClasses = "h-2.5 w-2.5 bg-white rounded-full";

  return (
    <div className={`${className} flex`}>
      <div
        className={`${circleCommonClasses} mr-1 animate-bounce`}
        style={{ backgroundColor: color }}
      ></div>
      <div
        className={`${circleCommonClasses} mr-1 animate-bounce duration-200`}
        style={{ backgroundColor: color }}
      ></div>
      <div
        className={`${circleCommonClasses} animate-bounce duration[400ms]`}
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
};

export default Loader;
