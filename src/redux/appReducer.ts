import { getAuthUserDataThunkCreator } from "./authReducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

export type InitialStateType = {
  initialized: boolean;
};

const initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return { ...state, initialized: true };

    default:
      return state;
  }
};

type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS;
};

export const initializedSuccessAction = (): InitializedSuccessActionType => ({
  type: INITIALIZED_SUCCESS,
});

export const initializedSuccessThunkCreator = () => (dispatch: any) => {
  const promise = dispatch(getAuthUserDataThunkCreator());

  promise.then(() => dispatch(initializedSuccessAction()));
};

export default appReducer;
