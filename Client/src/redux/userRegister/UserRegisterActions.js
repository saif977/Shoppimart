import * as userRegisterTypes from "./UserRegisterTypes";
import axios from "../../axiosInstance";

export const fetchUserRegisterRequest = () => {
  return {
    type: userRegisterTypes.FETCH_USER_REGISTER_REQUEST,
  };
};

export const fetchUserRegisterSuccess = (registered) => {
  return {
    type: userRegisterTypes.FETCH_USER_REGISTER_SUCCESS,
    payload: registered,
  };
};

export const fetchUserRegisterFailure = (error) => {
  return {
    type: userRegisterTypes.FETCH_USER_REGISTER_FAILURE,
    payload: error,
  };
};

export const registerUser = (url, userRegisterData) => {
  return async (dispatch) => {
    dispatch(fetchUserRegisterRequest());
    try {
      let registerData = await axios.post(url, userRegisterData);
      registerData=registerData.data;
      console.log(registerData);
      if (registerData.error) {
        dispatch(fetchUserRegisterFailure(registerData.error));
      } else {
        const registered=registerData.registered;
        dispatch(fetchUserRegisterSuccess(registered));
      }
    } catch (error) {
      dispatch(fetchUserRegisterFailure(error));
    }
  };
};
