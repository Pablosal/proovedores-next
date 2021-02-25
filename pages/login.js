import { useRouter } from "next/router";
import React, { useState } from "react";
import Layout from "../layout/Layout";
import { newFirebase } from "../utils/context";
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { email, password } = form;
  const handleChange = (e) => {
    setForm({ [e.target.name]: e.target.value });
  };
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    newFirebase.iniciarSesion(email, password);
    router.push("/");
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit}
      style={{
        display:"grid",
        width:"500px",
        margin:"0 auto 0 auto",
        boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.75)",
        padding:"10px",
        backgroundColor:"#182E49",
        color:"white"
      }}
      >
        <div className="productForm">
          <label htmlFor="email">Email</label>
          <input
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
            type="text"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Iniciar Sesion</button>
      </form>
    </Layout>
  );
};

export default Login;
