import "./style.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useContext } from "react";
import { AuthContext } from "../../contextApi";

export default function SigOut() {
  const { CreateUser } = useContext(AuthContext);

  const navigation = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function Criar(e: any) {
    e.preventDefault();
    CreateUser({ email, senha });
  }

  return (
    <div className="conteiner">
      <form>
        <h2 className="Title">Crie sua conta!</h2>
        <input
          placeholder="Seu E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button onClick={(e) => Criar(e)}>Criar</button>
        <button onClick={() => navigation("/")}>Voltar</button>
      </form>

      <div>
        <h2>Animation</h2>
      </div>
    </div>
  );
}
