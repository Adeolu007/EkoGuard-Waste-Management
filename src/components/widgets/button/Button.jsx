import { Link } from "react-router-dom";

const Button = ({
  to,
  children,
  size = "md",
  variant = "full",
  className = "",
  ...rest
}) => {
  const getSize = (size) => {
    switch (size) {
      case "sm":
        return "px-2 h-8";
      case "md":
        return "px-2 h-8 md:px-[80px] md:h-14";
      case "lg":
        return "px-[80px] h-14";

      default:
        return "p-1 h-10";
    }
  };
  const Button = () => (
    <button
      className={`${getSize(size)} ${
        variant === "full"
          ? "bg-[#628c23] text-white max-w-[800px]"
          : "border-1 bg-white text-[#628c23]"
      } ${className}  rounded-full px-5 py-2 font-['Montserrat'] font-[600]`}
      {...rest}
    >
      {children}
    </button>
  );

  if (to !== undefined)
    return (
      <Link to={to}>
        <Button />
      </Link>
    );

  return <Button />;
};

export default Button;
