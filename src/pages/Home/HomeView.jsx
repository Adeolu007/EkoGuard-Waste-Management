import { Link } from "react-router-dom";
import { SWMimages } from "../../assets";
import "./styles.css";

import { SERVICES } from "../../routes/CONSTANTS";

const HomeView = () => {
  return (
    <div className="h-[100vh] overflow-hidden bg-white">
      <div
        className="relative h-full px-[18px] lg:px-[11rem]"
        style={{
          backgroundImage: `url(${SWMimages.home_background})`,
          backgroundSize: "80% auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div>
          <div className="p-[1.2rem]">
            <img
              className="w-[4rem]"
              src={SWMimages.eco_gaurd_logo}
              alt="logo"
            />
          </div>
          <p className="max-w-[18rem] font-[800] text-[13px] leading-[1rem]">
            A smart waste management system designed for YOU, to help keep your
            community clean.
          </p>
        </div>
        <section className="callToAction">
          <Link to={SERVICES}>
            <button className="mainButton">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span>SERVICES</span>
            </button>
            <button className="altButton">SERVICES</button>
          </Link>
        </section>
      </div>
    </div>
  );
};
export default HomeView;
