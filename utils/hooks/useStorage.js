import { useContext, useEffect, useState } from "react";
import { newFirebase } from "../context";
import { firebaseContext } from "../context/contextFirebase";
import useAuthentication from "./useAuthentication";

const useStorage = (file) => {
  const {user} = useContext(firebaseContext)
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (user && file) {
      let storageRef = newFirebase.storage.ref(`users/${user.uid}/avatar.png`);
      console.log(storageRef);
    storageRef.put(file).on(
        "state_changed",
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        (err) => {
          setError(err);
        },
        async () => {
         
          const url = await storageRef.getDownloadURL();
          setUrl(url);
        }
      );
    }
  }, [file]);
  return { progress, url, error };
};
export default useStorage;
