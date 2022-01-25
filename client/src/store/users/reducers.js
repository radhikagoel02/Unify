import {
  API_CALL_FAIL,
  START_API_CALL,
  FETCH_USERS_FINISH,
  UPDATE_ACTIVATION_USER_FINISH,
  UPDATE_USER_FINISH,
  ADD_NEW_USER_FINISH,
} from "./constants";

const INITIAL_STATE = {
  data: [],
  error: null,
  isProcessing: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_API_CALL:
      return { ...state, isProcessing: true, error: null };
    case API_CALL_FAIL:
      return { ...state, error: action.payload };
    case FETCH_USERS_FINISH:
      return { ...state, data: action.payload, isProcessing: false, error: "" };
    case UPDATE_ACTIVATION_USER_FINISH:
      const updatedUsers = state.data.map((user) => {
        if (user.id === action.payload.id) {
          user.isDeleted = action.payload.toDelete;
        }
        return user;
      });
      return { ...state, data: updatedUsers, isProcessing: false, error: "" };
    case UPDATE_USER_FINISH:
      updatedUsers = state.data.map((user) => {
        if (user.id === action.payload.id) return action.payload;
        return { ...state, isProcessing: false, data: { ...updatedUsers } };
      });
      return { ...state, data: updatedUsers, isProcessing: false, error: "" };
    case ADD_NEW_USER_FINISH:
      let newUser = { ...action.payload };
      return {
        ...state,
        isProcessing: false,
        error: "",
        data: { ...state.data, newUser },
      };
    default:
      return state;
  }
};
