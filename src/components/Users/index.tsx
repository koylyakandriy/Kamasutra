import React, { FC } from "react";

import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UserType } from "../../types/types";

import styles from "./users.module.scss";

type PropsType = {
  users: Array<UserType>;
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
  totalUsers: number;
  pageSize: number;
  successFollowThunk: (isFetching: boolean, userId: number) => void;
  successUnfollowThunk: (isFetching: boolean,userId: number) => void;
  followingInProgress: Array<number>;
  isFetching: boolean
};

const Users: FC<PropsType> = ({
  users,
  currentPage,
  setCurrentPage,
  totalUsers,
  pageSize,
  successFollowThunk,
  successUnfollowThunk,
  followingInProgress,
                                isFetching
}) => {
  const defaultPhoto = "https://image.freepik.com/free-vector/_9385-36.jpg";

  const onFollow = (userId: number) => {
    successFollowThunk(isFetching, userId);
  };

  const onUnfollow = (userId: number) => {
    successUnfollowThunk(isFetching, userId);
  };

  return (
    <div className={styles.users}>
      <Paginator
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={totalUsers}
        pageSize={pageSize}
      />

      <div className={styles.usersList}>
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            defaultPhoto={defaultPhoto}
            followingInProgress={followingInProgress}
            onFollow={onFollow}
            onUnfollow={onUnfollow}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
