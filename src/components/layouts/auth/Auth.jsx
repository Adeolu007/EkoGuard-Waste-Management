import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Navbar } from "../../modules";

const Auth = ({ children, message }) => {
  const { pathname } = useLocation();
  const data = localStorage.getItem("userData");
  const [isAuth, setIsAuth] = useState(true);

  const getActiveUser = useCallback(() => {
    if (!data) {
      setIsAuth(false);
    }
  }, [data]);

  useEffect(() => {
    getActiveUser();
  }, [getActiveUser]);
  return (
    <div className="relative w-full min-h-screen">
      <Navbar auth={isAuth} />
      {message && (
        <div
          className={`${
            pathname === "/" ? "pt-0" : "pt-0"
          } pt-6 pb-0 px-3 md:px-9`}
        >
          <h4 className="text-center font-['Spectral'] text-[28px] lg:text-[46px] text-[#628c23] font-[600] max-w-[1300px] m-auto mb-0 md:mb-5">
            {message}
          </h4>
          <div className="flex items-center bg-transparent md:bg-white py-5 px-1 md:px-6 rounded-[14px] md:shadow-md">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
