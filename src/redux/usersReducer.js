import { followAPI, usersAPI } from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS = "SET_TOTAL_USERS";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_IN_PROGRESS = "TOGGLE_FOLLOWING_IN_PROGRESS";

const initialState = {
  users: [],
  pageSize: 5,
  totalUsers: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.users };

    case FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }
          return user;
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

export const setUsersAction = (users) => ({ type: SET_USERS, users });
export const followAction = (userId) => ({ type: FOLLOW, userId });
export const unfollowAction = (userId) => ({ type: UNFOLLOW, userId });
export const setCurrentPageAction = (page) => ({
  type: SET_CURRENT_PAGE,
  page,
});
export const setTotalUsersAction = (totalUsers) => ({
  type: SET_TOTAL_USERS,
  totalUsers,
});
export const toggleIsFetchingAction = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
export const toggleFollowingProgressAction = (isFetching, userId) => ({
  type: TOGGLE_FOLLOWING_IN_PROGRESS,
  isFetching,
  userId,
});

export const getUsersThunkCreator = (currentPage, pageSize) => {
  return (dispatch) => {
    dispatch(toggleIsFetchingAction(true));
    usersAPI.getUsers(currentPage, pageSize).then((res) => {
      dispatch(toggleIsFetchingAction(false));
      dispatch(setUsersAction(res.data.items));
      dispatch(setTotalUsersAction(res.data.totalCount));
    });
  };
};

export const successFollowThunkCreator = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgressAction(true, userId));
    followAPI.onFollow(userId).then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(followAction(userId));
      }
      dispatch(toggleFollowingProgressAction(false, userId));
    });
  };
};

export const successUnfollowThunkCreator = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgressAction(true, userId));
    followAPI.onUnfollow(userId).then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(unfollowAction(userId));
      }
      dispatch(toggleFollowingProgressAction(false, userId));
    });
  };
};

export default usersReducer;
