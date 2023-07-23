import React from "react";
import { useRef } from "react";
import { Icon } from "react-icons-kit";
import { arrows_exclamation } from "react-icons-kit/linea/arrows_exclamation";
import { arrows_circle_check } from "react-icons-kit/linea/arrows_circle_check";
import { Button, FormInput, FormSelect, Loader } from "../../components";

const ProfileView = ({
  formik,
  isLoading,
  genderOption,
  user,
  handleVerifyEmail,
  passWordFormik,
  isCpLoading,
}) => {
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
    <div className="w-full m-auto max-w-[1000px] px-4">
      <h1 className="font-['YsabeauInfant'] text-center text-[35px] font-bold mb-[1rem] mt-3">
        About You
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-8">
        <div>
          <FormInput
            size="lg"
            type="text"
            id="email"
            name="email"
            value={formik.values.email}
            touched={formik.touched.email}
            onChange={formik.handleChange}
            errors={formik.errors.email}
            className="w-full"
            handleVerifyEmail={handleVerifyEmail}
            label="Email"
            required={
              user && !user?.emailVerificationStatus
                ? `Email is not verified`
                : ""
            }
            optional={user?.emailVerificationStatus ? "Email is verified" : ""}
            disabled={user?.emailVerificationStatus}
          />
        </div>
        <div>
          <FormInput
            size="lg"
            type="text"
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            touched={formik.touched.firstName}
            onChange={formik.handleChange}
            errors={formik.errors.firstName}
            className="w-full"
            label="First Name"
          />
        </div>
        <div>
          <FormInput
            size="lg"
            type="text"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            touched={formik.touched.lastName}
            onChange={formik.handleChange}
            errors={formik.errors.lastName}
            className="w-full"
            label="Last Name"
          />
        </div>
        <div>
          <FormInput
            size="lg"
            type="text"
            id="otherName"
            name="otherName"
            value={formik.values.otherName}
            touched={formik.touched.otherName}
            onChange={formik.handleChange}
            errors={formik.errors.otherName}
            className="w-full"
            label="Other Name"
          />
        </div>

        <div>
          <FormSelect
            size="lg"
            type="text"
            options={genderOption}
            id="gender"
            name="gender"
            placeholder="Select Gender"
            value={formik.values.gender}
            touched={formik.touched.gender}
            onChange={formik.handleChange}
            errors={formik.errors.gender}
            className="w-full "
            label="Gender"
          />
        </div>
        <div>
          <FormInput
            size="lg"
            type="text"
            id="address"
            name="address"
            value={formik.values.address}
            touched={formik.touched.address}
            onChange={formik.handleChange}
            errors={formik.errors.address}
            className="w-full"
            label="Address"
          />
        </div>
        <div className="flex items-center justify-center py-10">
          <Button
            type="submit"
            variant="full"
            size="lg"
            className="text-[12px]"
            disabled={isLoading || isCpLoading}
          >
            {isLoading ? <Loader /> : "Update"}
          </Button>
        </div>
      </form>
      <hr />
      <div>
        <h1 className="text-center text-[35px] font-bold mb-[1rem] mt-3">
          Change your password
        </h1>
        <form onSubmit={passWordFormik.handleSubmit}>
          <div>
            <FormInput
              size="lg"
              type="password"
              id="password"
              name="password"
              value={passWordFormik.values.password}
              // placeholder="Enter email address"
              onChange={passWordFormik.handleChange}
              errors={passWordFormik.errors.password}
              touched={passWordFormik.touched.password}
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
                    passWordFormik.values.password
                  )}`}
                  style={{
                    width: `${
                      ((progressBarWidth.current ||
                        passWordFormik.values.password?.length) /
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
                <div
                  className={lengthValidated ? "validated" : "not-validated"}
                >
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
                      <Icon
                        icon={arrows_circle_check}
                        className="text-[#0f0]"
                      />
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
                <div
                  className={numberValidated ? "validated" : "not-validated"}
                >
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
                <div
                  className={specialValidated ? "validated" : "not-validated"}
                >
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
              value={passWordFormik.values.confirmPassword}
              // placeholder="Enter email address"
              onChange={passWordFormik.handleChange}
              errors={passWordFormik.errors.confirmPassword}
              touched={passWordFormik.touched.confirmPassword}
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
              disabled={isCpLoading || isLoading}
            >
              {isCpLoading ? <Loader /> : "Change Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileView;
