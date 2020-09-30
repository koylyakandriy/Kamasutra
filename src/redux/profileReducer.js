import { profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTOS = "SAVE_PHOTOS";

const initialState = {
  postData: [
    { id: 1, message: "How are you?", linksCount: 12 },
    { id: 2, message: "It's very well day", linksCount: 20 },
  ],
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: 5,
        message: action.newPostText,
        linksCount: 0,
      };

      return {
        ...state,
        postData: [...state.postData, newPost],
      };

    case DELETE_POST:
      return {
        ...state,
        postData: state.postData.filter((post) => post.id !== action.postId),
      };

    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };

    case SET_STATUS:
      return { ...state, status: action.status };

    case SAVE_PHOTOS:
      return { ...state, profile: { ...state.profile, photos: action.photos } };

    default:
      return state;
  }
};

export const addPostAction = (newPostText) => ({
  type: ADD_POST,
  newPostText,
});

export const deletePostAction = (postId) => ({
  type: DELETE_POST,
  postId,
});

export const setUserProfileAction = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});

export const setProfileStatusAction = (status) => ({
  type: SET_STATUS,
  status,
});

export const savePhotoAction = (photos) => ({
  type: SAVE_PHOTOS,
  photos,
});

export const getProfileThunkCreator = (id) => async (dispatch) => {
  const res = await profileAPI.getProfile(id);
  dispatch(setUserProfileAction(res.data));
};

export const getProfileStatusThunkCreator = (id) => async (dispatch) => {
  const res = await profileAPI.getStatus(id);
  dispatch(setProfileStatusAction(res.data));
};

export const updateProfileStatusThunkCreator = (status) => async (dispatch) => {
  const res = await profileAPI.updateStatus(status);
  if (res.data.resultCode === 0) {
    dispatch(setProfileStatusAction(status));
  }
};

export const saveProfilePhotoThunkCreator = (file) => async (dispatch) => {
  const res = await profileAPI.savePhoto(file);
  if (res.data.resultCode === 0) {
    dispatch(savePhotoAction(res.data.data.photos));
  }
};

export const saveProfileThunkCreator = (profile) => async (dispatch) => {
  // const userId = getState().auth.userId;
  const res = await profileAPI.saveProfile(profile);
  if (res.data.resultCode === 0) {
    dispatch(getProfileThunkCreator(profile.userId));
  } else {
    dispatch(stopSubmit("editProfile", { _error: res.data.messages[0] }));
    return Promise.reject(res.data.messages[0])
  }
};

export default profileReducer;
