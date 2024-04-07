import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  REGISTER_FAIL,
} from "../constants/productConstant";
import {
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER,
  USER_DETAILS,
} from "../constants/userConstant";

const initialData = {
  userList: [],
};

const userReducer = (state = initialData, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        userList: [action.payload],
      };
    case LOGIN_REQUEST:
      return {
        loading: true,
        fail: false,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        userList: [action.payload],
        loading: false,
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        loading: false,
        fail: true,
        message: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...state,
        userList: [],
      };
    case LOGIN_FAIL:
      return {
        userList: [action.payload],
      };
    case USER_DETAILS:
      return {
        ...state,
        userList: action.payload,
      };
    default:
      return state;
  }
};

// export { loginUser };
export default userReducer;
