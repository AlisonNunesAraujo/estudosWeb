import './styles.css'
import Header from "../../components/Header";


export default function Home() {
 return (
   <div className='conteinerHome'>
    <Header/>
        <div className='grupoConteudo'>
          <div className='areaAdd'>
            <h2 className='textAdd'>Adicione uma trilha de estudos!</h2>
              <input placeholder="Trilha"/>
              <button>Adicionar</button>
          </div>

          <div className='areaRender'>
            <h2>renderizar</h2>
          </div> 
          <div>
            <h2>ola</h2>
          </div>
        </div>
   </div>
 );
}