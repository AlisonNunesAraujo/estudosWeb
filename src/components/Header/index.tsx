import './style.css'

import { useContext } from 'react';
import { AuthContext } from '../../contextApi';
export default function Header() {

  const { Deslogar, user } = useContext(AuthContext)

  async function Sair() {
    Deslogar();
  }


  return (
    <div className='header'>
      <h2> Email: {user.email}</h2>
      <div>
        <button onClick={Sair}>Sair</button>
      </div>
    </div>
  );
}