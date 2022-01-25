import {
  API_CALL_FAIL,
  START_API_CALL,
  FETCH_USERS_FINISH,
  UPDATE_ACTIVATION_USER_FINISH,
  UPDATE_USER_FINISH,
  ADD_NEW_USER_FINISH,
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

export const fetchUsersFinish = (users) => {
  return {
    type: FETCH_USERS_FINISH,
    payload: users,
  };
};

export const fetchUsers = () => async (dispatch, getState) => {
  const currentState = getState();
  dispatch(startApiCall());
  try {
    const res = await baseUrl.get("/admin/userList", {
      headers: {
        Authorization: "Bearer " + currentState.user.token,
      },
    });
    dispatch(fetchUsersFinish(res.data));
  } catch (err) {
    dispatch(apiCallFail(err));
  }
};

export const fetchSearchedUsers = (term) => async (dispatch, getState) => {
  const currentState = getState();
  dispatch(startApiCall());
  try {
    const res = await baseUrl.get("/admin/userList/search", {
      params: { term: term },
      headers: {
        Authorization: "Bearer " + currentState.user.token,
      },
    });
    dispatch(fetchUsersFinish(res.data));
  } catch (err) {
    dispatch(apiCallFail(err));
  }
};
export const updateActivationUserFinish = (id, toDelete) => {
  return {
    type: UPDATE_ACTIVATION_USER_FINISH,
    payload: { id, toDelete },
  };
};

export const updateActivationUser =
  (id, toDelete) => async (dispatch, getState) => {
    const currentState = getState();
    dispatch(startApiCall());
    try {
      await baseUrl.post(
        `/admin/userList/delete/${id}`,
        { role: currentState.user.userData.role, toDelete: toDelete },
        {
          headers: {
            Authorization: "Bearer " + currentState.user.token,
          },
        }
      );
      dispatch(updateActivationUserFinish(id, toDelete));
    } catch (err) {
      dispatch(apiCallFail(err));
    }
  };

export const updateUserFinish = (updatedUserInfo) => {
  return {
    type: UPDATE_USER_FINISH,
    payload: updatedUserInfo,
  };
};

export const updateUser =
  (updatedUserInfo, id) => async (dispatch, getState) => {
    const currentState = getState();
    dispatch(startApiCall());
    try {
      const res = await baseUrl.post(
        "/adminadmin/editUser",
        {
          newDetails: updatedUserInfo,
          editingUserId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + currentState.user.token,
          },
        }
      );
      dispatch(updateUserFinish(res.data));
    } catch (err) {
      dispatch(apiCallFail(err));
    }
  };

export const addNewUserFinish = (user) => {
  return { type: ADD_NEW_USER_FINISH, payload: user };
};

export const addNewUser = (newUserInfo) => async (dispatch, getState) => {
  const currentState = getState();
  dispatch(startApiCall());
  try {
    const res = await baseUrl.post("/admin/addUser", newUserInfo, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentState.user.token,
      },
    });
    dispatch(addNewUserFinish(res.data));
  } catch (err) {
    dispatch(apiCallFail(err));
  }
};
