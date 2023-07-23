// eslint-disable-next-line no-restricted-imports
import axios from "axios";

import env from "../configs";
import {
  CHANGE_PASSWORD,
  FORGOT_PASSWORD,
  LOGIN,
  LOG_OUT,
  REGISTER,
  SWM_USER_DATA,
} from "./CONSTANTS";

const userToken = JSON.parse(localStorage.getItem(SWM_USER_DATA));

export const Signin = async ({ phoneNumber, password, email }) => {
  const loginData = phoneNumber
    ? { phoneNumber, password }
    : { email, password };
  return await axios
    .post(`${env.API_BASE_URL}/${LOGIN}`, loginData)
    .then((res) => {
      const data = res.data;
      if (data) {
        localStorage.setItem(SWM_USER_DATA, JSON.stringify(data?.token));
      }
      return res;
    });
};

export const Register = async (details) => {
  try {
    const response = await axios.post(
      `${env.API_BASE_URL}/${REGISTER}`,
      details
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const Logout = async () => {
  return await axios.get(`${env.API_BASE_URL}/${LOG_OUT}`).finally(() => {
    localStorage.removeItem(SWM_USER_DATA);
  });
};

export const ForgotPassword = async (details) => {
  const response = await axios.post(
    `${env.API_BASE_URL}/${FORGOT_PASSWORD}`,
    details
  );
  return response.data;
};

export const ChangePassword = async ({ email, password }) => {
  const response = await axios.get(`${env.API_BASE_URL}/${CHANGE_PASSWORD}`, {
    email,
    password,
  });
  return response.data;
};
