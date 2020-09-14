import { authAPI } from "../api/api";

const SET_USER_DATE = "SET_USER_DATE";

const initialState = {
  userId: null,
  email: null,
  login: null,
  // isFetching: false,
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

export const getAuthUserDataThunkCreator = () => (dispatch) => {
  authAPI.getMyProfile().then((res) => {
    if (res.data.resultCode === 0) {
      const { login, id, email } = res.data.data;
      dispatch(setAuthUserDataAction(id, email, login, true));
    }
    // toggleIsFetching(false);
  });
};

export const loginThunkCreator = (email, password, rememberMe) => (
  dispatch
) => {
  authAPI.login(email, password, rememberMe).then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(getAuthUserDataThunkCreator());
    }
  });
};

export const logoutThunkCreator = () => (dispatch) => {
  authAPI.logout().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setAuthUserDataAction(null, null, null, false));
    }
  });
};

export default authReducer;
