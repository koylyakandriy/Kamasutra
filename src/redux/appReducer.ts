import { getAuthUserDataThunkCreator } from "./authReducer";
import { InformActionsTypes } from "./redux-store";

const initialState = {
  initialized: false,
};

type InitialStateType = typeof initialState;
type ActionsType = InformActionsTypes<typeof actions>;

const appReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "SN/APP/INITIALIZED_SUCCESS":
      return { ...state, initialized: true };

    default:
      return state;
  }
};

export const actions = {
  initializedSuccessAction: () =>
    ({
      type: "SN/APP/INITIALIZED_SUCCESS",
    } as const),
};

export const initializedSuccessThunkCreator = () => (dispatch: any) => {
  const promise = dispatch(getAuthUserDataThunkCreator());

  promise.then(() => dispatch(actions.initializedSuccessAction()));
};

export default appReducer;
