import { useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import { useEffect, useRef, useState } from "react"
import ProdutoService from "../../services/ProdutoService"

const ProdutosLista = () => {

    const navigate = useNavigate();
    const _dbRecords = useRef(true);

    const [produtos, setProdutos] = useState([]);

    const getId = (id) => {
        navigate(`/produtoeditar/${id}`)
    }

    useEffect(() => {
        if (_dbRecords.current) {
            ProdutoService.findAll().then(
                (response) => {
                    const produtos = response.data;
                    setProdutos(produtos);
                }
            ).catch((error) => {
                setProdutos([]);
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
                    goto={'/produto'}
                    title={'Lista de Produtos'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    <div className="m-2">
                            <div className="btn btn-info position-relative fw-bold">
                                Total de Produtos
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {produtos.length}
                                    <span className="visually-hidden">total de produtos</span>
                                </span>
                            </div>
                        </div>

                    <div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Código</th>
                                    <th scope="col">Preço</th>
                                    <th scope="col">Categoria</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Abrir</th>
                                </tr>
                            </thead>
                            <tbody>
                            {produtos?.map((produto) => (
                                    <tr key={produto.id}>
                                        <td scope="row">{produto.id}</td>
                                        <td>{produto.nome}</td>
                                        <td>{produto.codigoBarras}</td>
                                        <td>{produto.preco}</td>
                                        <td>{produto.categoria.nome}</td>
                                        <td>{produto.statusProduto}</td>
                                        <td>
                                            <button type="button" onClick={() => getId(produto.id)}
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

export default ProdutosLista