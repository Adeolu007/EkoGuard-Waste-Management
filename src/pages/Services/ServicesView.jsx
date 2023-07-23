import React, { useCallback, useEffect, useState } from "react";
import { Modal } from "../../components";
import { SWM_USER_DATA } from "../../services/CONSTANTS";
import { ServiceDetails } from "../../utils/serviceDetails";
import NotAllowed from "./NotAllowed";
import ComingSoon from "./ComingSoon";
import ServicesComp from "./ServicesComp";
import Subscribe from "./Subscribe";

const ServicesView = () => {
  const [openModal, setOpenModal] = useState(false);
  const [comingSoonModal, setcomingSoonModal] = useState(false);
  const [subscribeModal, setSubscribeModal] = useState(false);
  const [subScriptionPlan, setSubscriptionPlan] = useState("");
  const data = localStorage.getItem(SWM_USER_DATA);
  const [isAuth, setIsAuth] = useState(true);
  const [wasteLink, setWasteLink] = useState("");

  const getActiveUser = useCallback(() => {
    if (!data) {
      setIsAuth(false);
    }
  }, [data]);

  useEffect(() => {
    getActiveUser();
  }, [getActiveUser]);
  return (
    <div className="w-full">
      <h1 className="font-['YsabeauInfant'] text-center text-[35px] font-bold mb-[6.5rem] mt-3">
        Our Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between w-full h-full place-items-center max-w-[70rem] m-auto gap-6">
        {ServiceDetails?.map((data) => {
          return (
            <ServicesComp
              key={data.id}
              data={data}
              openModal={openModal}
              setOpenModal={setOpenModal}
              comingSoonModal={comingSoonModal}
              setcomingSoonModal={setcomingSoonModal}
              setSubscribeModal={setSubscribeModal}
              subScriptionPlan={subScriptionPlan}
              setWasteLink={setWasteLink}
              isAuth={isAuth}
            />
          );
        })}
      </div>
      {openModal && (
        <Modal
          content={<NotAllowed title="education" />}
          setOpenModal={() => setOpenModal(false)}
        />
      )}
      {comingSoonModal && (
        <Modal
          content={<ComingSoon />}
          setOpenModal={() => setcomingSoonModal(false)}
        />
      )}
      {subscribeModal && (
        <Modal
          content={
            <Subscribe
              setSubscriptionPlan={setSubscriptionPlan}
              link={wasteLink}
            />
          }
          setOpenModal={() => setSubscribeModal(false)}
        />
      )}
    </div>
  );
};

export default ServicesView;
