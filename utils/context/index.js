import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyCDEuCcgQewh4E4F0e6j6ottB5TRoKZrSk",
  authDomain: "prooveedore.firebaseapp.com",
  projectId: "prooveedore",
  storageBucket: "prooveedore.appspot.com",
  messagingSenderId: "200539712656",
  appId: "1:200539712656:web:b6f96c8ea41d06311cfc15",
};
// Initialize Firebase

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      firebase.firestore().settings({
        ignoreUndefinedProperties: true,
      });
    }
    this.db = firebase.firestore;
    this.auth = firebase.auth();
    this.storage = firebase.storage();
  }
  deslogearse() {
    this.auth.signOut().then(() => localStorage.removeItem("userinfo"));
  }
  async crearUsuarioConEmail(info, password) {
    const { email, nombre, proovedor } = info;
    try {
      //Crear usuario
      await this.auth.createUserWithEmailAndPassword(email, password);
      const user = this.auth.currentUser;
      //Actualizar Perfil de Firebase
      await user.updateProfile({
        displayName: nombre,
      });

      //Añadir info a BD
      await this.añadirUsuarioABaseDeDatos(user.uid, info);
    } catch (error) {
      console.error({ error });
    }
  }
  async iniciarSesion(email, password) {
    await this.auth.signInWithEmailAndPassword(email, password);
  }
  async añadirUsuarioABaseDeDatos(id, info) {
    await this.db().collection("users").doc(id).set(info);
  }

  async añadirFotoDeProducto(image, userId, name) {
    try {
      await this.storage.ref(`users/${userId}/${name}_profile.jpg`).put(image);
    } catch (error) {
      console.error(error);
    }
  }
  async actualizarProductosBD(id, form, url, tipoDeProductos) {
    const productRef = this.db().collection("productos");
    try {
      if (!productRef.doc(id).exists) {
        await productRef.doc(id).set({
          tipoDeProductos: tipoDeProductos,
          array: this.db.FieldValue.arrayUnion({
            ...form,
            image: url,
          }),
        });
      } else {
        await productRef.doc(id).update({
          array: this.db.FieldValue.arrayUnion({
            ...form,
            image: url,
          }),
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  async crearNuevoDocumentoDeProducto(nombreColleccion,data,imageData){
    try { 
      await this.db().collection(nombreColleccion).add({...data,imageData})
    } catch (error) {
      console.error(error);
    }
  }
}
export const newFirebase = new Firebase();
