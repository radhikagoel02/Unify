import baseUrl from "../../apis/baseUrl";

export const startApiCall = () => {
  return {
    type: "START_API_CALL",
  };
};

export const apiCallFail = (err) => {
  return {
    type: "API_CALL_FAIL",
    payload: err,
  };
};
export const fetchJoinedCommunitiesFinish = (communities) => {
  return { type: "FETCH_JOINED_COMMUNITIES_FINISH", payload: communities };
};

export const fetchJoinedCommunities = () => async (dispatch, getState) => {
  let currentState = getState();
  dispatch(startApiCall());
  try {
    const res = await baseUrl.get("/communitypanel", {
      params: { userId: currentState.user.userData.id },
      headers: {
        Authorization: "Bearer " + currentState.user.token,
      },
    });
    dispatch(fetchJoinedCommunitiesFinish(res.data));
  } catch (err) {
    dispatch(apiCallFail(err));
  }
};

export const cancelRequestFinish = (communityId) => {
  return { type: "CANCEL_REQUEST_FINISH", payload: communityId };
};

export const cancelRequest = (communityId) => async (dispatch, getState) => {
  let currentState = getState();
  dispatch(startApiCall());
  try {
    const res = await baseUrl.post(
      `/cancelRequest/${communityId}`,
      { userId: currentState.user.userData.id },
      {
        headers: {
          Authorization: "Bearer " + currentState.user.token,
        },
      }
    );
    dispatch(cancelRequestFinish(communityId));
  } catch (err) {
    dispatch(apiCallFail(err));
  }
};

export const fetchNotJoinedCommunitiesFinish = (communities) => {
  return { type: "FETCH_NOT_JOINED_COMMUNITIES_FINISH", payload: communities };
};

export const fetchNotJoinedCommunities = () => async (dispatch, getState) => {
  let currentState = getState();
  dispatch(startApiCall());
  try {
    const res = await baseUrl.get("/findCommunities", {
      params: { userId: currentState.user.userData.id },
      headers: {
        Authorization: "Bearer " + currentState.user.token,
      },
    });
    dispatch(fetchNotJoinedCommunitiesFinish(res.data));
  } catch (err) {
    dispatch(apiCallFail(err));
  }
};

export const joinCommunityFinish = (communityId) => {
  return { type: "JOIN_COMMUNITY_FINISH", payload: communityId };
};

export const joinCommunity = (communityId) => async (dispatch, getState) => {
  let currentState = getState();
  dispatch(startApiCall());
  try {
    const res = await baseUrl.post(
      `/join/${communityId}`,
      { userId: currentState.user.userData.id },
      {
        headers: {
          Authorization: "Bearer " + currentState.user.token,
        },
      }
    );
    dispatch(joinCommunityFinish(communityId));
  } catch (err) {
    dispatch(apiCallFail(err));
  }
};

export const leaveCommunityFinish = (communityId) => {
  return { type: "LEAVE_COMMUNITY_FINISH", payload: communityId };
};

export const leaveCommunity = (communityId) => async (dispatch, getState) => {
  let currentState = getState();
  dispatch(startApiCall());
  try {
    const res = await baseUrl.post(
      "/leaveCommunity",
      { userId: currentState.user.userData.id, communityId: communityId },
      {
        headers: {
          Authorization: "Bearer " + currentState.user.token,
        },
      }
    );
    dispatch(leaveCommunityFinish(communityId));
  } catch (err) {
    dispatch(apiCallFail(err));
  }
};
