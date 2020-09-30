import React, { useState } from "react";

import styles from "./profileInfo.module.scss";
import Loader from "../../common/Loader";
import ProfileStatus from "./ProfielStatus";
import ProfileData from "./ProfileData";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({
  profile,
  status,
  updateProfileStatusThunk,
  isOwner,
  saveProfilePhotoThunk,
  saveProfileThunk,
}) => {
  const defaultAvatar = "https://image.freepik.com/free-vector/_9385-36.jpg";
  const [editMode, setEditMode] = useState(false);

  const handleEditProfile = () => setEditMode(true);

  const onMainPhotoSelected = ({ target }) => {
    if (target.files.length) {
      saveProfilePhotoThunk(target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    saveProfileThunk(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div className={styles.profileInfo}>
      <div>
        <img
          className={styles.mainBg}
          src="https://i.redd.it/ww9ztch1fei41.png"
          alt="background"
        />
      </div>
      <ProfileStatus
        status={status}
        updateProfileStatusThunk={updateProfileStatusThunk}
      />

      {!profile ? (
        <Loader />
      ) : (
        <div className={styles.description}>
          <img src={profile.photos.small || defaultAvatar} alt="avatar" />
          {isOwner && (
            <input
              type="file"
              accept="image/*"
              onChange={onMainPhotoSelected}
            />
          )}
          {editMode ? (
            <ProfileDataForm
              initialValues={profile}
              profile={profile}
              isOwner={isOwner}
              onSubmit={onSubmit}
            />
          ) : (
            <ProfileData
              profile={profile}
              isOwner={isOwner}
              handleEditProfile={handleEditProfile}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
