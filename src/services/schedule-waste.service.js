import axios from "axios";

import env from "../configs";

import {
  ALL_WASTE_SCHEDULE,
  SWM_USER_DATA,
  WASTE_DISPOSAL,
  WASTE_RECYCLING,
} from "./CONSTANTS";

const userToken = JSON.parse(localStorage.getItem(SWM_USER_DATA));

export const ScheduleWasteDisposal = async ({
  binRequestDto,
  scheduleDto,
  refLocationId,
  userId,
}) => {
  return await axios
    .post(
      `${env.API_BASE_URL}/${WASTE_DISPOSAL}/${userId}`,
      {
        binRequestDto,
        refLocationId,
        scheduleDto,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
    .then((res) => {
      return res;
    });
};

export const ScheduleWasteRecycling = async ({
  pickupAddress,
  pickUpDate,
  bin,
  bag,
  quantityOfBagsOrBins,
  requestStatus,
  binQuantity,
  refLocationId,
  userId,
  categoryId,
}) => {
  return await axios
    .post(
      `${env.API_BASE_URL}/${WASTE_RECYCLING}/${userId}/${categoryId}`,
      {
        pickupAddress,
        pickUpDate,
        bin,
        bag,
        quantityOfBagsOrBins,
        binQuantity,
        refLocationId,
        requestStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
    .then((res) => {
      return res;
    });
};

export const GetAllUserSchedule = async (userId) => {
  const response = await axios.get(
    `${env.API_BASE_URL}/${ALL_WASTE_SCHEDULE}/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
  return response.data;
};
