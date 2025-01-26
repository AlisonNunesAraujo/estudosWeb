import "./style.css";

import { useContext } from "react";
import { AuthContext } from "../../contextApi";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
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

export default function SigOut() {
  const { CreateUser, loading } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  async function Criar(data: any) {
    CreateUser(data);
  }

  return (
    <div className="conteiner">
      <form onClick={handleSubmit(Criar)}>
        <h2 className="Title">Crie sua conta!</h2>
        <input placeholder="Seu E-Mail" {...register("email")} />
        <p>{errors.email?.message?.toString()}</p>
        <input placeholder="Sua senha" {...register("senha")} type="password" />
        <p>{errors.senha?.message?.toString()}</p>
        {loading ? (
          <button className="bntAcessar">carregando...</button>
        ) : (
          <button type="submit" className="bntAcessar">
            Criar
          </button>
        )}
        <Link to="/">Voltar</Link>
      </form>

      <div className="areaApresentation">
        <h2>
          Seja organizado!
          <br />
          Adicione tarefas, <br /> organize seus estudos, <br />
        </h2>
      </div>
    </div>
  );
}
