import React from "react";
import styles from "../Assets/css/dashboard.module.css";
import { ReactComponent as UserProfileIcon } from "../Assets/img/userProfile.svg";

function NewUserCard({ name, info, customIcon, onClick }) {
  return (
    <div className={styles.user} onClick={onClick}>
       <span>{customIcon || <UserProfileIcon />}</span>
      <h2>{name}</h2>
      <p>{info}</p>
    </div>
  );
}

export default NewUserCard;
