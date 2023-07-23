import React from "react";
import { Link } from "react-router-dom";
import { SWMEmailArt, SWMPhoneArt } from "../../../components/icons";
import { FORGOT_PASSWORD, SIGNUP } from "../../../routes/CONSTANTS";

const LoginOptionComp = ({ setSelectedLoginOption }) => {
  return (
    <div className="w-full m-auto max-w-[1000px] px-4">
      <div className="text-center text-[20px] font-bold mb-[1rem] mt-0">
        <h1 className="mb-5 text-[20px]">How do you wish to login</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 items-center">
          <div
            onClick={() => setSelectedLoginOption("email")}
            className="flex-col items-center justify-center cursor-pointer border p-4 rounded-lg border-[#628c23] hover:bg-slate-200 transition-all duration-500"
          >
            <h4 className="text-[16px] mb-2">Email Address</h4>
            <div className="flex justify-center">
              <SWMEmailArt size={150} />
            </div>
          </div>
          or
          <div
            onClick={() => setSelectedLoginOption("phone")}
            className="flex-col items-center justify-center cursor-pointer border p-4 rounded-lg border-[#628c23] hover:bg-slate-200 transition-all duration-500"
          >
            <h4 className="text-[16px] mb-2">Phone Number</h4>
            <div className="flex justify-center">
              <SWMPhoneArt size={150} />
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Montserrat'] text-[14px] text-[#666666] text-center font-bold mb-6">
        Don't have an account?{" "}
        <Link to={SIGNUP}>
          <span className="text-secondary">Sign Up</span>
        </Link>
      </p>
      <p className="font-['Montserrat'] text-[14px] text-secondary text-center font-bold">
        <Link to={FORGOT_PASSWORD}>
          <span>Forgot Password?</span>
        </Link>
      </p>
    </div>
  );
};

export default LoginOptionComp;
