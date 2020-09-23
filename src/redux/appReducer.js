import { getAuthUserDataThunkCreator } from "./authReducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return { ...state, initialized: true };

    default:
      return state;
  }
};

export const initializedSuccessAction = () => ({ type: INITIALIZED_SUCCESS });

export const initializedSuccessThunkCreator = () => (dispatch) => {
  const promise = dispatch(getAuthUserDataThunkCreator());

  promise.then(() => dispatch(initializedSuccessAction()));
};

export default appReducer;
