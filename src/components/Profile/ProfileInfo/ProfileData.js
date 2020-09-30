import React from "react";

const ProfileData = ({ profile, isOwner, handleEditProfile }) => {
  return (
    <div>
      {isOwner && <button onClick={handleEditProfile}>Edit Profile</button>}
      <p>Full Name: {profile.fullName}</p>
      <p>About me: {profile.aboutMe}</p>
      <p>Looking for a job: {profile.lookingForAJob ? "Yes" : "No"}</p>
      {profile.lookingForAJob && (
        <p>Job description: {profile.lookingForAJobDescription}</p>
      )}
      <div>
        <h2>Contacts:</h2>
        {Object.entries(profile.contacts).map(([key, value]) => (
          <p key={key}>
            <span>{key}</span>:{" "}
            <a href={value} target="_blank" rel="noopener noreferrer">
              {value}
            </a>
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProfileData;
