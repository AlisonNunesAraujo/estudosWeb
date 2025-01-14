import "./style.css";
import { useNavigate } from "react-router-dom";
export default function SigIn() {
  const navigation = useNavigate();

  return (
    <div className="conteiner">
      <form>
        <h2>Bem vindo!</h2>
        <input placeholder="E-Mail" />
        <input placeholder="Senha" />
        <button>Acessar</button>
        <button onClick={() => navigation("/SigOut")}>Criar conta!</button>
      </form>

      <div>
        <h2>animation</h2>
      </div>
    </div>
  );
}
