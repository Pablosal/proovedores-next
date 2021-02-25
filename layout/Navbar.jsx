import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { firebaseContext } from "../utils/context/contextFirebase";
import { newFirebase } from "../utils/context";
import styles from './Navbar.module.css'
const Navbar = () => {
  const { user, profileInfo } = useContext(firebaseContext);
  const handleSignOut = () => {
    newFirebase.deslogearse();
  };
  return (
    <nav
    className={styles.nabvar}
     
    >
      <div
        className={styles.navbarMin}
      >
        <Link href="/">Inicio</Link>
        {!user ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Registrarse</Link>
          </>
        ) : (
          <>
            <Link href="/mi_perfil">Ver Mi Perfil</Link>
            {profileInfo && profileInfo.proovedor === "true" && (
              <Link href="/nuevo_producto">Agregar Nuevo Producto</Link>
            )}
            <button onClick={handleSignOut}>Deslogearse</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
