import * as userTypes from "./UserTypes";
import axios from "../../axiosInstance";

export const fetchUserRequest = () => {
  return {
    type: userTypes.FETCH_USER_REQUEST,
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: userTypes.FETCH_USER_SUCCESS,
    payload: user,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: userTypes.FETCH_USER_FAILURE,
    payload: error,
  };
};

export const loginUser = (url, userLoginData) => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());
    try {
      let loginData = await axios.post(url, userLoginData);
      loginData=loginData.data;
      console.log(loginData);
      if (loginData.error) {
        dispatch(fetchUserFailure(loginData.error));
      } else {
        localStorage.setItem("token",loginData.token);
        const user=loginData.user;
        dispatch(fetchUserSuccess(user));
      }
    } catch (error) {
      dispatch(fetchUserFailure(error));
    }
  };
};
