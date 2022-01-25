const INITIAL_STATE = {
  joinedCommunities: [],
  notJoinedCommunities: [],
  error: null,
  isProcessing: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START_API_CALL":
      return { ...state, isProcessing: true, error: null };
    case "API_CALL_FAIL":
      return { ...state, error: action.payload };
    case "FETCH_JOINED_COMMUNITIES_FINISH":
      return { ...state, joinedCommunities: action.payload, error: "" };
    case "FETCH_NOT_JOINED_COMMUNITIES_FINISH":
      return { ...state, notJoinedCommunities: action.payload, error: "" };
    case "CANCEL_REQUEST_FINISH":
      let updatedCommunities = state.joinedCommunities.filter(
        (community) => community.id !== action.payload
      );
      return { ...state, joinedCommunities: updatedCommunities, error: "" };
    case "JOIN_COMMUNITY_FINISH":
      return {
        ...state,
        notJoinedCommunities: state.notJoinedCommunities.filter(
          (community) => community.id !== action.payload
        ),
        error: "",
      };
    case "LEAVE_COMMUNITY_FINISH":
      let communityLeft = state.joinedCommunities.filter(
        (community) => community.id === action.payload
      );
      return {
        ...state,
        joinedCommunities: state.joinedCommunities.filter(
          (community) => community.id !== action.payload
        ),
        notJoinedCommunities: [...state.notJoinedCommunities, communityLeft],
        error: "",
      };
    default:
      return state;
  }
};
