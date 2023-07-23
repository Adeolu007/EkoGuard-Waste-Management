import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, children, className }) => {
  const { pathname } = useLocation();
  return (
    <Link
      to={to}
      className={`${
        pathname === to
          ? "text-[#628c23] border-b-2 border-b-primary"
          : "text-white hover:text-[#628c23]"
      } font-['Spectral'] text-[12px] md:text-[20px] font-[600] w-full ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
