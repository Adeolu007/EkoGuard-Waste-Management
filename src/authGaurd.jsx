import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CONTACT_US,
  FORGOT_PASSWORD,
  HOME,
  LOGIN,
  SERVICES,
  SIGNUP,
  SIGNUP_SUCCESS,
} from "./routes/CONSTANTS";
import { SWM_USER_DATA, SWM_USER_EMAIL } from "./services/CONSTANTS";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail } from "./redux/slices/user.slice";
import { getAllUserSchedule } from "./redux/slices/userSchedule.slice";

const AuthGaurd = ({ children }) => {
  const dispatch = useDispatch();
  const userToken = JSON.parse(localStorage.getItem(SWM_USER_DATA));
  const userEmail = JSON.parse(localStorage.getItem(SWM_USER_EMAIL));
  const { user, loading, error } = useSelector((state) => state.user);

  console.log(user, "user Afa na");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const shouldGetProfile = ![
    LOGIN,
    SIGNUP,
    FORGOT_PASSWORD,
    HOME,
    SERVICES,
    SIGNUP_SUCCESS,
    CONTACT_US,
  ].includes(pathname);
  const handleError = useCallback(() => {
    navigate(LOGIN);
    // To clear the current profile and its associated Redux store.
    window.location.reload();
  }, [navigate]);

  useEffect(() => {
    if (!localStorage?.SWM_USER_DATA && shouldGetProfile) {
      handleError();
    }
  }, [localStorage?.SWM_USER_DATA, shouldGetProfile, pathname]);

  useEffect(() => {
    if (localStorage?.SWM_USER_DATA && shouldGetProfile) {
      if (userToken) {
        dispatch(getUserByEmail(userEmail));
        dispatch(getAllUserSchedule(user?.id));
      }
    }
  }, [localStorage?.SWM_USER_DATA, shouldGetProfile]);

  return children;
};

export default AuthGaurd;
