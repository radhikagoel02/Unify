import {
  API_CALL_FAIL,
  START_API_CALL,
  FETCH_COMMUNITIES_FINISH,
  UPDATE_ACTIVATION_COMMUNITY_FINISH,
  ADD_NEW_COMMUNITY_FINISH,
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
    case FETCH_COMMUNITIES_FINISH:
      return { ...state, data: action.payload, isProcessing: false, error: "" };
    case UPDATE_ACTIVATION_COMMUNITY_FINISH:
      const updatedCommunities = state.data.map((community) => {
        if (community.id === action.payload.id) {
          community.isDeleted = action.payload.toDelete;
        }
        return community;
      });
      return {
        ...state,
        data: updatedCommunities,
        isProcessing: false,
        error: "",
      };
    case ADD_NEW_COMMUNITY_FINISH:
      let newCommunity = { ...action.payload };
      return {
        ...state,
        isProcessing: false,
        data: { ...state.data, newCommunity },
        error: "",
      };
    default:
      return state;
  }
};
