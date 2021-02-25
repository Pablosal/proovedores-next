import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./ProviderMiniLayout.module.css";
import Backdrop from "./modal/Backdrop";
import Modal from "./modal/Modal";
const ProviderMiniLayout = ({ id, p, image }) => {
  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <div
      style={{
        width: "350px",
        height: "150px",
        boxShadow: " 0px 0px 3px 1px rgba(0,0,0,0.75)",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        margin: "5px",
      }}
    >
      <Backdrop isOpen={open} handleModal={handleModal}></Backdrop>
      <Modal
        email={p.email}
        name={p.nombre}
        isOpen={open}
        handleModal={handleModal}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "auto",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "black", textAlign: "center" }}>Region</h2>

          <p>{p.region}</p>
          <h2 style={{ color: "black", textAlign: "center" }}>Ciudad</h2>
          <p>{p.ciudad}</p>
        </div>
      </Modal>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h4 style={{ textAlign: "center", color: "black" }}>
            <Link href={`/profiles/[name]`} as={`/profiles/${id}`}>
              <a>{p.nombre}</a>
            </Link>
          </h4>
          <h5 style={{ textAlign: "center" }}>
            {p.region},{p.ciudad}
          </h5>
        </div>
        <button
          onClick={() => setOpen(!open)}
          style={{ color: "black", border: "1px solid black" }}
        >
          Contactar
        </button>
      </div>
    </div>
  );
};

export default ProviderMiniLayout;
