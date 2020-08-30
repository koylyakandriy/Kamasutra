import { profileAPI } from "../api/api";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

const initialState = {
  postData: [
    { id: 1, message: "How are you?", linksCount: 12 },
    { id: 2, message: "It's very well day", linksCount: 20 }
  ],
  profile: null,
  status: ""
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: 5,
        message: action.newPostText,
        linksCount: 0
      };

      return {
        ...state,
        postData: [...state.postData, newPost],
      };

    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };

    case SET_STATUS:
      return { ...state, status: action.status };

    default:
      return state;
  }
};

export const addPostAction = (newPostText) => ({
  type: ADD_POST,
  newPostText
});

export const setUserProfileAction = profile => ({
  type: SET_USER_PROFILE,
  profile
});

export const setProfileStatusAction = status => ({
  type: SET_STATUS,
  status
});

export const getProfileThunkCreator = id => dispatch => {
  profileAPI
    .getProfile(id)
    .then(res => dispatch(setUserProfileAction(res.data)));
};

export const getProfileStatusThunkCreator = userId => dispatch => {
  profileAPI
    .getStatus(userId)
    .then(res => dispatch(setProfileStatusAction(res.data)));
};

export const updateProfileStatusThunkCreator = status => dispatch => {
  profileAPI.updateStatus(status).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setProfileStatusAction(status));
    }
  });
};

export default profileReducer;
