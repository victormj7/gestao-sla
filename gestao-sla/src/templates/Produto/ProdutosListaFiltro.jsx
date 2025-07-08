import { useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import { useEffect, useRef, useState } from "react"
import ProdutoService from "../../services/ProdutoService"
import CategoriaService from "../../services/CategoriaService"

const ProdutosListaFiltro = () => {

    const navigate = useNavigate();
    const _dbRecords = useRef(true);
    const [categorias, setCategorias] = useState([]);
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

    const [filtro, setFiltro] = useState("");

    const filtrarPor = (e) => {
        setFiltro(e.target.value);
        console.log(produtos.length);
    }

    const getCategorias = () => {
        CategoriaService.findAll().then(
            (response) => {
                const categorias = response.data;
                setCategorias(categorias);
            }
        ).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        if (_dbRecords.current) {
            getCategorias();
        }
        return () => {
            _dbRecords.current = false;
        }
    }, []);

    const inativar = (id) => {
        ProdutoService.inativar(id).then(
            (response) => {
                window.location.reload();
            }
        ).catch((error) => {
            console.log(error);
        })
    }

    const ativar = (id) => {
        ProdutoService.reativar(id).then(
            (response) => {
                window.location.reload();
            }
        ).catch((error) => {
            console.log(error);
        })
    }

    const addCardapio = (id) => {
        ProdutoService.addCardapio(id).then(
            (response) => {
                window.location.reload();
            }
        ).catch((error) => {
            console.log(error);
        })
    }

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
                    <div>
                        <div className="my-3 mx-5 row">
                            <label htmlFor="inputSearch" className="col-sm-2 col-form-label">Filtrar por Nome:</label>
                            <div className="col-sm-5">
                                <input type="text" name='nome' className="form-control" id="inputSearch"
                                    onChange={(e) => filtrarPor(e)} />
                            </div>
                            <label htmlFor="inputCategoria" className="col-sm-2 col-form-label">Filtrar por Categoria:</label>
                            <div className="col-sm-3">
                                <select id="inputCategoria" className="form-select" defaultValue={0}
                                    name="categoria"
                                    onChange={(e) => filtrarPor(e)}>

                                    <option value={''}>
                                        Selecione a categoria...
                                    </option>

                                    {categorias?.map((categoria) => (
                                        <option key={categoria.id} value={categoria.nome}>
                                            {categoria.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
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
                                    <th scope="col">Opções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*  -- FILTRO POR CATEGORIA --
                                    {produtos?.filter(produto => produto.categoria.nome.includes(filtro)).map((produto) => ( 
                                */}
                                {produtos?.filter(produto =>
                                    produto.nome.toLowerCase().includes(filtro.toLowerCase())
                                    || produto.categoria.nome.includes(filtro)).map((produto) => (
                                        <tr key={produto.id}>
                                            <td scope="row">{produto.id}</td>
                                            <td>{produto.nome}</td>
                                            <td>{produto.codigoBarras}</td>
                                            <td>{produto.preco}</td>
                                            <td>{produto.categoria.nome}</td>
                                            <td>{produto.statusProduto}</td>
                                            <td>
                                                <button type="button" onClick={() => getId(produto.id)}
                                                    className="btn btn-sm btn-warning me-2">
                                                    <i className="bi bi-eye me-2"></i>Abrir
                                                </button>
                                                {produto.statusProduto === 'ATIVO' ?
                                                    <button type="button" onClick={() => addCardapio(produto.id)}
                                                        className="btn btn-sm btn-success">
                                                        <i className="bi bi-journal-plus me-2"></i>Cardápio
                                                    </button> :
                                                    <button type="button" onClick={() => ativar(produto.id)}
                                                        className="btn btn-sm btn-primary">
                                                        <i className="bi bi-envelope-open me-2"></i>Ativar
                                                    </button>
                                                }
                                                <button type="button" onClick={() => inativar(produto.id)}
                                                    className="btn btn-sm btn-danger ms-2">
                                                    <i className="bi bi-trash me-2"></i>Inativar
                                                </button>
                                            </td>
                                        </tr>
                                    )).sort()}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ProdutosListaFiltro