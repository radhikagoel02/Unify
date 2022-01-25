import {
  LOGIN_USER_FINISH,
  API_CALL_FAIL,
  START_API_CALL,
  UPDATE_USER_MODE,
  UPDATE_USER_DATA_FINISH,
  UPDATE_USER_STATUS_FINISH,
  UPDATE_PASSWORD_FINISH,
  LOGOUT,
} from "./constants";

const INITIAL_STATE = {
  error: null,
  isProcessing: false,
  isLoggedIn: false,
  token: "",
  userData: {},
  userMode: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_API_CALL:
      return { ...state, isProcessing: true, error: null };
    case API_CALL_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isProcessing: false,
        error: action.payload,
      };
    case LOGIN_USER_FINISH:
      return {
        ...state,
        isProcessing: false,
        token: action.payload.token,
        isLoggedIn: true,
        userData: {
          ...action.payload.user,
        },
        userMode: action.payload.user.role,
        error: "",
      };
    case UPDATE_USER_MODE:
      return {
        ...state,
        userMode: action.payload,
        error: "",
      };
    case UPDATE_USER_DATA_FINISH:
      return {
        ...state,
        isProcessing: false,
        userData: {
          ...action.payload.user,
        },
        error: "",
      };
    case UPDATE_USER_STATUS_FINISH:
      return {
        ...state,
        isProcessing: false,
        userData: { ...state.userData, status: "confirmed" },
        error: "",
      };
    case UPDATE_PASSWORD_FINISH:
      return { ...state, isProcessing: false, error: null };
    case LOGOUT:
      return { ...state, isLoggedIn: false, error: null };
    default:
      return state;
  }
};
