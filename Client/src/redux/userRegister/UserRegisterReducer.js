import * as userRegisterTypes from "./UserRegisterTypes";

const initialUserRegisterState = {
  loader: false,
  registered: false,
  error: "",
};

const userRegisterReducer = (prevState = initialUserRegisterState, action) => {
  switch (action.type) {
    case userRegisterTypes.FETCH_USER_REGISTER_REQUEST: {
      return {
        loader: true,
        registered: false,
        error: "",
      };
    }
    case userRegisterTypes.FETCH_USER_REGISTER_SUCCESS: {
      return {
        loader: false,
        registered: action.payload,
        error: "",
      };
    }
    case userRegisterTypes.FETCH_USER_REGISTER_FAILURE: {
      return { loader: false, registered: false, error: action.payload };
    }
    default:
      return prevState;
  }
};

export default userRegisterReducer;
