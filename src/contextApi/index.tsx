import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebseConection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import { getDocs } from "firebase/firestore";
// import { collection } from "firebase/firestore";



export const AuthContext = createContext({} as Users);

type Users = {
  user: DadosUser;
  CreateUser: (info: DadosCreate) => Promise<void>;
  Login: (info: DadosCreate) => Promise<void>;
  signed: boolean;
};

type DadosUser = {
  email: string | null;
  uid: string | null | number;
};

export type ChildrenProps = {
  children: ReactNode;
};

type DadosCreate = {
  email: string;
  senha: string;
};

export function AuthProvider({ children }: ChildrenProps) {
  const [user, setUser] = useState<DadosUser>({
    email: "",
    uid: "",
  });

  const navigation = useNavigate();


  // useEffect(()=>{
  //   async function Rendle(){
  //     try{
  //       const ref = collection(db,'trilha')
  //     }
  //     catch{

  //     }
  //   }
  // },[])



  async function CreateUser({ email, senha }: DadosCreate) {
    try {
      const data = await createUserWithEmailAndPassword(auth, email, senha);

      setUser({
        email: data.user.email,
        uid: data.user.uid,
      });
      alert("conta criada");
    } catch {
      alert("erro");
    }
  }

  async function Login({ email, senha }: DadosCreate) {
    try {
      const data = await signInWithEmailAndPassword(auth, email, senha);

      setUser({ email: data.user.email, uid: data.user.uid });
      alert("ok");
      navigation("/Home");
    } catch {
      alert("erro");
    }
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, CreateUser, Login, user }}>
      {children}
    </AuthContext.Provider>
  );
}
