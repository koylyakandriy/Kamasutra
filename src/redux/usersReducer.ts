import { followAPI, usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/ObjectHelper";
import { UserType } from "../types/types";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS = "SET_TOTAL_USERS";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_IN_PROGRESS = "TOGGLE_FOLLOWING_IN_PROGRESS";

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 20,
  totalUsers: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
};

type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.users };

    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };

    case SET_TOTAL_USERS:
      return {
        ...state,
        totalUsers: action.totalUsers,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case TOGGLE_FOLLOWING_IN_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };

    default:
      return state;
  }
};

type SetUsersActionType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};
export const setUsersAction = (users: Array<UserType>): SetUsersActionType => ({
  type: SET_USERS,
  users,
});

type FollowActionType = {
  type: typeof FOLLOW;
  userId: number;
};
export const followAction = (userId: number): FollowActionType => ({
  type: FOLLOW,
  userId,
});

type UnfollowActionType = {
  type: typeof UNFOLLOW;
  userId: number;
};
export const unfollowAction = (userId: number): UnfollowActionType => ({
  type: UNFOLLOW,
  userId,
});

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE;
  page: number;
};
export const setCurrentPageAction = (
  page: number
): SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  page,
});

type SetTotalUsersActionType = {
  type: typeof SET_TOTAL_USERS;
  totalUsers: number;
};
export const setTotalUsersAction = (
  totalUsers: number
): SetTotalUsersActionType => ({
  type: SET_TOTAL_USERS,
  totalUsers,
});

type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
export const toggleIsFetchingAction = (
  isFetching: boolean
): ToggleIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

type ToggleFollowingProgressActionType = {
  type: typeof TOGGLE_FOLLOWING_IN_PROGRESS;
  isFetching: boolean;
  userId: number;
};
export const toggleFollowingProgressAction = (
  isFetching: boolean,
  userId: number
): ToggleFollowingProgressActionType => ({
  type: TOGGLE_FOLLOWING_IN_PROGRESS,
  isFetching,
  userId,
});

export const getUsersThunkCreator = (
  currentPage: number,
  pageSize: number
) => async (dispatch: any) => {
  dispatch(toggleIsFetchingAction(true));
  dispatch(setCurrentPageAction(currentPage));

  const res = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(toggleIsFetchingAction(false));
  dispatch(setUsersAction(res.data.items));
  dispatch(setTotalUsersAction(res.data.totalCount));
};

const followUnfollowFlow = async (
  dispatch: any,
  userId: number,
  apiMethod: any,
  actionCreator: any
) => {
  dispatch(toggleFollowingProgressAction(true, userId));

  const res = await apiMethod(userId);
  if (res.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgressAction(false, userId));
};

export const successFollowThunkCreator = (
  isFetching: boolean,
  userId: number
) => async (dispatch: any) => {
  await followUnfollowFlow(dispatch, userId, followAPI.onFollow, followAction);
};

export const successUnfollowThunkCreator = (
  isFetching: boolean,
  userId: number
) => async (dispatch: any) => {
  await followUnfollowFlow(
    dispatch,
    userId,
    followAPI.onUnfollow,
    unfollowAction
  );

  // dispatch(toggleFollowingProgressAction(true, userId));
  //
  // const res = await followAPI.onUnfollow(userId);
  // if (res.data.resultCode === 0) {
  //   dispatch(unfollowAction(userId));
  // }
  // dispatch(toggleFollowingProgressAction(false, userId));
};

export default usersReducer;
