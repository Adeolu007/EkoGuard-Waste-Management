import { Routes, Route } from "react-router-dom";

import {
  ErrorPage,
  Home,
  Services,
  ContactUs,
  Login,
  Signup,
  AccoutSuccessfullyCreated,
  Profile,
  WasteDisposal,
  WasteRecycling,
  ScheduleHistory,
  ForgotPassword,
  Checkout,
} from "../pages";
import {
  HOME,
  SERVICES,
  PROFILE,
  LOGIN,
  SIGNUP,
  SIGNUP_SUCCESS,
  WASTE_DISPOSAL,
  WASTE_RECYCLING,
  SCHEDULE_HISTORY,
  FORGOT_PASSWORD,
  CONTACT_US,
  RESET_PASSWORD,
  CHECK_OUT,
} from "./CONSTANTS";

import AuthGaurd from "../authGaurd";

const RouterConfig = () => {
  return (
    <AuthGaurd>
      <Routes>
        {/* Public routes should be placed in here */}
        <Route path={HOME} element={<Home />} />
        <Route path={SERVICES} element={<Services />} />
        <Route path={CONTACT_US} element={<ContactUs />} />
        <Route path={WASTE_DISPOSAL} element={<WasteDisposal />} />
        <Route path={WASTE_RECYCLING} element={<WasteRecycling />} />
        <Route path={SCHEDULE_HISTORY} element={<ScheduleHistory />} />
        <Route path={CHECK_OUT} element={<Checkout />} />
        <Route path={PROFILE} element={<Profile />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={SIGNUP} element={<Signup />} />
        <Route path={SIGNUP_SUCCESS} element={<AccoutSuccessfullyCreated />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AuthGaurd>
  );
};

export default RouterConfig;
