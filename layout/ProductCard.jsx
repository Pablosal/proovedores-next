import React, { useEffect } from "react";
import { newFirebase } from "../utils/context";
const ProductCard = ({ p, isInProfile, userId }) => {
  useEffect(() => {
    console.log(userId);
  }, [userId]);
  const deleteItem = (e) => {
    newFirebase
      .db()
      .collection("productos")
      .doc(userId)
      .update({
        array: newFirebase.db.FieldValue.arrayRemove(p),
      });
    newFirebase.db().collection(p.tipo).doc(userId).delete();
  };
  return (
    <div
      style={{
        boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        maxWidth: "300px",
        margin: "auto",
        textAlign: "center",
        fontFamily: "arial",
        borderRadius: "15px",
        backgroundColor: isInProfile ? "white" : "#182E49",
      }}
    >
      <div>
        <img width="100%" src={p.image} alt="" />
        <h3>{p.nombre}</h3>
      </div>
      <div>
        <p>{p.descripcion}</p>
        <span
          style={{
            color: "grey",
            fontSize: "22px",
          }}
        >
          {p.precio}
        </span>
        {isInProfile ? (
          <button
            onClick={deleteItem}
            style={{
              border: "none",
              outline: "0",
              padding: "12px",
              color: "white",
              backgroundColor: "red",
              textAlign: "center",
              cursor: "pointer",
              width: "90%",
              fontSize: "18px",
            }}
          >
            Eliminar
          </button>
        ) : (
          <button
            style={{
              border: "none",
              outline: "0",
              padding: "12px",
              color: "white",
              backgroundColor: "#000",
              textAlign: "center",
              cursor: "pointer",
              width: "90%",
              fontSize: "18px",
            }}
          >
            Contactar
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
