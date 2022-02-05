import * as userTypes from "./UserTypes";

const initialUserState = {
  loader: false,
  user: null,
  error: "",
};

const userReducer = (prevState = initialUserState, action) => {
  switch (action.type) {
    case userTypes.FETCH_USER_REQUEST: {
      return {
        loader: true,
        user: null,
        error: "",
      };
    }
    case userTypes.FETCH_USER_SUCCESS: {
      return {
        loader: false,
        user: action.payload,
        error: "",
      };
    }
    case userTypes.FETCH_USER_FAILURE: {
      return { loader: false, user: null, error: action.payload };
    }
    default:
      return prevState;
  }
};

export default userReducer;
