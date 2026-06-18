
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";
import { getFirestore,doc,setDoc,getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDtFB4NNrqMvqAVySmQ9bBYkXWXPttIrH0",
    authDomain: "sravanid-estore.firebaseapp.com",
    projectId: "sravanid-estore",
    storageBucket: "sravanid-estore.firebasestorage.app",
    messagingSenderId: "936837247376",
    appId: "1:936837247376:web:ef2dc6032349c0f674c315"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const AuthContext = createContext(null);
export const db=getFirestore(app);


export const AuthProvider = ({ children }) => {
    const authData = useProvideAuth();
    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext);

export default function useProvideAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const signUp = (email, password, displayName) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                console.log(user);
                await updateProfile(user, { displayName });
                await setDoc(doc(db,"users" ,user.uid),{
                    name:user.displayName,
                    email:user.email,
                    phone:"",
                    dob:"",
                    photoUrl:"",
                    emailVerified:"",
                    gender:"",

                    houseno:"",
                    street:"",
                    city:"",
                    state:"",
                    pincode:""

                })
                setUser(auth.currentUser);
                return auth.currentUser;
            })
            .catch((error) => {
                throw error;
            });
    }

    const logOut = () => {
        return signOut(auth).then(() => setUser(null)).catch((error) => {
            throw error;

        });
    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
            console.log(user);
            setUser(user);
            return user;
        }).catch((error) => {
            throw error;
        })
    }

    return {
        signUp,
        logOut,
        logIn,
        user
    }
};



