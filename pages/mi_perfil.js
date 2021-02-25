import React, { useContext, useEffect, useState } from "react";
import Layout from "../layout/Layout";
import ProductCard from "../layout/ProductCard";
import { newFirebase } from "../utils/context";
import styles from "../styles/mi_perfil.module.css";
import { firebaseContext } from "../utils/context/contextFirebase";
import cities from "../utils/info/cities.json";
import Link from "next/link";

const miPerfil = () => {
  const { user, profileInfo } = useContext(firebaseContext);
  const [productos, setProductos] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [localProfileInfo, setLocalProfileInfo] = useState({
    email: "",
    proovedor: "",
    region: "",
    ciudad: "",
  });
  const handleChange = (e) =>
    setLocalProfileInfo({
      ...localProfileInfo,
      [e.target.name]: e.target.value,
    });
  useEffect(() => {
    if (profileInfo) {
      setLocalProfileInfo({
        email: profileInfo.email,
        region: profileInfo.region,
        ciudad: profileInfo.ciudad,
        proovedor: profileInfo.proovedor === "true" ? true : false,
      });
      newFirebase
        .db()
        .collection("productos")
        .doc(user.uid)
        .get()
        .then((docs) => setProductos(docs.data()));
    }
  }, [profileInfo]);
  useEffect(() => {
    console.log(productos);
  }, [productos]);
  const deleteItem = ()=>{
    newFirebase.db().collection("productos").doc(profileInfo.id).delete()

  }
  const handleEditing = () => {
    setIsEditing(!isEditing);
  };
  const handleSave = () => {
    newFirebase
      .db()
      .collection("users")
      .doc(user.uid)
      .update({
        email: localProfileInfo.email,
        proovedor: localProfileInfo.proovedor === "Si" ? true : false,
        region: localProfileInfo.region,
        ciudad: localProfileInfo.ciudad,
      });
    localStorage.setItem("userinfo", JSON.stringify(localProfileInfo));
    setIsEditing(false);
  };
  return (
    <Layout>
      {profileInfo ? (
        <div style={{ color: "white" }}>
          <h1 className={styles.titleCenter}>Hola {profileInfo.nombre}</h1>

          <div className={styles.divContainer}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ color: "rgba(255,255,255,0.8)" }}>
                Informacion de Usuario
              </h2>
              <button onClick={handleEditing}>Editar</button>
            </div>
            <hr />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                alignItems: "start",
              }}
            >
              <div className={styles.divContainerSubSection}>
                <h4>Email</h4>
                {isEditing ? (
                  <input
                    type="text"
                    value={localProfileInfo.email}
                    name="email"
                    onChange={handleChange}
                  />
                ) : (
                  <span className="spanContainer">{profileInfo.email}</span>
                )}
              </div>
              <div className={styles.divContainerSubSection}>
                <h4>Proovedor</h4>
                {isEditing ? (
                  <select
                    name="proovedor"
                    id="proovedor"
                    name="proovedor"
                    onChange={handleChange}
                  >
                    <option
                      value={false}
                      selected={!localProfileInfo.proovedor}
                    >
                      No
                    </option>
                    <option value={true} selected={localProfileInfo.proovedor}>
                      Si
                    </option>
                  </select>
                ) : (
                  <span className="spanContainer">
                    {profileInfo.proovedor ? "Si" : "No"}
                  </span>
                )}
              </div>
              {localProfileInfo.proovedor && (
                <>
                  <div className={styles.divContainerSubSection}>
                    <h4>Region</h4>
                    {isEditing ? (
                      <div className="productForm">
                        <label htmlFor="region">Region</label>
                        <select
                          name="region"
                          id="region"
                          className="select-css"
                          value={localProfileInfo.region}
                          onChange={handleChange}
                        >
                          {cities.regiones.map((region) => (
                            <option
                              name="region"
                              key={region.region}
                              value={region.region}
                            >
                              {region.region}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <span className="spanContainer">
                        {profileInfo.region}
                      </span>
                    )}
                  </div>
                  <div className={styles.divContainerSubSection}>
                    <h4>Ciudad</h4>
                    {isEditing ? (
                      <div className="productForm">
                        <label htmlFor="ciudad">Ciudad</label>
                        <select
                          name="ciudad"
                          id="ciudad"
                          value={[localProfileInfo.region].ciudad}
                          className="select-css"
                          onChange={handleChange}
                        >
                          {localProfileInfo.region &&
                            cities.regiones
                              .filter(
                                (lugar) =>
                                  lugar.region === localProfileInfo.region
                              )[0]
                              .comunas.map((comuna) => (
                                <option key={comuna} value={comuna}>
                                  {comuna}
                                </option>
                              ))}
                        </select>
                      </div>
                    ) : (
                      <span className="spanContainer">
                        {profileInfo.ciudad}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
            {isEditing ? <button onClick={handleSave}>Guardar</button> : null}
            <hr />
            <h2 style={{ color: "rgba(255,255,255,0.8)" }}>Todos tus productos</h2>
            {productos ? (
              <>
               
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  {productos.array.map((d) => (
                    <ProductCard isInProfile={true} key={d.precio + 100} userId={user.uid} p={d}></ProductCard>
                  ))}
                </div>
              </>
            ) : (
              <h3 style={{ color: "white" }}>
                No tienes ningun producto te gustaria
                <Link href="/nuevo_producto">
                  <a>vender productos?</a>
                </Link>
              </h3>
            )}
          </div>
        </div>
      ) : (
        <h1>Cargando....</h1>
      )}
    </Layout>
  );
};

export default miPerfil;
