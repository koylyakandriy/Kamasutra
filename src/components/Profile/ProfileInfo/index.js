import React from "react";

import styles from "./profileInfo.module.scss";
import Loader from "../../common/Loader";
import ProfileStatus from "./profielStatus";

const ProfileInfo = ({
  profile,
  status,
  updateProfileStatusThunk
}) => {
  const defaultAvatar = "https://image.freepik.com/free-vector/_9385-36.jpg";
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
          <div>
            <p>Full Name: {profile.fullName}</p>
            <p>About me: {profile.aboutMe}</p>
            <div>
              Contacts:
              {Object.entries(profile.contacts).map(([key, value]) => (
                <p key={key}>
                  <span>{key}</span>: <span>{value}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
