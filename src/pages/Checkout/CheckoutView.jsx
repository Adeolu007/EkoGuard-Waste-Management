import { useFormik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { SWMimages } from "../../assets";
import {
  AppDatePicker,
  Button,
  FormInput,
  FormSelect,
  Loader,
} from "../../components";

const CheckoutView = ({ scheduleDetails, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [expD, setExpD] = useState(false);
  const nextRoute = localStorage.getItem("wasteLink");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      cardName: "",
      cardNumber: "",
      cardType: "",
      expiryDate: "",
      cvv: "",
    },
    validationSchema: Yup.object().shape({
      cardName: Yup.string().required("Card Name is required"),
      cardNumber: Yup.string().required("Card Number is required"),
      cardType: Yup.string().required("Card Type is required"),
      expiryDate: Yup.string().required("Expiry Date is required"),
      cvv: Yup.string().required("CVV is required"),
    }),
    onSubmit: (details, { resetForm }) => {
      setIsLoading(true);
      console.log(details);
      setTimeout(() => {
        toast.success("Payment made successfully");
        navigate(nextRoute);
        setIsLoading(false);
      }, 4000);
    },
  });

  const cardOption = [
    {
      title: "--Select Card Type--",
      value: "",
    },
    {
      title: "Visa",
      value: "visa",
    },
    {
      title: "Verve",
      value: "verve",
    },
    {
      title: "Master",
      value: "master",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-white p-8 max-w-[55rem] m-auto mt-14 rounded-lg shadow-2xl w-full">
      <div className="hidden md:grid">
        <img src={SWMimages.payment_bg} alt="" />
      </div>
      <div className="font-['YsabeauInfant']">
        <h4 className="text-[30px] font-bold">Checkout</h4>
        <small className="text-[18px] font-bold">Payment Information</small>
        <form onSubmit={formik.handleSubmit} className="space-y-2">
          <div>
            <FormInput
              size="md"
              type="text"
              id="cardName"
              name="cardName"
              value={formik.values.cardName}
              touched={formik.touched.cardName}
              onChange={formik.handleChange}
              errors={formik.errors.cardName}
              className="w-full"
              label="Cardholder Name"
            />
          </div>
          <div>
            <FormInput
              size="md"
              type="number"
              id="cardNumber"
              name="cardNumber"
              value={formik.values.cardNumber}
              touched={formik.touched.cardNumber}
              onChange={formik.handleChange}
              errors={formik.errors.cardNumber}
              className="w-full"
              label="Cardholder Number"
            />
          </div>
          <div>
            <FormSelect
              size="md"
              options={cardOption}
              id="cardType"
              name="cardType"
              value={formik.values.cardType}
              touched={formik.touched.cardType}
              onChange={formik.handleChange}
              errors={formik.errors.cardType}
              className="w-full "
              label="Card Type"
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <AppDatePicker
                size="md"
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formik?.values?.expiryDate}
                touched={formik.touched.expiryDate}
                // onChange={formik.handleChange}
                onChange={(date) => {
                  setExpD(date);
                  formik.setFieldValue(
                    "expiryDate",
                    moment(date).format("YYYY-MM-DD")
                  );
                }}
                errors={formik.errors.expiryDate}
                className="w-full"
                label="Expiry"
              />
            </div>
            <div>
              <FormInput
                size="md"
                type="number"
                id="cvv"
                name="cvv"
                value={formik.values.cvv}
                touched={formik.touched.cvv}
                onChange={formik.handleChange}
                errors={formik.errors.cvv}
                className="w-full"
                label="CVV"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              variant="full"
              size="lg"
              className="text-[12px] w-full"
            >
              {isLoading ? <Loader /> : "Checkout"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutView;
