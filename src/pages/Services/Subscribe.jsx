import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { LOGIN, CHECK_OUT } from "../../routes/CONSTANTS";

const Subscribe = ({ setSubscriptionPlan, link }) => {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col items-center justify-center pt-5 pb-10 px-5 bg-green-300">
      <h4 className="text-center font-['Spectral'] text-[#004B9D] text-[30px] font-semibold">
        Our Plans
      </h4>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-between gap-8">
        <div
          onClick={() => {
            setSubscriptionPlan("7000");
            localStorage.setItem("isSubscribedUser", true);
            localStorage.setItem("wasteLink", link);
            navigate(CHECK_OUT);
          }}
          className=" cursor-pointer flex flex-col items-center justify-center pt-5 pb-10 px-5 bg-white hover:bg-slate-200 duration-500 rounded-full"
        >
          <h4 className="text-center font-['Spectral'] text-[#004B9D] text-[30px] font-semibold">
            # 7000
            <hr />
          </h4>
          <p className="text-center font-['Lato'] text-[#666666] text-[14px]">
          Our monthly payment is 7000 naira
          </p>
          <h1>Monthly</h1>
        </div>
        <div
          onClick={() => {
            setSubscriptionPlan("24000");
            localStorage.setItem("isSubscribedUser", true);
            localStorage.setItem("wasteLink", link);
            navigate(CHECK_OUT);
          }}
          className="cursor-pointer flex flex-col items-center justify-center pt-5 pb-10 px-5 bg-white hover:bg-slate-200 duration-500 rounded-full"
        >
          <h4 className="text-center font-['Spectral'] text-[#004B9D] text-[30px] font-semibold">
            # 24,000
            <hr />
          </h4>
          <p className="text-center font-['Lato'] text-[#666666] text-[14px]">
            Our quarterly payment is 24,000 naira
          </p>
          <h1>Quarterly</h1>
        </div>
        <div
          onClick={() => {
            setSubscriptionPlan("70000");
            localStorage.setItem("isSubscribedUser", true);
            localStorage.setItem("wasteLink", link);
            navigate(CHECK_OUT);
          }}
          className="cursor-pointer flex flex-col items-center justify-center pt-5 pb-10 px-5 bg-white hover:bg-slate-200 duration-500 rounded-full"
        >
          <h4 className="text-center font-['Spectral'] text-[#004B9D] text-[30px] font-semibold">
            # 70,000
            <hr />
          </h4>
          <p className="text-center font-['Lato'] text-[#666666] text-[14px]">
          Our yearly payment is 70,000 naira
          </p>
          <h1>Yearly</h1>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
