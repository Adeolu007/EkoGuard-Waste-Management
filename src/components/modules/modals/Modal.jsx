import { useState } from "react";
import { SWMClose } from "../../icons";

const Modal = ({
  content,
  title,
  breadCrumbsLinks,
  setOpenModal,
  openModal,
  ...otherProps
}) => {
  // const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div>
      {!openModal && (
        <div
          className="w-full h-screen fixed inset-0 flex items-center justify-center p-5 z-50"
          {...otherProps}
        >
          <div className="relative w-full md:w-1/2 bg-white rounded-[15px] z-50">
            {title && (
              <div className="w-full h-[50px] flex items-center justify-between px-5 py-2 border-b-2 border-b-gray-200 bg-[#001E3F] rounded-t-[15px]">
                <div></div>
                <p className="text-white font-['Spectral'] text-[18px]">
                  {title}
                </p>
                <SWMClose
                  size={12}
                  onClick={toggleModal}
                  className="text-green cursor-pointer"
                />
              </div>
            )}
            <div className="w-full min-h-[40vh] max-h-[80vh] overflow-y-auto">
              {content}
            </div>
          </div>
          <div
            onClick={toggleModal}
            className="fixed inset-0 bg-black/70 z-10"
          ></div>
        </div>
      )}
    </div>
  );
};

export default Modal;
