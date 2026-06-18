
import { db } from "../firebase/Auth";
import { useAuth } from "../firebase/Auth";
import { useEffect } from "react";
import { doc,getDoc } from "firebase/firestore";
import { useState } from "react";
export default function Profile(){
  const {user}=useAuth();
  console.log(user);
  const [userData,setUserData]=useState({
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

  });

  useEffect(()=>{
    const fetchUserData=async()=>{
      const docRef=doc(db,"users",user.uid);
      const docSnap=await getDoc(docRef);
      if(docSnap.exists){
        console.log("Document data",docSnap.data());
      }else{
        console.log("Sorry,No such document exists!!");
      }
    }
    fetchUserData();
  },[]);
  return <>Welcome to Profile Page!!</>

}