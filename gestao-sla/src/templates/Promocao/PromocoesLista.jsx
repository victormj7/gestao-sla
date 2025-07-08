import { useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import { useEffect, useRef, useState } from "react"
import PromocaoService from "../../services/PromocaoService"

const PromocoesLista = () => {

    const navigate = useNavigate();
    const _dbRecords = useRef(true);

    const [promocoes, setPromocoes] = useState([]);

    const getId = (id) => {
        navigate(`/promocaoeditar/${id}`)
    }

    useEffect(() => {
        if (_dbRecords.current) {
            PromocaoService.findAll().then(
                (response) => {
                    const promocoes = response.data;
                    setPromocoes(promocoes);
                }
            ).catch((error) => {
                setPromocoes([]);
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
                    goto={'/promocao'}
                    title={'Lista de Promocoes'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    <div className="m-2">
                            <div className="btn btn-info position-relative fw-bold">
                                Total de Promocoes
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {promocoes.length}
                                    <span className="visually-hidden">total de promocoes</span>
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
                            {promocoes?.map((promocao) => (
                                    <tr key={promocao.id}>
                                        <td scope="row">{promocao.id}</td>
                                        <td>{promocao.nome}</td>
                                        <td>{promocao.dataCadastro}</td>
                                        <td>{promocao.info}</td>
                                        <td>{promocao.usuario.nome}</td>
                                        <td>{promocao.statusPromocao}</td>
                                        <td>
                                            <button type="button" onClick={() => getId(promocao.id)}
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

export default PromocoesLista