import React, { useCallback, useEffect } from "react";
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

const UsersContainer = () => {
  const dispatch = useDispatch();

  const {
    users,
    pageSize,
    totalUsers,
    currentPage,
    isFetching,
    followingInProgress,
  } = useSelector((state) => ({
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsers: getTotalUsers(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  }));

  const setCurrentPage = (page) => dispatch(setCurrentPageAction(page));

  const successFollowThunk = (isFetching, userId) =>
    dispatch(successFollowThunkCreator(isFetching, userId));
  const successUnfollowThunk = (isFetching, userId) =>
    dispatch(successUnfollowThunkCreator(isFetching, userId));

  const getUsersThunk = useCallback(
    (currentPage, pageSize) => {
      dispatch(getUsersThunkCreator(currentPage, pageSize));
    },
    [dispatch]
  );

  const pagesCount = Math.ceil(totalUsers / pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  useEffect(() => {
    getUsersThunk(currentPage, pageSize);
  }, [getUsersThunk, currentPage, pageSize]);

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <Users
          pages={pages}
          users={users}
          currentPage={currentPage}
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
