import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth.slice";
import user from "./user.slice";
import recycleServices from "./recycle-services.slice";
import waste_services from "./waste-services";
import user_schedules from "./userSchedule.slice";
import userEmail from "./userEmail.slice";

const rootReducer = combineReducers({
  auth,
  user,
  userEmail,
  recycleServices,
  waste_services,
  user_schedules,
});

export default rootReducer;
