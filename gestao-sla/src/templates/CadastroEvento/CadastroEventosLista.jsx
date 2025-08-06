import { useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import { useEffect, useState } from "react"
import CadastroEventoService from "../../services/CadastroEventoService"

const CadastroEventosLista = () => {
    const navigate = useNavigate();
    const [cadastroEventos, setCadastroEventos] = useState([]);

    const getId = (id) => {
        navigate(`/cadastroeventoeditar/${id}`);
    }

    useEffect(() => {
        CadastroEventoService.findAll()
            .then(response => {
                setCadastroEventos(response.data);
            })
            .catch(error => {
                setCadastroEventos([]);
                console.log(error);
            });
    }, []);

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/cadastroevento'}
                    title={'Lista de Eventos'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    <div className="m-2">
                        <div className="btn btn-info position-relative fw-bold">
                            Total de Eventos
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cadastroEventos.length}
                                <span className="visually-hidden">total de eventos</span>
                            </span>
                        </div>
                    </div>

                    <div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Informações</th>
                                    <th scope="col">Responsável</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Abrir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cadastroEventos.map((evento) => (
                                    <tr key={evento.id}>
                                        <td>{evento.id}</td>
                                        <td>{evento.nome}</td>
                                        <td>{evento.dataCadastro}</td>
                                        <td>{evento.info}</td>
                                        <td>{evento.usuario?.nome}</td>
                                        <td>{evento.statusCadastroEvento}</td>
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() => getId(evento.id)}
                                                className="btn btn-sm btn-warning"
                                            >
                                                <i className="bi bi-envelope-open me-2"></i>Abrir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default CadastroEventosLista;
