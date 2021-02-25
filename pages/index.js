import { useContext, useEffect, useState } from "react";
import { newFirebase } from "../utils/context";
import { firebaseContext } from "../utils/context/contextFirebase";
import ProviderMiniLayout from "../layout/ProviderMiniLayout";
import ProductDisplayCard from "../layout/ProductDisplayCard";
import Backdrop from "../layout/modal/Backdrop";
import Layout from "../layout/Layout";
import frutos from "../utils/info/frutos.json";
import Modal from "../layout/modal/Modal";
import Image from "next/image";
export default function Home() {
  const [buscar, setBuscar] = useState("Cacahuate");
  const { profileAvatar } = useContext(firebaseContext);
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
useEffect(()=>{ console.log(usuarios);},[usuarios])
  useEffect(() => {
   
    newFirebase
      .db()
      .collection(buscar)
      .get()
      .then((docs) => {
        setProductos(docs.docs.map((a) => ({ ...a.data(), id: docs.docs.Id })));
      })
      .catch((err) => console.error(err));

    newFirebase.db().collection("users").where("proovedor", "==", "true");
    newFirebase
      .db()
      .collection("users")
      .where("productos", "==", buscar)
      .get()
      .then((docs) => {
        // console.log(docs.docs.map((documento) => documento.id));
        setUsuarios(docs.docs.map((a) => ({ ...a.data(), id: a.id })));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [buscar]);
  return (
    <Layout>
      <div style={{width:"100%", overflowX:"hidden"}}>
        <div
          style={{
            height: "100vh",
            background:
              "url(/images/pexel-chen.jpg) no-repeat center fixed ",
            backgroundSize: "cover",
            overflowX: "hidden",
            maxWidth: "100vw",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(1,1,1,0.7)",
              height: "100%",
              position: "absolute",
              display: "flex",
              left:0,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1 style={{ textAlign: "center", margin: "15px", color: "white" }}>
              ¿Iniciando un negocio pero no encuentras proviciones? Encuentra
              los Mejores Proovedores De Fruto Secos Nacionales
            </h1>
            <form className="productForm">
              <select
                name="productos"
                id="productos"
                value={buscar}
                style={{ padding: "5px" }}
                onChange={(e) => setBuscar(e.target.value)}
              >
                {frutos &&
                  frutos.Categorias.map((fruto) => (
                    <option key={fruto} value={fruto}>
                      {fruto}
                    </option>
                  ))}
              </select>
            </form>
          </div>
        </div>
        <h2
          style={{
            padding: "8px",
            color: "black",
            textAlign: "center",
            margin: "15px",
          }}
        >
          Proovedores de {buscar ? `${buscar}` : "Generales"}
        </h2>
        <div
          style={{
            width: "100vw",
            padding: "0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {productos.length ? (
            productos.map((p) => (
              <ProductDisplayCard key={p.nombre} descripcion={p} />
            ))
          ) : (
            <h1>No hay productos</h1>
          )}
        </div>

        <h2
          style={{
            margin: "10px",
            padding: "8px",
            color: "black",
            textAlign: "center",
          }}
        >
          Proovedores de {buscar ? `${buscar}` : "Generales"}
        </h2>
        <div
          style={{
            width: "100vw",
            padding: "0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {usuarios ? (
            usuarios.map((p) => (
              <ProviderMiniLayout
                key={p.id}
                id={p.id}
                p={p}
                image={profileAvatar}
              ></ProviderMiniLayout>
            ))
          ) : (
            <h1>Cargando...</h1>
          )}
        </div>
      </div>
    </Layout>
  );
}
