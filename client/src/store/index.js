import { combineReducers } from "redux";
import userListReducer from "./users/reducers";
import userReducer from "./user/reducers";
import communityListReducer from "./communities/reducers";
import userCommunitiesReducer from "./userCommunities/reducers";
import communityReducer from "./community/reducers";

//combine reducers ismein
const rootReducer = combineReducers({
  users: userListReducer,
  user: userReducer,
  communities: communityListReducer,
  userCommunities: userCommunitiesReducer,
  community: communityReducer,
});

export default rootReducer;
