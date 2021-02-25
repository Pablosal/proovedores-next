import React from "react";
import Navbar from "./Navbar";
import Head from "next/head";

const Layout = (props) => {
  return (
    <div  >
      <Head>
        <title>Encuentra proovedores para iniciar tu negocio</title>
      </Head>
      <Navbar style={{marginBottom:"10px"}}></Navbar>
      <main style={{display:"flex",justifyContent:"center", alignItems:"center",flexDirection:"column"}}>{props.children}</main>
    </div>
  );
};

export default Layout;
