import { createContext, ReactNode, useState } from "react";
import { auth } from "../firebase/firebseConection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({} as Users);

type Users = {
  user: DadosUser;
  CreateUser: (info: DadosCreate) => Promise<void>;
  authLoading: boolean;
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

  const authLoading = !!user.email && !!user.uid;

  const naviagtion = useNavigate();

  async function CreateUser({ email, senha }: DadosCreate) {
    try {
      const data = await createUserWithEmailAndPassword(auth, email, senha);

      setUser({
        email: data.user.email,
        uid: data.user.uid,
      });
      alert('conta criada');
      naviagtion('/')
    } catch {
      alert("erro");
    }
  }

  return (
    <AuthContext.Provider value={{ user, CreateUser, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
