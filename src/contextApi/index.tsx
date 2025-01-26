import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebseConection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { ReactNode } from "react";


import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({} as Users);

import {
  DadosUser,
  DadosCreate,
  TrilhaProps,
  AddProps,
  Users,
} from "./types";

type ChildrenProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: ChildrenProps) {
  const [user, setUser] = useState<DadosUser>({
    email: "",
    uid: "",
  });
  const verificar = !!user?.email && !!user?.uid;

  const navigation = useNavigate();

  const [renderLista, setRenderLista] = useState<TrilhaProps[]>();

  useEffect(() => {
    async function Rendle() {
      const ref = collection(db, "trilha");

      getDocs(ref).then((snapshot) => {
        let lista: TrilhaProps[] = [];

        snapshot.forEach((doc) => {
          lista.push({
            conteudo: doc.data().conteudo,
            uid: doc.id,
            nomeTrilha: doc.data().nomeTrilha,
          });
        });

        setRenderLista(lista);
      });
    }
    Rendle();
  }, [AddTrilha]);

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
      navigation("/Home");
      alert("ok");
    } catch {
      alert("erro");
    }
  }

  async function AddTrilha({ nomeTrilha, conteudo }: AddProps) {
    try {
      const response = addDoc(collection(db, "trilha"), {
        conteudo: conteudo,
        nomeTrilha: nomeTrilha,
        uid: user.uid,
      });

      console.log(response);
      alert("ok");
    } catch {
      alert("orro");
    }
  }

  async function Deletar(uid: string) {
    try {
      const ref = doc(db, "trilha", uid);
      await deleteDoc(ref)
        .then(() => {
          alert("apagou");
        })

        .catch(() => {
          alert("deu erro");
        });
    } catch {
      alert("erro");
    }
  }

  async function Deslogar() {
    try {
      await signOut(auth).then(() => {
        alert("voce saiu da conta!");
        setUser({
          email: "",
          uid: "",
        });
      });
    } catch { }
  }

  return (
    <AuthContext.Provider
      value={{
        verificar,
        user,
        CreateUser,
        Login,
        renderLista,
        AddTrilha,
        Deletar,
        Deslogar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
