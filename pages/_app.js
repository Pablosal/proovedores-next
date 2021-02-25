import "../styles/globals.css";
import FirebaseContext from "../utils/context/contextFirebase";
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (

    <FirebaseContext>
      <Component {...pageProps} />
    </FirebaseContext>
  );
}

export default MyApp;
