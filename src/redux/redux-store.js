import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";

import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import appReducer from './appReducer';

const reducers = combineReducers({
  app: appReducer,
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
