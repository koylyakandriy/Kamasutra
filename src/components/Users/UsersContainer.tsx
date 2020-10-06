import React, { useCallback, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import Users from "./index";
import Loader from "../common/Loader";
import {
  successFollowThunkCreator,
  getUsersThunkCreator,
  setCurrentPageAction,
  successUnfollowThunkCreator,
} from "../../redux/usersReducer";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsers,
  getUsers,
} from "../../redux/usersSelector";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type PropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsers: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>;
};

const UsersContainer: FC<PropsType> = () => {
  const dispatch = useDispatch();

  const {
    users,
    pageSize,
    totalUsers,
    currentPage,
    isFetching,
    followingInProgress,
  } = useSelector((state: AppStateType) => ({
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsers: getTotalUsers(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  }));

  const setCurrentPage = (page: number) => dispatch(setCurrentPageAction(page));

  const successFollowThunk = (isFetching: boolean, userId: number) =>
    dispatch(successFollowThunkCreator(isFetching, userId));
  const successUnfollowThunk = (isFetching: boolean, userId: number) =>
    dispatch(successUnfollowThunkCreator(isFetching, userId));

  const getUsersThunk = useCallback(
    (currentPage, pageSize) => {
      dispatch(getUsersThunkCreator(currentPage, pageSize));
    },
    [dispatch]
  );

  useEffect(() => {
    getUsersThunk(currentPage, pageSize);
  }, [getUsersThunk, currentPage, pageSize]);

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <Users
          users={users}
          currentPage={currentPage}
          pageSize={pageSize}
          totalUsers={totalUsers}
          isFetching={isFetching}
          setCurrentPage={setCurrentPage}
          successFollowThunk={successFollowThunk}
          successUnfollowThunk={successUnfollowThunk}
          followingInProgress={followingInProgress}
        />
      )}
    </>
  );
};

export default UsersContainer;
