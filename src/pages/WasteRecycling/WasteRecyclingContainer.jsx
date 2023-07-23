import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import WasteRecyclingView from "./WasteRecyclingView";
import { Landing } from "../../components";
import { toast } from "react-toastify";
import { scheduleWasteRecycling } from "../../redux/slices/recycle-services.slice";
import { useDispatch, useSelector } from "react-redux";
import { SERVICES } from "../../routes/CONSTANTS";
import { useNavigate } from "react-router-dom";

export const WasteRecyclingContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      binRequest: "",
      binQuantity: "",
      binOrBag: "",
      quantityOfBagsOrBins: "",
      category: "",
      location: "",
      pickUpDate: "",
      address: "",
    },
    validationSchema: Yup.object().shape({
      pickUpDate: Yup.string().required("Pick Up Date is required"),
      binRequest: Yup.string().required("Required"),
      binQuantity: Yup.string().when("binRequest", {
        is: (binRequest) => binRequest === "yes",
        then: Yup.string().required("Required"),
      }),
      binOrBag: Yup.string().required("Required"),
      quantityOfBagsOrBins: Yup.string().required(
        "Quantity of Bins is required"
      ),
      category: Yup.string().required("Category is required"),
      location: Yup.string().required("Location is required"),
      address: Yup.string().required("Pickup Address is required"),
    }),
    onSubmit: (details, { resetForm }) => {
      console.log(details);
      setIsLoading(true);
      void dispatch(
        scheduleWasteRecycling({
          pickupAddress: details?.address,
          pickUpDate: details?.pickUpDate,
          bin: details?.binOrBag === "bin" ? true : false,
          bag: details?.binOrBag === "bag" ? true : false,
          quantityOfBagsOrBins: details?.quantityOfBagsOrBins,
          requestStatus: details?.binRequest,
          binQuantity: details?.binQuantity,
          refLocationId: details?.location,
          categoryId: details?.category,
          userId: user?.id,
        })
      )
        .unwrap()
        .then((res) => {
          console.log(res);
          if (res?.statusCodeValue === 400) {
            toast.error(res.body);
            setIsLoading(false);
            return;
          }
          if (res) {
            toast.success(res);
            resetForm();
            navigate(SERVICES);
            setIsLoading(false);
            return;
          }
        })
        .catch((error) => {
          toast.error(error?.message);
          console.log(error);
          setIsLoading(false);
        });
    },
  });

  const binOrBagOption = [
    {
      value: "",
      title: "Select Option",
    },
    {
      value: "bin",
      title: "Bin",
    },
    {
      value: "bag",
      title: "Bag",
    },
  ];

  const categoryOption = [
    {
      value: "",
      title: "Select Category",
    },
    {
      value: "1",
      title: "Pet/Bottles",
    },
    {
      value: "2",
      title: "Paper/Cardboard/Cartons",
    },
    {
      value: "3",
      title: "Cans/Metals",
    },
    {
      value: "4",
      title: "Nylon",
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
      title: "Lagos",
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

  const binRequestOption = [
    {
      value: "",
      title: "Do You Want To Buy A Recycle Bin",
    },
    {
      value: "false",
      title: "No",
    },
    {
      value: "true",
      title: "Yes",
    },
  ];

  return (
    <Landing>
      <WasteRecyclingView
        formik={formik}
        isLoading={isLoading}
        locationOption={locationOption}
        categoryOption={categoryOption}
        binOrBagOption={binOrBagOption}
        binRequestOption={binRequestOption}
      />
    </Landing>
  );
};
