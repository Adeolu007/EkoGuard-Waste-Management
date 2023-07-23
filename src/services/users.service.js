import axios from "axios";
import { env } from "../configs/environment.config";
import {
  GET_USER,
  SWM_USER_DATA,
  UPDATE_USER,
  VERIFY_EMAIL,
} from "./CONSTANTS";

const userToken = JSON.parse(localStorage.getItem(SWM_USER_DATA));

console.log(userToken, "email");

export const GetUserByEmail = async (email) => {
  try {
    const response = await axios.get(
      `${env.API_BASE_URL}/${GET_USER}/${email}`
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const UpdateUserDetails = async ({
  firstName,
  lastName,
  otherName,
  email,
  phoneNumber,
  gender,
  address,
  id,
}) => {
  try {
    const response = await axios.put(
      `${env.API_BASE_URL}/${UPDATE_USER}/${id}`,
      {
        firstName,
        lastName,
        otherName,
        email,
        phoneNumber,
        gender,
        address,
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const VerifyEmail = async (userId) => {
  try {
    const response = await axios.post(
      `${env.API_BASE_URL}/${VERIFY_EMAIL}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};
