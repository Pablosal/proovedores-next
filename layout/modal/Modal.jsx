import React, { useState } from "react";
import styles from "./Backdrop.module.css";
const Modal = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ display: `${props.isOpen ? "block" : "none"}` }}
      className={styles.modal}
    >
      <div className={styles.headModal}>
        <h1>{props.name}</h1>
        <span className={styles.closeButton} onClick={props.handleModal}>
          X
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems:"center"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h2 style={{ color: "black",textAlign:"center" }}>Email Contacto</h2>
          <p>{props.email}</p>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
