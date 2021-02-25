import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ProductDisplayCard.module.css";
import Backdrop from "./modal/Backdrop";
import Modal from "./modal/Modal";
const ProductDisplayCard = ({ descripcion }) => {
  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.displayCard}>
      {descripcion.imageData && (
        <Image
          className={styles.imageTemp}
          src={descripcion.imageData}
          width={144}
          height={144}
        ></Image>
      )}
      <div className={styles.displayPath}>
        <h2>{descripcion.nombre}</h2>

        <h2>
          {" "}
          ${descripcion.precio} Cada {descripcion.cantidad} Unidad{" "}
        </h2>
        <span>{descripcion.tipo}</span>
        <button onClick={() => setOpen(!open)}>Contactar</button>
      </div>
      <Backdrop isOpen={open} handleModal={handleModal}></Backdrop>
      <Modal
        email={descripcion.email}
        name={descripcion.nombre}
        isOpen={open}
        handleModal={handleModal}
      ></Modal>
    </div>
  );
};

export default ProductDisplayCard;
