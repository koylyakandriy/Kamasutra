import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProfileInfo from "./ProfileInfo";
import MyPosts from "./MyPosts";
import {
  getProfileStatusThunkCreator,
  getProfileThunkCreator,
  updateProfileStatusThunkCreator
} from "../../redux/profileReducer";

import styles from "./profile.module.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const id = 9713;
  const { profile, status } = useSelector(state => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
  }));

  const getProfileThunk = useCallback(
    id => {
      dispatch(getProfileThunkCreator(id));
    },
    [dispatch]
  );

  const getProfileStatusThunk = useCallback(
    userId => {
      dispatch(getProfileStatusThunkCreator(userId));
    },
    [dispatch]
  );

  const updateProfileStatusThunk = status =>
    dispatch(updateProfileStatusThunkCreator(status));

  useEffect(() => {
    getProfileThunk(id);
  }, [getProfileThunk, id]);

  useEffect(() => {
    getProfileStatusThunk(id);
  }, [getProfileStatusThunk, id, status]);

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
