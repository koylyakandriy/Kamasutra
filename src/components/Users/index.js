import React from "react";

import styles from "./users.module.scss";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = ({
  users,
  currentPage,
  setCurrentPage,
  totalUsers,
  pageSize,
  successFollowThunk,
  successUnfollowThunk,
  followingInProgress,
}) => {
  const defaultPhoto = "https://image.freepik.com/free-vector/_9385-36.jpg";

  const onFollow = (userId) => {
    successFollowThunk(userId);
  };

  const onUnfollow = (userId) => {
    successUnfollowThunk(userId);
  };

  return (
    <div className={styles.users}>
      <Paginator
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalUsers={totalUsers}
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
