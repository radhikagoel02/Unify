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

export const fetchCommunityDetailsFinish = (community) => {
  return { type: "FETCH_COMMUNITIES_DETAILS_FINISH", payload: community };
};

export const fetchCommunityDetails = (id) => async (dispatch, getState) => {
  dispatch(startApiCall());
  const currentState = getState();
  try {
    const res = await baseUrl.get(`/community/${id}`, {
      params: { userId: currentState.user.userData.id },
      headers: {
        Authorization: "Bearer " + currentState.user.token,
      },
    });
    dispatch(fetchCommunityDetailsFinish(res.data));
  } catch (err) {
    dispatch(apiCallFail(err));
  }
};

export const fetchMembers = (id) => (dispatch, getState) => {
  let currentState = getState();
  if (id !== currentState.community.communityData.id) {
    dispatch(fetchCommunityDetailsFinish(id));
  }
};

export const updateCommunityFinish = (updatedCommunity) => {
  return { type: "UPDATE_COMMUNITY_FINISH", payload: updatedCommunity };
};

export const updateCommunity =
  (updatedCommunityData) => async (dispatch, getState) => {
    dispatch(startApiCall());
    const currentState = getState();
    try {
      const res = await baseUrl.post(
        `/community/editCommunity/${currentState.community.communityData.id}`,
        {
          communityDetails: updatedCommunityData,
          userId: currentState.user.userData.id,
        },
        {
          headers: {
            Authorization: "Bearer " + currentState.user.token,
          },
        }
      );
      dispatch(updateCommunityFinish(res.data));
    } catch (err) {
      dispatch(apiCallFail(err));
    }
  };

export const promoteUserFinish = (id) => {
  return { type: "PROMOTE_USER_FINISH", payload: id };
};

export const promoteUser = (id) => async (dispatch, getState) => {
  dispatch(startApiCall());
  const currentState = getState();
  try {
    const res = await baseUrl.patch(
      "/community/promote",
      {
        communityId: currentState.community.communityData.id,
        userId: id,
      },
      {
        headers: {
          Authorization: "Bearer " + currentState.user.token,
        },
      }
    );
    dispatch(promoteUserFinish(id));
  } catch (err) {
    dispatch(apiCallFail(err));
  }
};

export const demoteUserFinish = (userId) => {
  return { type: "DEMOTE_USER_FINISH", payload: userId };
};

export const demoteUser = (id) => async (dispatch, getState) => {
  dispatch(startApiCall());
  const currentState = getState();
  try {
    const res = await baseUrl.patch(
      "/community/demote",
      {
        communityId: currentState.community.communityData.id,
        userId: id,
      },
      {
        headers: {
          Authorization: "Bearer " + currentState.user.token,
        },
      }
    );
    dispatch(demoteUserFinish(id));
  } catch (err) {
    dispatch(apiCallFail(err));
  }
};

export const removeUserFinish = (id, communityRole) => {
  return { type: "PROMOTE_USER_FINISH", payload: { id, communityRole } };
};

export const removeUser = (id, communityRole) => async (dispatch, getState) => {
  dispatch(startApiCall());
  const currentState = getState();
  try {
    const res = await baseUrl.patch(
      `/community/removeMember`,
      {
        userId: id,
        communityId: currentState.community.communityData.id,
      },
      {
        headers: {
          Authorization: "Bearer " + currentState.user.token,
        },
      }
    );
    dispatch(removeUserFinish(id, communityRole));
  } catch (err) {
    dispatch(apiCallFail(err));
  }
};

export const acceptUserRequestFinish = (userId, memberAdded) => {
  return {
    type: "ACCEPT_USER_REQUEST_FINISH",
    payload: { userId, memberAdded },
  };
};

export const acceptUserRequest = (id) => async (dispatch, getState) => {
  dispatch(startApiCall());
  const currentState = getState();
  try {
    const res = await baseUrl.post(
      "/community/acceptRequest",
      {
        communityId: currentState.community.communityData.id,
        userId: id,
      },
      {
        headers: {
          Authorization: "Bearer " + currentState.user.token,
        },
      }
    );
    dispatch(acceptUserRequest(id, res.data));
  } catch (err) {
    dispatch(apiCallFail(err));
  }
};

export const rejectUserRequestFinish = (userId) => {
  return {
    type: "REJECT_USER_REQUEST_FINISH",
    payload: userId,
  };
};

export const rejectUserRequest = (id) => async (dispatch, getState) => {
  dispatch(startApiCall());
  const currentState = getState();
  try {
    const res = await baseUrl.post(
      "/community/rejectRequest",
      {
        communityId: currentState.community.communityData.id,
        userId: id,
      },
      {
        headers: {
          Authorization: "Bearer " + currentState.user.token,
        },
      }
    );
    dispatch(rejectUserRequestFinish(id));
  } catch (err) {
    dispatch(apiCallFail(err));
  }
};
