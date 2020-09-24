import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import ProfileInfo from "./ProfileInfo";
import MyPosts from "./MyPosts";
import {
  getProfileStatusThunkCreator,
  getProfileThunkCreator,
  updateProfileStatusThunkCreator,
} from "../../redux/profileReducer";
import { getProfile, getStatus } from "../../redux/profileSelector";
import { getAuthorizedUserId, getIsAuth } from "../../redux/authSelector";

import styles from "./profile.module.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { profileId } = useParams();

  const { profile, status, authorizedUserId, isAuth } = useSelector(
    (state) => ({
      profile: getProfile(state),
      status: getStatus(state),
      authorizedUserId: getAuthorizedUserId(state),
      isAuth: getIsAuth(state),
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
    userId ? getProfileThunk(userId) : history.push("/login");
  }, [history, getProfileThunk, userId]);

  useEffect(() => {
    userId ? getProfileStatusThunk(userId) : history.push("/login");
  }, [history, getProfileStatusThunk, userId, status]);

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
