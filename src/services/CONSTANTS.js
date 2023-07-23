// Auth routes
export const REGISTER = "auth/signup";
export const LOGIN = "auth/login";
export const LOG_OUT = "auth/logout";

export const FORGOT_PASSWORD = "Authentication/forgot-password";
export const CHANGE_PASSWORD = "profile/changePassword";

export const WASTE_DISPOSAL = "schedule/waste/pickUp";
export const WASTE_RECYCLING = "schedule/recycle/pickUp";
export const ALL_WASTE_SCHEDULE = "schedule/getAllSchedulesForAUser";

export const GET_USER = "profile/userdetails";
export const UPDATE_USER = "profile/updated";
export const VERIFY_EMAIL = "email/send";

export const SWM_USER_DATA = "SWM_USER_DATA";
export const SWM_USER_EMAIL = "SWM_USER_EMAIL";

// Request Status
export const RESPONSE_SUCCESS = "SUCCESS";
export const RESPONSE_ERROR = "FAILURE";
