import './style.css'

import { useContext } from 'react';
import { AuthContext } from '../../contextApi';
export default function Header() {

  const { Deslogar } = useContext(AuthContext)

  async function Sair() {
    Deslogar();
  }


  return (
    <div className='header'>
      <h2>Olá, seja bem vindo!</h2>
      <div>
        <button onClick={Sair}>Sair</button>
      </div>
    </div>
  );
}