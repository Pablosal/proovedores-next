import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { newFirebase } from "../../utils/context";
import Layout from "../../layout/Layout";

const Profile = ({ datos }) => {
  const router = useRouter();
  const { name } = router.query;
  const getData = async () => {
    let datos = await newFirebase.db().collection("users").doc(name).get();

    let data = await datos.data();
    return await data;
  };
  useEffect(() => {
    const datitos = getData();
    console.log(datitos);
  }, []);
  const [profileUser, setProfileUser] = useState();
  const personalData = {
    nombre: "Jeremias",
    email: "jeremias@gmail.com",
    ciduad: "york",
  };
  if (datos) {
    return (
      <Layout>
        <div>
  
          <h1>Hola soy {datos.nombre}</h1>
          <div>
            <div>
              <p>
                Contactame por mi email
                <strong> {datos.email}</strong>
              </p>
            </div>
            <div>
              Negocios dentro de la ciuadad
              <strong> {datos.ciudad}</strong>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return <h1>Cargando</h1>;
  }
};
export async function getServerSideProps(context) {
  let { name } = context.query;
  let datos = await (
    await newFirebase.db().collection("users").doc(name).get()
  ).data();

  return { props: { datos } };
}
export default Profile;
