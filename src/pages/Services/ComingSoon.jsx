import React from "react";

const NotAllowed = () => {
  return (
    <div className=" flex flex-col items-center justify-center pt-5 pb-10 px-5">
      <img
        className="object-contain max-w-[120px] pb-[30px]"
        // src={VMSimages.check_mark}
        alt=""
      />
      <h4 className="text-center font-['Spectral'] text-[#004B9D] text-[30px] font-semibold">
        Coming Soon
      </h4>
      <p className="text-center font-['Lato'] text-[#666666] text-[14px]">
        Our Team are currently working in this feature
      </p>
    </div>
  );
};

export default NotAllowed;
