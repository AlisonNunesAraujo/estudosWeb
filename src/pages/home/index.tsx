import "./styles.css";
import Header from "../../components/Header";
import { useContext, useState } from "react";
import { AuthContext } from "../../contextApi";
import { toast } from "react-toastify";
export default function Home() {
  const { renderLista, AddTrilha, Deletar } = useContext(AuthContext);

  const [nomeTrilha, setNometrilha] = useState("");
  const [trilha, setTrilha] = useState("");

  function Add() {
    if (trilha === "" || nomeTrilha === "") {
      toast.info("Os campos são obrigatorios");
      return;
    }
    AddTrilha({ trilha, nomeTrilha });
    setTrilha("");
    setNometrilha("");
  }

  function Excluir(uid: string) {
    Deletar(uid);
  }

  return (
    <div className="conteinerHome">
      <Header />
      <div className="grupoConteudo">
        <div className="areaAdd">
          <h2 className="textAdd">Adicione uma trilha de estudos ou uma tarefa!</h2>
          <input
            placeholder="Titulo"
            value={nomeTrilha}
            onChange={(e) => setNometrilha(e.target.value)}
          />
          <input
            placeholder="Oque prentende estudar ou fazer?"
            value={trilha}
            onChange={(e) => setTrilha(e.target.value)}
          />
          <button onClick={Add}>Adicionar</button>
        </div>

        <div className="areaRender">
          {renderLista?.map((item) => (
            <button className="itemMap">
              <h2>{item.nomeTrilha}</h2>
              <h4>{item.trilha}</h4>
              <button onClick={() => Excluir(item.uid)}>Excluir</button>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
