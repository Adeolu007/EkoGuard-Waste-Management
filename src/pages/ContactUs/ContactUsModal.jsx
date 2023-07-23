import React from "react";
import { SWMimages } from "../../assets";
import { Button } from "../../components";

const ContactUsModal = ({ setOpenModal }) => {
  return (
    <div className=" flex flex-col items-center justify-center pt-5 pb-10 px-5">
      <img
        className="object-contain max-w-[120px] pb-[30px]"
        src={SWMimages.check_mark}
        alt=""
      />
      <h4 className="text-center font-['Spectral'] text-[#004B9D] text-[30px] font-semibold">
        We Have Received Your Request
      </h4>
      <p className="text-center font-['Lato'] text-[#666666] text-[14px]">
        Our Customer Representative Will Reach Out Soon
      </p>
      <div className="flex items-center justify-center pt-[34px]">
        <Button
          onClick={() => setOpenModal(false)}
          variant="full"
          size="lg"
          className="text-[12px] h-[52px]"
        >
          Okay
        </Button>
      </div>
    </div>
  );
};

export default ContactUsModal;
