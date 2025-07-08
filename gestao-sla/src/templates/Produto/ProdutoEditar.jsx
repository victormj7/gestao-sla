import { Link, useParams } from "react-router-dom"
import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import { useEffect, useRef, useState } from "react"
import ImageUploaderModal from "../../components/ImageUploader/ImageUploaderModal"
import ProdutoService from "../../services/ProdutoService"
import CategoriaService from "../../services/CategoriaService"

const ProdutoEditar = () => {

    const { id } = useParams();
    const _dbRecords = useRef(true);

    const initialObjectState = {
        id: null,
        nome: "",
        descricao: "",
        codigoBarras: "",
        foto: null,
        preco: 0,
        categoria: {
            id: null
        },
        statusProduto: ""
    };

    const [produto, setProduto] = useState(initialObjectState);
    const [categorias, setCategorias] = useState([]);

    const [message, setMessage] = useState();
    const [successful, setSuccessful] = useState(false);

    const [file, setFile] = useState("");
    const [chosenImage, setChosenImage] = useState();

    useEffect(() => {
        if (_dbRecords.current) {
            ProdutoService.findById(id)
                .then(response => {
                    const produto = response.data;
                    setProduto(produto);
                    console.log(produto);
                })
                .catch(e => {
                    console.log(e);
                });
        } return () => {
            _dbRecords.current = false;
        }
    }, [id]);

    const setChosenFile = (dataFile) => {
        setFile(dataFile);
    }

    const setImage = (dataImage) => {
        setChosenImage(dataImage);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProduto(produto => ({ ...produto, [name]: value }));
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

    
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        
        ProdutoService.alterar(file, id, produto).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                /*window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                })*/
            }, (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            }
        )
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/produto'}
                    title={'Editar Produto'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    <form className="row g-3 m-3 p-3 border shadow rounded-2" onSubmit={handleSubmit} >
                        {!successful && (
                            <>
                                <div className="col-md-8">
                                    <label htmlFor="inputNome" className="form-label mb-1 fw-bold mb-1 fw-bold">Nome:</label>
                                    <input type="text" className="form-control" id="inputNome"
                                        name="nome"
                                        value={produto.nome || ""}
                                        onChange={handleChange} />
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="inputCodigo" className="form-label mb-1 fw-bold">Código:</label>
                                    <input type="text" className="form-control" id="inputCodigo"
                                        name="codigoBarras"
                                        value={produto.codigoBarras || ""}
                                        onChange={handleChange} />
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="inputPreco" className="form-label mb-1 fw-bold">Preço:</label>
                                    <input type="text" className="form-control" id="inputPreco"
                                        name="preco"
                                        value={produto.preco || ""}
                                        onChange={handleChange} />
                                </div>

                                <div className="col-md-10">
                                    <label htmlFor="inputDescricao" className="form-label mb-1 fw-bold">Descrição:</label>
                                    <textarea rows={5} className="form-control" id="inputDescricao"
                                        name="descricao"
                                        value={produto.descricao || ""}
                                        onChange={handleChange} >
                                    </textarea>
                                </div>

                                <div className="col-md-2">
                                    <label htmlFor="inputCategoria" className="form-label mb-1 fw-bold">Categoria:</label>
                                    <select id="inputCategoria" className="form-select" value={produto.categoria || ""}
                                        name="categoria"
                                        onChange={(e) => handleChange(e)}>

                                        <option value={0}>
                                            {produto.categoria.nome}
                                        </option>

                                        {categorias?.map((categoria) => (
                                            <option key={categoria.id} value={categoria.id}>
                                                {categoria.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-lg-12 text-center my-3">
                                    <img className="shadow-lg" src={produto.foto ? 'data:image/jpeg;base64,' + produto.foto : logo} alt="..." />
                                </div>

                                <div className="col-md-12">
                                    <ImageUploaderModal
                                        setFile={setChosenFile}
                                        setImage={setImage}
                                        chosenImage={chosenImage} />
                                </div>

                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary">
                                        Gravar
                                    </button>
                                </div>
                            </>
                        )}
                        {message && (
                            <div className="m-1">
                                <div className={
                                    "text-center h4 fst-italic py-4 rounded-2 " + (successful ? "bg-success" : "bg-danger")
                                }>
                                    {message}
                                </div>
                            </div>
                        )}
                    </form>
                </section>
            </div>
        </div>
    )
}

export default ProdutoEditar