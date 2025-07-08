import { Link } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'

const Produto = () => {

    return (
        <div className="d-flex">
           <Sidebar />
           <div className="p-3 w-100">
           <Header 
                    goto={'/home'}
                    title={'Produto'}
                    logo={logo}
                    />
                <section className="m-2 p-2 shadow-lg">
                    <div className="d-flex justify-content-lg-evenly">
                        <Link to={'/cardapio'} 
                            className="btn btn-lg px-5 py-4 btn-success">
                            <i className="bi bi-card-list me-2"></i>Cardápio
                        </Link>
                        <Link to={'/produtoslista'} 
                            className="btn btn-lg px-5 py-4 btn-warning">
                            <i className="bi bi-card-list me-2"></i>Lista de Produtos
                        </Link>
                        <Link to={'/produtoslistafiltro'} 
                            className="btn btn-lg px-5 py-4 btn-warning">
                            <i className="bi bi-list-check me-2"></i>Lista de Produtos com Filtro
                        </Link>
                        <Link to={'/produtonovo'} 
                            className="btn btn-lg px-5 py-4 btn-primary">
                            <i className="bi bi-file-earmark-plus me-2"></i>Novo Produto
                        </Link>
                    </div>
                </section>
           </div>
        </div>
    )
}

export default Produto