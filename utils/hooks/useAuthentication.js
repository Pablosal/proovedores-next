import { useEffect, useState } from 'react';
import {newFirebase } from '../context/index'
const useAuthentication = () => {
    const [user, setUser] = useState();
    useEffect(()=>{
        const unsubscribe = newFirebase.auth.onAuthStateChanged((user)=>{
            user ? setUser(user) : setUser(null)
        })

        return ()=>unsubscribe();
    },[])
    
    return user ?  user : null 
}
 
export default useAuthentication;