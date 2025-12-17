import React, { useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { auth } from '../../../Firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';


const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [user, setUser]=useState(null);
     const [loading, setLoading] = useState(true);

     const registerUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

     const signInUser =(email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    };

    const signInGoogle =()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    };

    const authInfo ={
           user,
           loading,
           registerUser,
           signInUser,
           signInGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
           {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;