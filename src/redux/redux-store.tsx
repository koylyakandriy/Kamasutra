import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose,
  Action,
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from "redux-form";

import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer";

const reducers = combineReducers({
  app: appReducer,
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
});

export type InformActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

export type BaseThunkActionType<
  A extends Action,
  R = Promise<void>
> = ThunkAction<R, AppStateType, unknown, A>;

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
