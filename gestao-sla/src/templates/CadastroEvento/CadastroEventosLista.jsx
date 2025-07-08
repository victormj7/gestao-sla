import { useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import { useEffect, useRef, useState } from "react"
import CadastroEventoService from "../../services/CadastroEventoService"

const CadastroEventosLista = () => {

    const navigate = useNavigate();
    const _dbRecords = useRef(true);

    const [cadastroeventos, setCadastroEvento] = useState([]);

    const getId = (id) => {
        navigate(`/cadastroeventoeditar/${id}`)
    }

    useEffect(() => {
        if (_dbRecords.current) {
            CadastroEventoService.findAll().then(
                (response) => {
                    const cadastroeventos = response.data;
                    setCadastroEvento(cadastroeventos);
                }
            ).catch((error) => {
                setCadastroEvento([]);
                console.log(error);
            })
        }
        return () => {
            _dbRecords.current = false;
        }
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
                                Total de Evento
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cadastroeventos.length}
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
                            {cadastroeventos?.map((cadastroevento) => (
                                    <tr key={cadastroevento.id}>
                                        <td scope="row">{cadastroevento.id}</td>
                                        <td>{cadastroevento.nome}</td>
                                        <td>{cadastroevento.dataCadastro}</td>
                                        <td>{cadastroevento.info}</td>
                                        <td>{cadastroevento.usuario.nome}</td>
                                        <td>{cadastroevento.statusPromocao}</td>
                                        <td>
                                            <button type="button" onClick={() => getId(cadastroevento.id)}
                                                className="btn btn-sm btn-warning">
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
    )
}

export default CadastroEventosLista