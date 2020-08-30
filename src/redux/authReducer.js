import { authAPI } from "../api/api";

const SET_USER_DATE = "SET_USER_DATE";

const initialState = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATE:
      return { ...state, ...action.data, isAuth: true };

    default:
      return state;
  }
};

export const setAuthUserDataAction = (userId, email, login) => ({
  type: SET_USER_DATE,
  data: { userId, email, login }
});

export const getAuthUserDataThunkCreator = () => {
  return dispatch => {
    authAPI.getMyProfile().then(res => {
      if (res.data.resultCode === 0) {
        const { login, id, email } = res.data.data;
        dispatch(setAuthUserDataAction(id, email, login));
      }
      // toggleIsFetching(false);
    });
  };
};

export default authReducer;
