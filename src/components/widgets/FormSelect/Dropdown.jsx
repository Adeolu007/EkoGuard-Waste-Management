const Dropdown = ({ options, size = "md", className = "", ...props }) => {
  // const [selected, onSelect] = useState("Enter Industry");
  const getSize = (size) => {
    switch (size) {
      case "sm":
        return "px-2 h-10";
      case "md":
        return "px-4 h-12";
      case "lg":
        return "px-2 h-16";

      default:
        return "p-1 h-10";
    }
  };

  return (
    <select
      className={`${getSize(
        size
      )} ${className} text-base bg-white placeholder:text-[#8692A6] border-[1.5px] border-[#333333] rounded-[6px] focus:border-[#004B9D] outline-none`}
      {...props}
    >
      {options.map(({ value, title }, key) => (
        <option key={key} value={value} className="text-lg">
          {title}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
