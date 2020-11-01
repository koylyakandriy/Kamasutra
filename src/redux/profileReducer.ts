import { stopSubmit } from "redux-form";

import { PhotosType, ProfileType } from "../types/types";
import { profileAPI } from "../api/profile-api";
import { BaseThunkActionType, InformActionsTypes } from "./redux-store";

const initialState = {
  postData: [
    { id: 1, message: "How are you?", linksCount: 12 },
    { id: 2, message: "It's very well day", linksCount: 20 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
};

type PostType = {
  id: number;
  message: string;
  linksCount: number;
};
type InitialStateType = typeof initialState;
type ActionsType = InformActionsTypes<typeof actions>;
type ThunkActionType = BaseThunkActionType<
  ActionsType | ReturnType<typeof stopSubmit>
>;

const profileReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "SN/PROFILE/ADD_POST":
      const newPost = {
        id: 5,
        message: action.newPostText,
        linksCount: 0,
      };

      return {
        ...state,
        postData: [...state.postData, newPost],
      };

    case "SN/PROFILE/DELETE_POST":
      return {
        ...state,
        postData: state.postData.filter((post) => post.id !== action.postId),
      };

    case "SN/PROFILE/SET_USER_PROFILE":
      return { ...state, profile: action.profile };

    case "SN/PROFILE/SET_STATUS":
      return { ...state, status: action.status };

    case "SN/PROFILE/SAVE_PHOTOS":
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };

    default:
      return state;
  }
};

export const actions = {
  addPostAction: (newPostText: string) =>
    ({
      type: "SN/PROFILE/ADD_POST",
      newPostText,
    } as const),
  deletePostAction: (postId: number) =>
    ({
      type: "SN/PROFILE/DELETE_POST",
      postId,
    } as const),
  setUserProfileAction: (profile: ProfileType) =>
    ({
      type: "SN/PROFILE/SET_USER_PROFILE",
      profile,
    } as const),
  setProfileStatusAction: (status: string) =>
    ({
      type: "SN/PROFILE/SET_STATUS",
      status,
    } as const),
  savePhotoAction: (photos: PhotosType) =>
    ({
      type: "SN/PROFILE/SAVE_PHOTOS",
      photos,
    } as const),
};

export const getProfileThunkCreator = (id: number): ThunkActionType => async (
  dispatch
) => {
  const res = await profileAPI.getProfile(id);
  dispatch(actions.setUserProfileAction(res));
};

export const getProfileStatusThunkCreator = (
  id: number
): ThunkActionType => async (dispatch) => {
  const res = await profileAPI.getStatus(id);
  dispatch(actions.setProfileStatusAction(res));
};

export const updateProfileStatusThunkCreator = (
  status: string
): ThunkActionType => async (dispatch) => {
  const res = await profileAPI.updateStatus(status);
  if (res.resultCode === 0) {
    dispatch(actions.setProfileStatusAction(status));
  }
};

export const saveProfilePhotoThunkCreator = (
  file: File
): ThunkActionType => async (dispatch) => {
  const res = await profileAPI.savePhoto(file);
  if (res.resultCode === 0) {
    dispatch(actions.savePhotoAction(res.data.photos));
  }
};

export const saveProfileThunkCreator = (
  profile: ProfileType
): ThunkActionType => async (dispatch) => {
  const res = await profileAPI.saveProfile(profile);
  if (res.resultCode === 0) {
    dispatch(getProfileThunkCreator(profile.userId));
  } else {
    dispatch(stopSubmit("editProfile", { _error: res.messages[0] }));
    return Promise.reject(res.messages[0]);
  }
};

export default profileReducer;
