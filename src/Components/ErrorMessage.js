import React from "react";
import styles from "../Assets/css/error.module.css";

const ErrorMessage = ({ message }) => {
  return (
    <div className={styles.error}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;