import { createContext, useEffect, useState } from "react";
import React from "react";
import useAuthentication from "../hooks/useAuthentication";

import { newFirebase } from ".";

export const firebaseContext = createContext(null);
const FirebaseContext = (props) => {
  const user = useAuthentication();
  const [profileInfo, setProfileInfo] = useState();
  useEffect(() => {
    if (user) {
      console.log(user);
      newFirebase.db()
        .collection("users")
        .doc(user.uid)
        .get()
        .then((userInfo) => {
          localStorage.setItem(
            "userinfo",
            JSON.stringify({ ...userInfo.data(), id: user.uid })
          );
          setProfileInfo(userInfo.data());
        });
    } else {
     return
    }
  }, [user]);

  return (
    <firebaseContext.Provider value={{ user, profileInfo }}>
      {props.children}
    </firebaseContext.Provider>
  );
};

export default FirebaseContext;
