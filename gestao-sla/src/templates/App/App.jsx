import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FaleConosco from '../Mensagem/FaleConosco'
import './App.css'
import PromocaoService from "../../services/PromocaoService"

import logo from '../../assets/images/home.png'

function App() {
  const [dataFile, setDataFile] = useState();
  const [chosenImage, setChosenImage] = useState();

  const setChosenCep = (dataFile) => {
    setDataFile(dataFile);
  }

  const setImage = (dataImage) => {
    setChosenImage(dataImage);
  }

  const [promocoes, setPromocoes] = useState([]);

  useEffect(() => {
    PromocaoService.findAllAtivos().then(
      (response) => {
        const promocoes = response.data;
        setPromocoes(promocoes);
      }
    ).catch((error) => {
      console.log(error);
    })
  }, []);

  return (
    <div className='container'>
      <nav className="navbar navbar-expand-lg menu">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Produtos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Quem Somos</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/cardapio'}>Cardápio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/faleconosco'}>Fale Conosco</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className='m-3' id='promo'>

        {promocoes?.map((promocao) => (
          <div className="card text-center m-5 shadow-lg" key={promocao.id}>
            <div className="card-header">
              {promocao.nome}
            </div>
            <div className="card-body">
              <img className='my-3 rounded-4' src={promocao.foto ? 'data:image/jpeg;base64,' + promocao.foto : logo} alt="logo" />
              <h5 className="card-title fst-italic">{promocao.nome}</h5>
              <p className="card-text">{promocao.info}</p>
              <a href="#" className="btn btn-primary">Saiba mais</a>
            </div>
            <div className="card-footer text-muted">
              Criada em: {promocao.dataCadastro}
            </div>
          </div>
        ))}

      </section>
      <FaleConosco />

      <div className='to-header'>
        <i className="bi bi-chevron-up"></i>
      </div>

      <footer>
        <Link to={'/login'}
          className='btn btn-sm btn-warning'>
          Acesso Restrito
        </Link>
      </footer>
    </div>
  )
}

export default App
