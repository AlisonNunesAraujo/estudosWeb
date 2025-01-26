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
import { query, where, } from "firebase/firestore";
import { toast } from "react-toastify";

export type ChildrenProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as Users);

import { DadosUser, TrilhaProps, AddProps, Users } from "./types";

export function AuthProvider({ children }: ChildrenProps) {
  const [user, setUser] = useState<DadosUser>({
    email: "",
    uid: "",
  });
  const verificar = !!user?.email && !!user?.uid;

  const navigation = useNavigate();
  const [loading, setLoading] = useState<boolean | undefined>();
  const [renderLista, setRenderLista] = useState<TrilhaProps[]>();

  useEffect(() => {
    async function Rendle() {
      const ref = collection(db, "trilha");
      const queryOn = query(ref, where('uid', '==', user.uid));
      getDocs(queryOn).then((snapshot) => {
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

  async function CreateUser(data: any) {
    setLoading(true);
    try {
      const { email, senha } = data;
      await createUserWithEmailAndPassword(auth, email, senha);

      navigation("/");
      setLoading(false);
      toast.success("Conta crianda com sucesso!");
    } catch {
      toast.error("Algo deu errado!");
      setLoading(false);
    }
  }

  async function Login(data: any) {
    setLoading(true);
    try {
      const { email, senha } = data;
      const response = await signInWithEmailAndPassword(auth, email, senha);

      setUser({ email: response.user.email, uid: response.user.uid });
      navigation("/Home");
      toast("Bem vindo!");
      setLoading(false);
    } catch {
      toast.error("Algo deu errado");
      setLoading(false);
    }
  }

  async function AddTrilha({ nomeTrilha, conteudo }: AddProps) {
    setLoading(true);
    try {
      addDoc(collection(db, "trilha"), {
        conteudo: conteudo,
        nomeTrilha: nomeTrilha,
        uid: user.uid,
      });

      toast.success("Adicionado com sucesso!");
      setLoading(true);
    } catch {
      toast.error("Algo deu errado!");
      setLoading(false);
    }
  }

  async function Deletar(uid: string) {
    setLoading(true);
    try {
      const ref = doc(db, "trilha", uid);
      await deleteDoc(ref)
        .then(() => {
          toast.success("Item deletado");
        })

        .catch(() => {
          toast.error("Não foi possivel deletar o item!");
        });
      setLoading(false);
    } catch {
      toast("Algo deu errado");
      setLoading(false);
    }
  }

  async function Deslogar() {
    try {
      await signOut(auth).then(() => {
        toast.success("voce saiu da conta!");
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
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
