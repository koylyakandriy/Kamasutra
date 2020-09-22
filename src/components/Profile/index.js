import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProfileInfo from "./ProfileInfo";
import MyPosts from "./MyPosts";
import {
  getProfileStatusThunkCreator,
  getProfileThunkCreator,
  updateProfileStatusThunkCreator,
} from "../../redux/profileReducer";

import styles from "./profile.module.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const { profileId } = useParams();
  // const id = 9713;
  const { profile, status, authorizedUserId, isAuth } = useSelector(
    (state) => ({
      profile: state.profilePage.profile,
      status: state.profilePage.status,
      authorizedUserId: state.auth.userId,
      isAuth: state.auth.isAuth,
    })
  );

  const userId = profileId ? profileId : authorizedUserId;

  const getProfileThunk = useCallback(
    (id) => {
      dispatch(getProfileThunkCreator(id));
    },
    [dispatch]
  );

  const getProfileStatusThunk = useCallback(
    (id) => {
      dispatch(getProfileStatusThunkCreator(id));
    },
    [dispatch]
  );

  const updateProfileStatusThunk = (status) =>
    dispatch(updateProfileStatusThunkCreator(status));

  useEffect(() => {
    getProfileThunk(userId);
  }, [getProfileThunk, userId]);

  useEffect(() => {
    getProfileStatusThunk(userId);
  }, [getProfileStatusThunk, userId, status]);

  return (
    <section className={styles.profile}>
      <ProfileInfo
        profile={profile}
        status={status}
        updateProfileStatusThunk={updateProfileStatusThunk}
      />
      <MyPosts />
    </section>
  );
};

export default Profile;
