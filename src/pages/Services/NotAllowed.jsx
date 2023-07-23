import React from "react";
import { Link } from "react-router-dom";
// import { VMSimages } from "../../../assets";
import { Button } from "../../components";
import { LOGIN } from "../../routes/CONSTANTS";

const NotAllowed = () => {
  return (
    <div className=" flex flex-col items-center justify-center pt-5 pb-10 px-5">
      <img
        className="object-contain max-w-[120px] pb-[30px]"
        // src={VMSimages.check_mark}
        alt=""
      />
      <h4 className="text-center font-['Spectral'] text-[#004B9D] text-[30px] font-semibold">
        Log In To Access Our Services
      </h4>
      <p className="text-center font-['Lato'] text-[#666666] text-[14px]">
        You have to log in to use our services
      </p>
      <div className="flex items-center justify-center pt-[34px]">
        <Link to={LOGIN}>
          <Button variant="full" size="lg" className="text-[12px] h-[52px]">
            Log In
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotAllowed;
