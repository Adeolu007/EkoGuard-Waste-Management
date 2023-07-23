import { Button, FormInput, Navbar } from "../../../components";
import * as yup from "yup";
import { useFormik } from "formik";
import { LOGIN } from "../../../routes/CONSTANTS";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const Navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email()
        .required("Please enter a valid email address."),
    }),
    onSubmit: (details) => {
      console.log(details);
      Navigate(LOGIN);
    },
  });

  return (
    <div>
      <Navbar />
      <div className="min-h-[85vh] flex flex-col justify-center max-w-[700px] m-auto">
        <h4 className="text-center font-['Spectral'] text-[#004B9D] text-[32px] font-semibold mb-3">
          Let Us Help You Reset Your Password
        </h4>
        <p className="text-center font-['Lato'] text-[#666666] text-[13px] mb-10">
          Please provide the email linked with your account. We will sent you a
          password reset link
        </p>
        <form onSubmit={formik.handleSubmit}>
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
          <div className="flex items-center justify-center pt-[44px]">
            <Button variant="full" size="lg" className="text-[12px] h-[52px]">
              Email Reset Link
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
