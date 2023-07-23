import { SWM_USER_DATA } from "./CONSTANTS";

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem(SWM_USER_DATA));
  if (user) {
    return { Authorization: "Bearer " + user };
  } else {
    return {};
  }
}
