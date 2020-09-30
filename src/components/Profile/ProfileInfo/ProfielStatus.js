import React, { useEffect, useState } from "react";

import styles from "./profileStatus.module.scss";

const ProfileStatus = ({ status, updateProfileStatusThunk }) => {
  const [editMode, setEditMode] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    setNewStatus(status);
  }, [status]);

  const activeMode = () => {
    setEditMode(true);
  };

  const deactiveMode = () => {
    setEditMode(false);
    updateProfileStatusThunk(newStatus);
  };

  const handleChange = ({ target }) => {
    setNewStatus(target.value);
  };

  return (
    <div className={styles.profileStatus}>
      {!editMode ? (
        <h4 onDoubleClick={activeMode}>{status || "No Status"}</h4>
      ) : (
        <input
          autoFocus={true}
          onBlur={deactiveMode}
          value={newStatus}
          type="text"
          placeholder={status}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default ProfileStatus;
