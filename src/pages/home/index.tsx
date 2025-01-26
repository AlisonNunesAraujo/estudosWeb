import "./styles.css";
import Header from "../../components/Header";
import { useContext, useState } from "react";
import { AuthContext } from "../../contextApi";
import { toast } from "react-toastify";
export default function Home() {
  const { renderLista, AddTrilha, Deletar } = useContext(AuthContext);

  const [nomeTrilha, setNometrilha] = useState("");
  const [conteudo, setConteudo] = useState("");

  function Add() {
    if (conteudo === "" || nomeTrilha === "") {
      toast.info("Os campos são obrigatorios");
      return;
    }
    AddTrilha({ conteudo, nomeTrilha });
    setConteudo("");
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
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
          />
          <button onClick={Add}>Adicionar</button>
        </div>

        <div className="areaRender">
          {renderLista?.map((item) => (
            <button className="itemMap">
              <h2>{item.nomeTrilha}</h2>
              <h4>{item.conteudo}</h4>
              <button onClick={() => Excluir(item.uid)}>Excluir</button>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
