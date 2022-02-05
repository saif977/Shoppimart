import { combineReducers } from "redux";
import userReducer from "./user/UserReducer";
import userRegisterReducer from "./userRegister/UserRegisterReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  userRegisterState:userRegisterReducer,

});

export default rootReducer;
