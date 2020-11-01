import { ResultCodeEnum, ResultCodeForCaptchaEnum } from "../api/api";
import { stopSubmit } from "redux-form";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { BaseThunkActionType, InformActionsTypes } from "./redux-store";

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

type InitialStateType = typeof initialState;
type ActionsType = InformActionsTypes<typeof actions>;
type ThunkActionType = BaseThunkActionType<
  ActionsType | ReturnType<typeof stopSubmit>
>;

const authReducer = (
  state = initialState,
  action: ActionsType | any
): InitialStateType => {
  switch (action.type) {
    case "SN/AUTH/SET_USER_DATE":
    case "SN/AUTH/GET_CAPTCHA_URL":
      return { ...state, ...action.data };

    default:
      return state;
  }
};

export const actions = {
  setAuthUserDataAction: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: "SN/AUTH/SET_USER_DATE",
      data: { userId, email, login, isAuth },
    } as const),
  getCaptchaUrlAction: (captchaUrl: string) =>
    ({
      type: "SN/AUTH/GET_CAPTCHA_URL",
      data: { captchaUrl },
    } as const),
};

export const getAuthUserDataThunkCreator = (): ThunkActionType => async (
  dispatch
) => {
  const res = await authAPI.getMyProfile();
  if (res.resultCode === ResultCodeEnum.Success) {
    const { login, id, email } = res.data;
    dispatch(actions.setAuthUserDataAction(id, email, login, true));
  }
};

export const loginThunkCreator = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string | null
): ThunkActionType => async (dispatch) => {
  const res = await authAPI.login(email, password, rememberMe, captcha);
  if (res.resultCode === ResultCodeEnum.Success) {
    dispatch(getAuthUserDataThunkCreator());
  } else {
    if (res.resultCode === ResultCodeForCaptchaEnum.CaptchaISRequired) {
      dispatch(getCaptchaUrlThunkCreator());
    }
    const errorMessage =
      res.messages.length > 0 ? res.messages[0] : "Some error";
    dispatch(stopSubmit("login", { _error: errorMessage }));
  }
};

export const getCaptchaUrlThunkCreator = (): ThunkActionType => async (
  dispatch
) => {
  const res = await securityAPI.getCaptchaUrl();
  const captchaUrl = res.url;
  dispatch(actions.getCaptchaUrlAction(captchaUrl));
};

export const logoutThunkCreator = (): ThunkActionType => async (dispatch) => {
  const res = await authAPI.logout();
  if (res.data.resultCode === ResultCodeEnum.Success) {
    dispatch(actions.setAuthUserDataAction(null, null, null, false));
  }
};

export default authReducer;
