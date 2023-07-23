import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import WasteDisposalView from "./WasteDisposalView";
import { Landing } from "../../components";
import { toast } from "react-toastify";

import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { scheduleWasteDisposal } from "../../redux/slices/waste-services";
import { SERVICES } from "../../routes/CONSTANTS";
import { useNavigate } from "react-router-dom";

export const WasteDisposalContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      binRequest: "",
      binQuantity: "",
      location: "",
      pickupAddress: "",
    },
    validationSchema: Yup.object().shape({
      pickupAddress: Yup.string().required("Pickup Address is required"),
      binQuantity: Yup.string().when("binRequest", {
        is: (binRequest) => binRequest === "yes",
        then: Yup.string().required("Quantity of Bins is required"),
      }),
      binRequest: Yup.string().required("Bin Request is required"),
      location: Yup.string().required("Location is required"),
    }),
    onSubmit: (details, { resetForm }) => {
      setIsLoading(true);
      console.log(details);
      void dispatch(
        scheduleWasteDisposal({
          binRequestDto: {
            requestStatus: details?.binRequest === "1" ? true : false,
            binQuantity: Number(details?.binQuantity),
          },
          refLocationId: Number(details?.location),
          scheduleDto: {
            pickupAddress: details?.pickupAddress,
          },
          userId: user?.id,
        })
      )
        .unwrap()
        .then((res) => {
          console.log(res);
          if (res?.statusCodeValue === 400) {
            toast.error(res.body);
            resetForm();
            setIsLoading(false);
            return;
          }
          if (res) {
            navigate(SERVICES);
            toast.success(res);
            setIsLoading(false);
            return;
          }
        })
        .catch((error) => {
          toast.error(error.message);
          setIsLoading(false);
        });
    },
  });

  const binRequestOption = [
    {
      value: "",
      title: "Do You Want To Buy A Waste Bin",
    },
    {
      value: "0",
      title: "No",
    },
    {
      value: "1",
      title: "Yes",
    },
  ];

  const locationOption = [
    {
      value: "",
      title: "Select Location",
    },
    {
      value: "2",
      title: "Alimosho",
    },
    {
      value: "3",
      title: "Lagos Island",
    },
    {
      value: "4",
      title: "Somolu",
    },
    {
      value: "5",
      title: "Ikorodu",
    },
  ];

  return (
    <Landing>
      <WasteDisposalView
        formik={formik}
        isLoading={isLoading}
        binRequestOption={binRequestOption}
        locationOption={locationOption}
      />
    </Landing>
  );
};
