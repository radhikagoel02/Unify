import {
  API_CALL_FAIL,
  START_API_CALL,
  FETCH_COMMUNITIES_FINISH,
  UPDATE_ACTIVATION_COMMUNITY_FINISH,
  ADD_NEW_COMMUNITY_FINISH,
} from "./constants";

import baseUrl from "../../apis/baseUrl";

export const startApiCall = () => {
  return {
    type: START_API_CALL,
  };
};

export const apiCallFail = (err) => {
  return {
    type: API_CALL_FAIL,
    payload: err,
  };
};

export const fetchCommunitiesFinish = (communities) => {
  return {
    type: FETCH_COMMUNITIES_FINISH,
    payload: communities,
  };
};

export const fetchCommunities = () => async (dispatch, getState) => {
  const currentState = getState();
  dispatch(startApiCall());
  try {
    const res = await baseUrl.get("/admin/communityList", {
      headers: {
        Authorization: "Bearer " + currentState.user.token,
      },
    });
    dispatch(fetchCommunitiesFinish(res.data));
  } catch (err) {
    dispatch(apiCallFail(err));
  }
};

export const fetchSearchedCommunities =
  (term) => async (dispatch, getState) => {
    const currentState = getState();
    dispatch(startApiCall());
    try {
      const res = await baseUrl.get("/admin/communityList/search", {
        params: { term: term },
        headers: {
          Authorization: "Bearer " + currentState.user.token,
        },
      });
      dispatch(fetchCommunitiesFinish(res.data));
    } catch (err) {
      dispatch(apiCallFail(err));
    }
  };
export const updateActivationCommunityFinish = (id, toDelete) => {
  return {
    type: UPDATE_ACTIVATION_COMMUNITY_FINISH,
    payload: { id, toDelete },
  };
};

export const updateActivationCommunity =
  (id, toDelete) => async (dispatch, getState) => {
    const currentState = getState();
    dispatch(startApiCall());
    try {
      await baseUrl.post(
        `/admin/communityList/delete/${id}`,
        { role: currentState.user.userData.userRole, toDelete: toDelete },
        {
          headers: {
            Authorization: "Bearer " + currentState.user.token,
          },
        }
      );
      dispatch(updateActivationCommunityFinish(id, toDelete));
    } catch (err) {
      dispatch(apiCallFail(err));
    }
  };

export const addNewCommunityFinish = (community) => {
  return { type: ADD_NEW_COMMUNITY_FINISH, payload: community };
};

export const addNewCommunity =
  (newCommunityInfo) => async (dispatch, getState) => {
    const currentState = getState();
    dispatch(startApiCall());
    try {
      const res = await baseUrl.post(
        "/community/create",
        {
          communityDetails: newCommunityInfo,
          userId: currentState.user.userData.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + currentState.user.token,
          },
        }
      );
      dispatch(addNewCommunity(res.data));
    } catch (err) {
      dispatch(apiCallFail(err));
    }
  };
