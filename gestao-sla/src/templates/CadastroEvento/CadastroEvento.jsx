import { Link } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'

const CadastroEvento = () => {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header 
                    goto={'/home'}
                    title={'Cadastro de Evento'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    <div className="d-flex justify-content-lg-evenly">
                        <Link 
                            to={'/cadastroeventoslista'} 
                            className="btn btn-lg px-5 py-4 btn-warning">
                            <i className="bi bi-card-list me-2"></i>Lista de Eventos
                        </Link>
                        <Link 
                            to={'/cadastroeventonova'} 
                            className="btn btn-lg px-5 py-4 btn-primary">
                            <i className="bi bi-file-earmark-plus me-2"></i>Novo Evento
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default CadastroEvento
