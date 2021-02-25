import React, { useContext, useState } from "react";
import useStorage from "../utils/hooks/useStorage";
import Layout from "../layout/Layout";
import { newFirebase } from "../utils/context";
import { firebaseContext } from "../utils/context/contextFirebase";
import { handleChange } from "../utils/functs/handleFunctions";
import frutos from "../utils/info/frutos.json";
import { useRouter } from "next/router";
const NuevoProducto = () => {
  const { user, profileInfo } = useContext(firebaseContext);
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    cantidad: "",
    tipo: "Almendras",
    bossId: user.uid,
    proovedor: profileInfo.nombre,
    email: profileInfo.email,
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const { url } = useStorage(file);
  console.log(profileInfo);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(url);
    newFirebase.actualizarProductosBD(
      user.uid,
      form,
      url,
      profileInfo.productos
    );
    newFirebase.añadirFotoDeProducto(file, user.uid, form.nombre);
    newFirebase.crearNuevoDocumentoDeProducto(form.tipo, form, url);
    router.push("/");
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "400px",
          padding: "15px",
          margin: "20px auto 0px auto",
          backgroundColor: "#182E49",
          color: "white",
        }}
      >
        <h2 style={{ color: "white", textAlign: "center" }}>
          Agrega Un Nuevo Producto
        </h2>
        <hr style={{ margin: "15px", width: "90%" }} />
        <div>
          <label htmlFor="image">Añade una imagen de tu producto</label>
          <input
            required
            type="file"
            name="image"
            id="image"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="productForm">
          <label htmlFor="nombre">Nombre</label>
          <input
            onChange={(e) => handleChange(e, form, setForm)}
            type="text"
            name="nombre"
            id="nombre"
            value={form.nombre}
          />
        </div>
        <div className="productForm">
          <label htmlFor="descripcion">Descripcion</label>
          <textarea
            onChange={(e) => handleChange(e, form, setForm)}
            name="descripcion"
            id="descripcion"
            cols="30"
            rows="10"
            value={form.descripcion}
          ></textarea>
        </div>
        <div className="productForm">
          <label htmlFor="precio">Precio</label>
          <input
            required
            type="number"
            name="precio"
            id="precio"
            value={form.precio}
            onChange={(e) => handleChange(e, form, setForm)}
          />
        </div>
        <div className="productForm">
          <label htmlFor="precio">Cada x Productos</label>
          <input
            required
            type="number"
            name="cantidad"
            id="cantidad"
            value={form.cantidad}
            onChange={(e) => handleChange(e, form, setForm)}
          />
        </div>
        <div>
          <div className="productForm">
            <label htmlFor="tipo">Que vas a Vender?</label>
            <select
              required
              name="tipo"
              id="tipo"
              value={form.tipo}
              style={{ padding: "5px" }}
              onChange={(e) => handleChange(e, form, setForm)}
            >
              {frutos &&
                frutos.Categorias.map((fruto) => (
                  <option key={fruto} value={fruto}>
                    {fruto}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </Layout>
  );
};

export default NuevoProducto;
