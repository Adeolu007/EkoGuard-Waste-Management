import { Link } from "react-router-dom";

import { LOGIN } from "../../../routes/CONSTANTS";
import { Button, FormInput, Loader } from "../../../components";
import { useRef } from "react";
import { Icon } from "react-icons-kit";
import { arrows_exclamation } from "react-icons-kit/linea/arrows_exclamation";
import { arrows_circle_check } from "react-icons-kit/linea/arrows_circle_check";

const SignupView = ({ isLoading, formik, handlePhoneInputChange }) => {
  const lowerValidated = useRef(false);
  const lengthValidated = useRef(false);
  const upperValidated = useRef(false);
  const specialValidated = useRef(false);
  const numberValidated = useRef(false);
  const progressBarWidth = useRef(null);

  function getPasswordStrength(password) {
    let score = 0;
    if (!password) {
      lengthValidated.current = false;
      upperValidated.current = false;
      numberValidated.current = false;
      specialValidated.current = false;
      lowerValidated.current = false;
      return "";
    }
    if (password?.length < 8) {
      lengthValidated.current = false;
      return "bg-red-500";
    } else {
      lengthValidated.current = true;
    }
    if (/[a-z]/.test(password)) {
      lowerValidated.current = true;
      score++;
    } else {
      lowerValidated.current = false;
    }
    if (/[A-Z]/.test(password)) {
      upperValidated.current = true;
      score++;
    } else {
      upperValidated.current = false;
    }
    if (/\d/.test(password)) {
      numberValidated.current = true;
      score++;
    } else {
      numberValidated.current = false;
    }
    if (/[\W_]/.test(password)) {
      specialValidated.current = true;
      score++;
    } else {
      specialValidated.current = false;
    }
    // if (password?.length > 12) {
    //   score++;
    // }
    if (score < 3) {
      return "bg-yellow-500";
    }
    if (score < 5) {
      if (password.length > 20) {
        progressBarWidth.current = 20;
        return "bg-green-500";
      } else {
        return "bg-green-500";
      }
    }
    return "bg-blue-500";
  }

  return (
    <div className="w-full m-auto max-w-[1000px]">
      <form onSubmit={formik.handleSubmit} className="space-y-8">
        <div>
          <FormInput
            size="lg"
            type="text"
            id="email"
            name="email"
            value={formik.values.email}
            // placeholder="Enter email address"
            onChange={formik.handleChange}
            errors={formik.errors.email}
            touched={formik.touched.email}
            className="w-full"
            label="Email"
          />
        </div>
        <div>
          <FormInput
            size="lg"
            type="tel"
            id="phone"
            name="phone"
            value={formik.values.phone}
            // placeholder="Enter phone address"
            onChange={handlePhoneInputChange}
            errors={formik.errors.phone}
            touched={formik.touched.phone}
            // className="w-full"
            label="Phone"
          />
        </div>
        <div>
          <FormInput
            size="lg"
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            // placeholder="Enter email address"
            onChange={formik.handleChange}
            errors={formik.errors.password}
            touched={formik.touched.password}
            className="w-full"
            label="Password"
          />
        </div>
        <div className="px-6">
          <div className="flex items-center mb-1 space-x-6">
            <p
              htmlFor="passwordStrength"
              className=" block text-gray-700 font-semibold mb-2 text-[10px]"
            >
              Password Strength:
            </p>
            <div className="relative w-[15rem] h-2 bg-gray-300 rounded-full">
              <div
                className={`absolute top-0 left-0 h-2 rounded-full ${getPasswordStrength(
                  formik.values.password
                )}`}
                style={{
                  width: `${
                    ((progressBarWidth.current ||
                      formik.values.password?.length) /
                      20) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <div className="progress-bg">
            {/* validation tracker */}
            <main className="text-[12px] font-['Lato'] space-y-2">
              <div className={lengthValidated ? "validated" : "not-validated"}>
                {lengthValidated.current ? (
                  <span className="mr-[8px] text-[#0f0]">
                    <Icon icon={arrows_circle_check} />
                  </span>
                ) : (
                  <span className="mr-[8px]">
                    <Icon icon={arrows_exclamation} />
                  </span>
                )}
                contains at least 8 characters
              </div>
              <div className={lowerValidated ? "validated" : "not-validated"}>
                {lowerValidated.current ? (
                  <span className="mr-[14px]">
                    <Icon icon={arrows_circle_check} className="text-[#0f0]" />
                  </span>
                ) : (
                  <span className="mr-[14px]">
                    <Icon icon={arrows_exclamation} />
                  </span>
                )}
                contains at least one lowercase letter
              </div>
              <div className={upperValidated ? "validated" : "not-validated"}>
                {upperValidated.current ? (
                  <span className="mr-[14px] text-[#0f0]">
                    <Icon icon={arrows_circle_check} />
                  </span>
                ) : (
                  <span className="mr-[14px]">
                    <Icon icon={arrows_exclamation} />
                  </span>
                )}
                contains at least one uppercase
              </div>
              <div className={numberValidated ? "validated" : "not-validated"}>
                {numberValidated.current ? (
                  <span className="mr-[8px] text-[#0f0]">
                    <Icon icon={arrows_circle_check} />
                  </span>
                ) : (
                  <span className="mr-[8px]">
                    <Icon icon={arrows_exclamation} />
                  </span>
                )}
                contains at least one number
              </div>
              <div className={specialValidated ? "validated" : "not-validated"}>
                {specialValidated.current ? (
                  <span className="mr-[14px] text-[#0f0]">
                    <Icon icon={arrows_circle_check} />
                  </span>
                ) : (
                  <span className="mr-[14px]">
                    <Icon icon={arrows_exclamation} />
                  </span>
                )}
                {`contains at least one special character (/.,;[}-{=+%%$`}
              </div>
            </main>
          </div>
        </div>
        <div>
          <FormInput
            size="lg"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            // placeholder="Enter email address"
            onChange={formik.handleChange}
            errors={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
            className="w-full"
            label="Repeat Password"
          />
        </div>
        <div className="flex items-center justify-center py-10">
          <Button
            type="submit"
            variant="full"
            size="lg"
            className="text-[12px]"
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "Sign up"}
          </Button>
        </div>
      </form>
      <p className="font-['Montserrat'] text-[14px] text-[#666666] text-center font-bold">
        Already have an account?{" "}
        <Link to={LOGIN}>
          <span className="text-secondary">Log In</span>
        </Link>
      </p>
    </div>
  );
};

export default SignupView;
