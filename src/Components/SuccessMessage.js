import React from "react";
import styles from "../Assets/css/success.module.css";

const SuccessMessage = ({ message }) => {
  return (
    <div className={styles.success}>
      <p>{message}</p>
    </div>
  );
};

export default SuccessMessage;