import * as Yup from "yup";
import { useFormik } from "formik";
import { Auth } from "../../../components";
import LoginView from "./LoginView";
import { useNavigate } from "react-router-dom";
import { SERVICES } from "../../../routes/CONSTANTS";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/slices/auth.slice";
import { useQuery } from "../../../hooks";
import { getUserByEmail } from "../../../redux/slices/user.slice";
import { SWM_USER_EMAIL } from "../../../services/CONSTANTS";
import LoginOptionComp from "./LoginOptionComp";

import "./styles.css";
import { getAllUserSchedule } from "../../../redux/slices/userSchedule.slice";
import { SWMimages } from "../../../assets";

export const LoginContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedLoginOption, setSelectedLoginOption] = useState("");
  const { user, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = useQuery();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema:
      selectedLoginOption === "email"
        ? Yup.object().shape({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string()
              .required("Password is required")
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[/.,;\[\]\-{}=+%%$]).{8,}$/,
                "Weak Password. Password must have at least: 1 uppercase, 1 digit, 1 special character. Minimum length: 8"
              ),
          })
        : Yup.object().shape({
            phone: Yup.string()
              .required("Phone number is required")
              .matches(/^\+?(?:\d){10,14}$/, "Invalid phone number"),
            password: Yup.string()
              .required("Password is required")
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[/.,;\[\]\-{}=+%%$]).{8,}$/,
                "Weak Password. Password must have at least: 1 uppercase, 1 digit, 1 special character. Minimum length: 8"
              ),
          }),
    onSubmit: (details) => {
      setIsLoading(true);
      void dispatch(
        login({
          email: details?.email,
          phoneNumber: details?.phone,
          password: details?.password,
        })
      )
        .unwrap()
        .then((resp) => {
          console.log(resp);
          const email = JSON.parse(resp?.config?.data)?.email;
          const phone = JSON.parse(resp?.config?.data)?.phoneNumber;
          const redirect = query.get("redirect");
          if (redirect) {
            //  redirect to absolute URL - possibly initiated from VC app
            if (redirect.startsWith("http")) {
              return window.location.replace(redirect);
            }
            navigate(`../${redirect}`, { replace: true });
          } else if (resp?.status === 200 || resp?.status === 201) {
            toast.success("login successfully, navigating to services");
            dispatch(getUserByEmail(email || phone));
            localStorage.setItem(
              SWM_USER_EMAIL,
              JSON.stringify(email || phone)
            );
            // dispatch(getAllUserSchedule(user?.id));
            navigate(SERVICES);
            setIsLoading(false);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    },
  });

  const handlePhoneInputChange = (value) => {
    setPhoneNumber(value);
    formik.setFieldValue("phone", value);
  };

  return (
    <Auth message="Welcome Back">
      {selectedLoginOption ? (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:opacity-100 xl:opacity-100 lg:grid place-items-center">
            <img
              className="object-contain max-w-[30rem]"
              src={SWMimages.auth_bg}
              alt=""
            />
          </div>
          <LoginView
            formik={formik}
            isLoading={isLoading}
            handlePhoneInputChange={handlePhoneInputChange}
            selectedLoginOption={selectedLoginOption}
            setSelectedLoginOption={setSelectedLoginOption}
          />
        </div>
      ) : (
        <LoginOptionComp setSelectedLoginOption={setSelectedLoginOption} />
      )}
    </Auth>
  );
};
