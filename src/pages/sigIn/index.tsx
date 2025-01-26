import "./style.css";
import { useContext } from "react";
import { AuthContext } from "../../contextApi";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z
    .string()
    .nonempty("Esse campo é obrigatorio!")
    .email("Email invalido"),
  senha: z
    .string()
    .nonempty("Esse campo é obrigatorio!")
    .min(6, "Minimo de 6 letras ou numeros"),
});

export default function SigIn() {
  const { Login, loading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function Entrar(data: any) {
    Login(data);
  }

  return (
    <div className="conteiner">
      <form onSubmit={handleSubmit(Entrar)}>
        <h2 className="Title">Bem vindo!</h2>
        <input placeholder="E-Mail" {...register("email")} />
        <p>{errors.email?.message?.toString()}</p>
        <input placeholder="Senha" {...register("senha")} type="password" />
        <p>{errors.senha?.message?.toString()}</p>
        {loading ? (
          <button className="bntAcessar">carregando...</button>
        ) : (
          <button className="bntAcessar" type="submit">
            Acessar
          </button>
        )}
        <Link to="/SigOut">Criar conta!</Link>
      </form>

      <div className="areaApresentation">
        <h2>
          Seja organizado!<br /> Adicione tarefas, <br /> organize seus estudos,{" "}
          <br />
        </h2>
      </div>
    </div>
  );
}
