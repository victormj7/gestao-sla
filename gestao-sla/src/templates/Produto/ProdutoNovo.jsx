import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import { useEffect, useRef, useState } from "react"
import ProdutoService from "../../services/ProdutoService"
import ImageUploaderModal from "../../components/ImageUploader/ImageUploaderModal"
import CategoriaService from "../../services/CategoriaService"

const ProdutoNovo = () => {
    const _dbRecords = useRef(true);
    const [categorias, setCategorias] = useState([]);

    const [file, setFile] = useState("");
    const [formData, setFormData] = useState({});
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState();

    const [chosenImage, setChosenImage] = useState();

    const setChosenFile = (dataFile) => {
        setFile(dataFile);
    }

    const setImage = (dataImage) => {
        setChosenImage(dataImage);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(formData => ({ ...formData, [name]: value }));
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

        ProdutoService.createComFoto(file, formData).then(
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
                    title={'Novo Produto'}
                    logo={logo}
                />
                <section className="m-2 p-2">
                    <form className="row g-3 m-3 p-3 border shadow rounded-2" onSubmit={handleSubmit} >
                        {!successful && (
                            <>
                                <div className="col-md-8">
                                    <label htmlFor="inputNome" className="form-label mb-1 fw-bold mb-1 fw-bold">Nome:</label>
                                    <input type="text" className="form-control" id="inputNome"
                                        name="nome"
                                        value={formData.nome || ""}
                                        onChange={handleChange} />
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="inputCodigo" className="form-label mb-1 fw-bold">Código:</label>
                                    <input type="text" className="form-control" id="inputCodigo"
                                        name="codigoBarras"
                                        value={formData.codigoBarras || ""}
                                        onChange={handleChange} />
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="inputPreco" className="form-label mb-1 fw-bold">Preço:</label>
                                    <input type="text" className="form-control" id="inputPreco"
                                        name="preco"
                                        value={formData.preco || ""}
                                        onChange={handleChange} />
                                </div>

                                <div className="col-md-10">
                                    <label htmlFor="inputDescricao" className="form-label mb-1 fw-bold">Descrição:</label>
                                    <textarea rows={5} className="form-control" id="inputDescricao"
                                        name="descricao"
                                        value={formData.descricao || ""}
                                        onChange={handleChange} >
                                    </textarea>
                                </div>

                                <div className="col-md-2">
                                    <label htmlFor="inputCategoria" className="form-label mb-1 fw-bold">Categoria:</label>
                                    <select id="inputCategoria" className="form-select" defaultValue={0}
                                        name="categoria"
                                        onChange={(e) => handleChange(e)}>

                                        <option value={0} disabled>
                                            Selecione a categoria...
                                        </option>

                                        {categorias?.map((categoria) => (
                                            <option key={categoria.id} value={categoria.id}>
                                                {categoria.nome}
                                            </option>
                                        ))}
                                    </select>
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

export default ProdutoNovo