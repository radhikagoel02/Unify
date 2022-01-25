const INITIAL_STATE = {
  communityData: [],
  members: {
    all: [],
    admin: [],
    user: [],
    requests: [],
  },
  user: {
    joined: false,
    communityRole: "",
  },
  error: null,
  isProcessing: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START_API_CALL":
      return { ...state, isProcessing: true, error: null };
    case "API_CALL_FAIL":
      return { ...state, error: action.payload };
    case "FETCH_COMMUNITIES_DETAILS_FINISH":
      return {
        ...state,
        isProcessing: false,
        error: "",
        communityData: action.payload.communityData,
        members: {
          ...state.members,
          all: action.payload.allMembers,
          admin: action.payload.communityAdminMembers,
          user: action.payload.communityUserMembers,
          requests: action.payload.requestsToJoin,
        },
        user: {
          ...state.user,
          joined: action.payload.communityJoined,
          communityRole: action.payload.userCommunityRole,
        },
      };
    case "UPDATE_COMMUNITY_FINISH":
      return {
        ...state,
        isProcessing: false,
        communityData: action.payload,
        error: "",
      };

    case "PROMOTE_USER_FINISH":
      let promotedUser = state.members.user.find(
        (user) => user.id === action.payload
      );
      let updatedUserMembers = state.members.user.filter(
        (user) => user.id !== action.payload
      );
      return {
        ...state,
        members: {
          ...state.members,
          user: updatedUserMembers,
          admin: [...state.members.admin, promotedUser],
        },
        error: "",
      };
    case "DEMOTE_USER_FINISH":
      let demotedUser = state.members.admin.find(
        (user) => user.id === action.payload
      );
      let updatedAdminMembers = state.members.admin.filter(
        (user) => user.id !== action.payload
      );
      return {
        ...state,
        members: {
          ...state.members,
          user: [...state.members.user, demotedUser],
          admin: updatedAdminMembers,
        },
        error: "",
      };
    case "ACCEPT_USER_REQUEST_FINISH":
      let newMember = action.payload.memberAdded;
      return {
        ...state,
        members: {
          ...state.members,
          user: { ...state.members.user, newMember },
          requests: state.members.requests.filter(
            (request) => request.id !== action.payload.userId
          ),
        },
        error: "",
      };
    case "REJECT_USER_REQUEST_FINISH":
      return {
        ...state,
        members: {
          ...state.members,
          requests: state.members.requests.filter(
            (request) => request.id !== action.payload
          ),
        },
        error: "",
      };
    case "REMOVE_USER_FINISH":
      let updatedMembers = state.members.user.filter(
        (user) => user.id !== action.payload.id
      );
      if (action.payload.communityRole === "user") {
        return {
          ...state,
          members: {
            ...state.members,
            user: updatedMembers,
          },
          error: "",
        };
      }
      return {
        ...state,
        members: {
          ...state.members,
          admin: updatedMembers,
        },
        error: "",
      };
    default:
      return state;
  }
};
