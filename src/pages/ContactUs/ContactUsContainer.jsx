import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { Landing } from "../../components";
import ContactUsView from "./ContactUsView";

export const ContactUsContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      subject: "",
      description: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^\+?(?:\d){10,13}$/, "Invalid phone number"),
      subject: Yup.string().required("Subject is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (details, { resetForm }) => {
      console.log(details);
      setIsLoading(true);

      setTimeout(() => {
        resetForm({ details: "" });
        setIsLoading(false);
        setOpenModal(true);
      }, 5000);
    },
  });

  const handlePhoneInputChange = (value) => {
    setPhoneNumber(value);
    formik.setFieldValue("phone", value);
  };
  return (
    <Landing>
      <ContactUsView
        formik={formik}
        isLoading={isLoading}
        openModal={openModal}
        setOpenModal={setOpenModal}
        handlePhoneInputChange={handlePhoneInputChange}
      />
    </Landing>
  );
};
