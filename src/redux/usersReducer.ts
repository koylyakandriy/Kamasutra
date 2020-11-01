import { Dispatch } from "redux";

import { updateObjectInArray } from "../utils/ObjectHelper";
import { UserType } from "../types/types";
import { InformActionsTypes, BaseThunkActionType } from "./redux-store";
import { usersAPI } from "../api/users-api";
import { followAPI } from "../api/follow-api";

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 20,
  totalUsers: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
};

type InitialStateType = typeof initialState;
type ActionsType = InformActionsTypes<typeof actions>;
type ThunkActionType = BaseThunkActionType<ActionsType>;

export const actions = {
  setUsersAction: (users: Array<UserType>) =>
    ({
      type: "SN/USERS/SET_USERS",
      users,
    } as const),
  followAction: (userId: number) =>
    ({
      type: "SN/USERS/FOLLOW",
      userId,
    } as const),
  unfollowAction: (userId: number) =>
    ({
      type: "SN/USERS/UNFOLLOW",
      userId,
    } as const),
  setCurrentPageAction: (page: number) =>
    ({
      type: "SN/USERS/SET_CURRENT_PAGE",
      page,
    } as const),
  setTotalUsersAction: (totalUsers: number) =>
    ({
      type: "SN/USERS/SET_TOTAL_USERS",
      totalUsers,
    } as const),
  toggleIsFetchingAction: (isFetching: boolean) =>
    ({
      type: "SN/USERS/TOGGLE_IS_FETCHING",
      isFetching,
    } as const),
  toggleFollowingProgressAction: (isFetching: boolean, userId: number) =>
    ({
      type: "SN/USERS/TOGGLE_FOLLOWING_IN_PROGRESS",
      isFetching,
      userId,
    } as const),
};

const usersReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "SN/USERS/SET_USERS":
      return { ...state, users: action.users };
    case "SN/USERS/FOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    case "SN/USERS/UNFOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case "SN/USERS/SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.page,
      };
    case "SN/USERS/SET_TOTAL_USERS":
      return {
        ...state,
        totalUsers: action.totalUsers,
      };
    case "SN/USERS/TOGGLE_IS_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "SN/USERS/TOGGLE_FOLLOWING_IN_PROGRESS":
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

export const getUsersThunkCreator = (
  currentPage: number,
  pageSize: number
): ThunkActionType => async (dispatch, getState) => {
  dispatch(actions.toggleIsFetchingAction(true));
  dispatch(actions.setCurrentPageAction(currentPage));

  const res = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(actions.toggleIsFetchingAction(false));
  dispatch(actions.setUsersAction(res.items));
  dispatch(actions.setTotalUsersAction(res.totalCount));
};

const followUnfollowFlow = async (
  dispatch: Dispatch<ActionsType>,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsType
) => {
  dispatch(actions.toggleFollowingProgressAction(true, userId));

  const res = await apiMethod(userId);
  if (res.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgressAction(false, userId));
};

export const successFollowThunkCreator = (
  isFetching: boolean,
  userId: number
): ThunkActionType => async (dispatch) => {
  await followUnfollowFlow(
    dispatch,
    userId,
    followAPI.onFollow,
    actions.followAction
  );
};

export const successUnfollowThunkCreator = (
  isFetching: boolean,
  userId: number
): ThunkActionType => async (dispatch) => {
  await followUnfollowFlow(
    dispatch,
    userId,
    followAPI.onUnfollow,
    actions.unfollowAction
  );
};

export default usersReducer;
