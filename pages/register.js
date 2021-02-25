import React, { useEffect, useState } from "react";
import { newFirebase } from "../utils/context";
import { useRouter } from "next/router";
import Layout from "../layout/Layout";
import cities from "../utils/info/cities.json";
import frutos from "../utils/info/frutos.json";
const Register = () => {
  const [region, setRegion] = useState();
  const [ciudad, setCiudad] = useState();
  const [password, setPassword] = useState();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    region: "Arica y Parinacota",
    ciudad: "Arica",
    proovedor: false,
    productos:"",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setForm({ ...form, region: region, ciudad: ciudad });
  }, [region, ciudad]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    newFirebase.crearUsuarioConEmail(form, password);
    router.push("/");
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
        style={{
          display:"grid",
          width:"500px",
          margin:"0 auto 0 auto",
          backgroundColor:"#182E49",
          color:"white",
          boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.75)",
          padding:"10px",
          alignContent:"center"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems:"center",
            flexDirection: "row",
          }}
        >
          <div>
            <label htmlFor="proovedor">Proovedor</label>
            <input
            required
              type="radio"
              name="proovedor"
              id="proovedor"
              value={"true"}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="consumidor">Consumidor</label>
            <input
            required
              type="radio"
              name="proovedor"
              id="consumidor"
              value={"false"}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="productForm">
          <label htmlFor="nombre">Nombre</label>
          <input
          required
            type="nombre"
            name="nombre"
            id="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="productForm">
          <label htmlFor="email">Email</label>
          <input
          required
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="productForm">
          <label htmlFor="password">Contraseña</label>
          <input
          required
            type="password"
            name="password"
            
            id="password"
            value={form.password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {form.proovedor === "true" && (
          <>
            <div className="productForm">
              <label htmlFor="region">Region</label>
              <select
                name="region"
                id="region"  className="select-css"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
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
            <div className="productForm">
              <label htmlFor="ciudad">Ciudad</label>
              <select
                name="ciudad"
                id="ciudad"
                value={ciudad}  className="select-css"
                onChange={(e) => setCiudad(e.target.value)}
              >
                {region &&
                  cities.regiones
                    .filter((lugar) => lugar.region === region)[0]
                    .comunas.map((comuna) => (
                      <option key={comuna} value={comuna}>
                        {comuna}
                      </option>
                    ))}
              </select>
            </div>
            <div className="productForm">
              <label htmlFor="productos">Productos</label>
              <select
              className="select-css"
                name="productos"
                id="productos"
                value={form.productos}
                onChange={handleChange}
              >
                {frutos &&
                  frutos.Categorias.map((fruto) => (
                    <option key={fruto} value={fruto}>
                      {fruto}
                    </option>
                  ))}
              </select>
            </div>
          </>
        )}

        <button type="submit">Registrarse</button>
      </form>
    </Layout>
  );
};

export default Register;
