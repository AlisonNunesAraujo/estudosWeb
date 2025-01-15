import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contextApi";


export default function SigIn() {
  const navigation = useNavigate();
  const {Login} = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


  async function Entrar(e: any){
    e.preventDefault();
    Login({email,senha})
  }

  return (
    <div className="conteiner">
      <form>
        <h2 className="Title">Bem vindo!</h2>
        <input
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button onClick={(e) => Entrar(e)}>Acessar</button>
        <button onClick={() => navigation("/SigOut")}>Criar conta!</button>
      </form>

      <div>
        <h2>animation</h2>
      </div>
    </div>
  );
}
