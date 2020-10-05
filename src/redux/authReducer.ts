import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATE = "SET_USER_DATE";
const GET_CAPTCHA_URL = "GET_CAPTCHA_URL";

export type InitialStateType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  captchaUrl: string | null;
};

const initialState: InitialStateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATE:
    case GET_CAPTCHA_URL:
      return { ...state, ...action.data };

    default:
      return state;
  }
};

type SetAuthUserDataActionPayloadType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATE;
  data: SetAuthUserDataActionPayloadType;
};

export const setAuthUserDataAction = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserDataActionType => ({
  type: SET_USER_DATE,
  data: { userId, email, login, isAuth },
});

type GetCaptchaUrlActionType = {
  type: typeof GET_CAPTCHA_URL;
  data: { captchaUrl: string };
};

export const getCaptchaUrlAction = (
  captchaUrl: string
): GetCaptchaUrlActionType => ({
  type: GET_CAPTCHA_URL,
  data: { captchaUrl },
});

export const getAuthUserDataThunkCreator = () => async (dispatch: any) => {
  const res = await authAPI.getMyProfile();
  if (res.data.resultCode === 0) {
    const { login, id, email } = res.data.data;
    dispatch(setAuthUserDataAction(id, email, login, true));
  }
};

export const loginThunkCreator = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
) => async (dispatch: any) => {
  const res = await authAPI.login(email, password, rememberMe, captcha);
  if (res.data.resultCode === 0) {
    dispatch(getAuthUserDataThunkCreator());
  } else {
    if (res.data.resultCode === 10) {
      dispatch(getCaptchaUrlThunkCreator());
    }
    const errorMessage =
      res.data.messages.length > 0 ? res.data.messages[0] : "Some error";
    dispatch(stopSubmit("login", { _error: errorMessage }));
  }
};

export const getCaptchaUrlThunkCreator = () => async (dispatch: any) => {
  const res = await securityAPI.getCaptchaUrl();
  const captchaUrl = res.data.url;
  dispatch(getCaptchaUrlAction(captchaUrl));
};

export const logoutThunkCreator = () => async (dispatch: any) => {
  const res = await authAPI.logout();
  if (res.data.resultCode === 0) {
    dispatch(setAuthUserDataAction(null, null, null, false));
  }
};

export default authReducer;
