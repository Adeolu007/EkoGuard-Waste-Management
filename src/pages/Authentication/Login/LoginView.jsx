import { Link } from "react-router-dom";

import { SIGNUP, FORGOT_PASSWORD } from "../../../routes/CONSTANTS";
import { Button, FormInput, Loader } from "../../../components";

const LoginView = ({
  isLoading,
  formik,
  handlePhoneInputChange,
  selectedLoginOption,
  setSelectedLoginOption,
}) => {
  return (
    <div className="w-full m-auto max-w-[1000px]">
      <div className="dropInField">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {selectedLoginOption === "email" && (
            <div>
              <FormInput
                size="lg"
                type="text"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                errors={formik.errors.email}
                touched={formik.touched.email}
                className="w-full"
                label="Email"
              />
            </div>
          )}
          {selectedLoginOption === "phone" && (
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
          )}
          <div>
            <FormInput
              size="lg"
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              errors={formik.errors.password}
              touched={formik.touched.password}
              className="w-full"
              label="Enter Password"
            />
          </div>
          <div className="flex items-center justify-center pt-2 pb-5">
            <Button
              type="submit"
              variant="full"
              size="lg"
              className="text-[12px]"
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : "Log In"}
            </Button>
          </div>
        </form>
        <p className="font-['Montserrat'] text-[14px] text-[#666666] text-center font-bold mb-3">
          Don't have an account?{" "}
          <Link to={SIGNUP}>
            <span className="text-secondary">Sign Up</span>
          </Link>
        </p>
        <p className="font-['Montserrat'] text-[14px] text-[#666666] text-center font-bold mb-3">
          Want to change log in option?{" "}
          <span
            onClick={() => setSelectedLoginOption("")}
            className="text-secondary cursor-pointer"
          >
            Click here
          </span>
        </p>
        <p className="font-['Montserrat'] text-[14px] text-secondary text-center font-bold">
          <Link to={FORGOT_PASSWORD}>
            <span>Forgot Password?</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginView;
