import { Link } from "react-router-dom";
import { SWMimages } from "../../../assets";
import { Button, Navbar } from "../../../components";
import { LOGIN } from "../../../routes/CONSTANTS";

export const AccoutSuccessfullyCreated = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[85vh] flex flex-col items-center justify-center">
        <img
          className="object-contain max-w-[120px] pb-[70px]"
          src={SWMimages.check_mark}
          alt=""
        />
        <h4 className="text-center font-['Spectral'] text-[#004B9D] text-[30px] font-semibold">
          Account Successfully Created
        </h4>
        <p className="text-center font-['Lato'] text-[#666666] text-[14px]">
          Please click the link provided in your mail to confirm your account.
        </p>
        <div className="flex items-center justify-center pt-[74px]">
          <Link to={LOGIN}>
            <Button variant="full" size="lg" className="text-[12px] h-[52px]">
              Go To Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
