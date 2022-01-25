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

export const loginUserFinish = (user) => {
  return {
    type: LOGIN_USER_FINISH,
    payload: user,
  };
};

export const loginUser = (data) => async (dispatch) => {
  dispatch(startApiCall());
  try {
    const res = await baseUrl.post("/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(loginUserFinish(res.data));
  } catch (err) {
    dispatch(apiCallFail(err));
  }
};

export const logOut = () => {
  return {
    type: LOGOUT,
  };
};

export const updateUserMode = (modeToSwitch) => {
  return {
    type: UPDATE_USER_MODE,
    payload: modeToSwitch,
  };
};

export const updateUserDataFinish = (updatedUser) => {
  return { type: UPDATE_USER_DATA_FINISH, payload: updatedUser };
};

export const updateUserData = (data) => async (dispatch, getState) => {
  let currentState = getState();
  if (currentState.user.userData.status === "pending") {
    dispatch(updateUserStatus());
  }
  dispatch(startApiCall());
  try {
    const res = await baseUrl.post("/user/edit", data, {
      params: { userId: currentState.user.userData.id },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + currentState.user.token,
      },
    });
    dispatch(updateUserDataFinish(res.data));
  } catch (err) {
    dispatch(apiCallFail(err));
  }
};

export const updateUserStatusFinish = () => {
  return { type: UPDATE_USER_STATUS_FINISH };
};

export const updateUserStatus = () => async (dispatch, getState) => {
  let currentState = getState();
  dispatch(startApiCall());
  try {
    const res = await baseUrl.post(
      "/user/statusUpdate",
      {
        status: "confirmed",
        id: currentState.user.userData.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + currentState.user.token,
        },
      }
    );
    dispatch(updateUserStatusFinish());
  } catch (err) {
    dispatch(apiCallFail(err));
  }
};

export const updatePasswordFinsih = () => {
  return { type: UPDATE_PASSWORD_FINISH };
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch, getState) => {
    let currentState = getState();
    dispatch(startApiCall());
    try {
      const res = await baseUrl.post(
        "/changepassword",
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + currentState.user.token,
          },
        }
      );
      dispatch(updatePasswordFinsih());
    } catch (err) {
      dispatch(apiCallFail(err));
    }
  };
