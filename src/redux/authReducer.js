import { authAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATE = "SET_USER_DATE";

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATE:
      return { ...state, ...action.data };

    default:
      return state;
  }
};

export const setAuthUserDataAction = (userId, email, login, isAuth) => ({
  type: SET_USER_DATE,
  data: { userId, email, login, isAuth },
});

export const getAuthUserDataThunkCreator = () => async (dispatch) => {
  const res = await authAPI.getMyProfile();
  if (res.data.resultCode === 0) {
    const { login, id, email } = res.data.data;
    dispatch(setAuthUserDataAction(id, email, login, true));
  }
};

export const loginThunkCreator = (email, password, rememberMe) => async (
  dispatch
) => {
  const res = await authAPI.login(email, password, rememberMe);
  if (res.data.resultCode === 0) {
    dispatch(getAuthUserDataThunkCreator());
  } else {
    const errorMessage =
      res.data.messages.length > 0 ? res.data.messages[0] : "Some error";
    dispatch(stopSubmit("login", { _error: errorMessage }));
  }
};

export const logoutThunkCreator = () => async (dispatch) => {
  const res = await authAPI.logout();
  if (res.data.resultCode === 0) {
    dispatch(setAuthUserDataAction(null, null, null, false));
  }
};

export default authReducer;
