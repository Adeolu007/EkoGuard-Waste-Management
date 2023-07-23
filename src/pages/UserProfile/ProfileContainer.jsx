import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import ProfileView from "./ProfileView";
import { Landing } from "../../components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserByEmail,
  updateUserDetails,
  verifyEmail,
} from "../../redux/slices/user.slice";
import { SWM_USER_EMAIL } from "../../services/CONSTANTS";
import { changePassword } from "../../redux/slices/auth.slice";

export const ProfileContainer = () => {
  const { user, loading, error } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isCpLoading, setIsCpLoading] = useState(false);
  const userEmail = JSON.parse(localStorage.getItem(SWM_USER_EMAIL));
  const dispatch = useDispatch();

  const passWordFormik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[/.,;\[\]\-{}=+%%$]).{8,}$/,
          "Weak Password. Password must have at least: 1 uppercase, 1 digit, 1 special character. Minimum length: 8"
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: (details, { resetForm }) => {
      setIsCpLoading(true);
      console.log(details, "CP", user?.email);
      setTimeout(() => {
        toast.success("Password Changed Successfully");
        resetForm();
        setIsCpLoading(false);
      }, 3000);
      // void dispatch(
      //   changePassword({
      //     email: user?.email,
      //     password: details?.password,
      //   })
      // )
      //   .unwrap()
      //   .then((res) => {
      //     console.log(res);
      //     if (res?.statusCodeValue === 400) {
      //       toast.error(res.body);
      //       setIsCpLoading(false);
      //       return;
      //     }
      //     if (res) {
      //       toast.success("Profile Updated Successfully");
      //       dispatch(getUserByEmail(userEmail));
      //       setIsCpLoading(false);
      //     }
      //     setIsCpLoading(false);
      //   })
      //   .catch((error) => {
      //     toast.error(error.message);
      //     setIsCpLoading(false);
      //     console.log(error);
      //   });
    },
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      otherName: "",
      gender: "",
      address: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      otherName: Yup.string().required("Other Name is required"),
      gender: Yup.string().required("Gender is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: (details, { resetForm }) => {
      setIsLoading(true);
      void dispatch(
        updateUserDetails({
          email: details.email,
          firstName: details.firstName,
          lastName: details.lastName,
          otherName: details.otherName,
          gender: details.gender,
          address: details.address,
          id: user?.id,
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
            toast.success("Profile Updated Successfully");
            dispatch(getUserByEmail(userEmail));
            setIsLoading(false);
          }
        })
        .catch((error) => {
          toast.error(error.message);
          console.log(error);
        });
    },
  });

  const genderOption = [
    {
      value: "",
      title: "Choose your gender",
    },
    {
      value: "male",
      title: "Male",
    },
    {
      value: "female",
      title: "Female",
    },
    {
      value: "other",
      title: "Other",
    },
  ];

  const UpdateEmploymentStatus = useCallback(() => {
    formik.resetForm({
      values: {
        email: user?.email || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        otherName: user?.otherName || "",
        gender: user?.gender || "",
        address: user?.address || "",
      },
    });
  }, [user]);

  useEffect(() => {
    UpdateEmploymentStatus();
  }, [UpdateEmploymentStatus]);

  const handleVerifyEmail = () => {
    void dispatch(verifyEmail(user?.id))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.statusCodeValue === 400) {
          toast.error(res.body);
          setIsLoading(false);
          return;
        }
        if (res) {
          toast.success("A link is sent to your mail for verification");
          dispatch(getUserByEmail(userEmail));
          setIsLoading(false);
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <Landing>
      <ProfileView
        formik={formik}
        isLoading={isLoading}
        genderOption={genderOption}
        user={user}
        handleVerifyEmail={handleVerifyEmail}
        passWordFormik={passWordFormik}
        isCpLoading={isCpLoading}
      />
    </Landing>
  );
};
