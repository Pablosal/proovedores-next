import { useState } from "react";
import styles from "./Backdrop.module.css";
const Backdrop = (props) => {

  return (
    <div
      onClick={props.handleModal}
      style={{ display: `${props.isOpen  ? "block" : "none"}` }}
      className={styles.backdrop}
    ></div>
  );
};

export default Backdrop;
