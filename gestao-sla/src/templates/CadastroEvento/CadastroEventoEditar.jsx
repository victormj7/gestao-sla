import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import { useEffect, useRef, useState } from "react"
import CadastroEventoService from "../../services/CadastroEventoService"
import ImageUploaderModal from "../../components/ImageUploader/ImageUploaderModal"
import UsuarioService from "../../services/UsuarioService"
import { useParams } from "react-router-dom"

const CadastroEventoEditar = () => {
    const usuario = UsuarioService.getCurrentUser();
    const { id } = useParams();
    const initialObjectState = {
        id: null,
        nome: "",
        info: "",
        foto: null,
        dataCadastro: "",
        usuario: {
            id: null,
            nome: ""
        },
        statusCadastroEvento: ""
    };

    const [cadastroevento, setCadastroEvento] = useState(initialObjectState);
    const _dbRecords = useRef(true);

    const [file, setFile] = useState("");
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
        setCadastroEvento(cadastroevento => ({ ...cadastroevento, [name]: value }));
    }

    useEffect(() => {
        if (_dbRecords.current) {
            CadastroEventoService.findById(id)
                .then(response => {
                    const cadastroevento = response.data;
                    setCadastroEvento(cadastroevento);
                    console.log(cadastroevento);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        return () => {
            _dbRecords.current = false;
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);

        CadastroEventoService.alterar(file, id, cadastroevento, usuario).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
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

    const inativar = () => {
        CadastroEventoService.inativar(id).then(
            (response) => {
                alert(response.data.message);
                window.location.reload();
            }, (error) => {
                const message = error.response.data.message;
                setMessage(message);
            }
        )
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/cadastroevento'}
                    title={'Editar Evento'}
                    logo={logo}
                />
                <section className="section-main mx-2 p-2">
                    <form className="row g-3 m-3 p-3 border shadow rounded-2" onSubmit={handleSubmit} >
                        {!successful && (
                            <>
                                <div className="col-md-2">
                                    <label htmlFor="inputId" className="form-label mb-1 fw-bold">ID:</label>
                                    <input type="text" className="form-control text-center" id="inputId" readOnly
                                        value={cadastroevento.id || ""} />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="inputData" className="form-label mb-1 fw-bold">Data de Criação:</label>
                                    <input type="text" className="form-control text-center" id="inputData" readOnly
                                        value={cadastroevento.dataCadastro || ""} />
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="inputresp" className="form-label mb-1 fw-bold">Responsável:</label>
                                    <input type="text" className="form-control text-center" id="inputresp" readOnly
                                        value={cadastroevento.usuario.nome || ""} />
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="inputstatusCadastroEvento" className="form-label mb-1 fw-bold">Status:</label>
                                    <input type="text" className="form-control text-center" id="inputstatusCadastroEvento" readOnly
                                        value={cadastroevento.statusCadastroEvento || ""} />
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="inputNome" className="form-label mb-1 fw-bold">Nome:</label>
                                    <input type="text" className="form-control" id="inputNome"
                                        name="nome"
                                        value={cadastroevento.nome || ""}
                                        onChange={handleChange} />
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="inputInfo" className="form-label mb-1 fw-bold">Descrição:</label>
                                    <textarea rows={5} className="form-control" id="inputInfo"
                                        name="info"
                                        value={cadastroevento.info || ""}
                                        onChange={handleChange} >
                                    </textarea>
                                </div>

                                <div className="col-lg-12 text-center my-3">
                                    <img className={`shadow-lg ${chosenImage ? 'opacity-25' : ''}`} src={cadastroevento.foto ? 'data:image/jpeg;base64,' + cadastroevento.foto : logo} alt="..." />
                                </div>

                                <div className="col-md-12">
                                    <ImageUploaderModal
                                        setFile={setChosenFile}
                                        setImage={setImage}
                                        chosenImage={chosenImage} />
                                </div>

                                <div className="col-12 mb-2 d-flex justify-content-between">
                                    <button type="submit" className="btn btn-primary shadow-lg">
                                        Gravar Alterações
                                    </button>
                                    <button type="button" className="btn btn-warning shadow-lg" onClick={() => inativar()}>
                                        Inativar Promoção
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

export default CadastroEventoEditar;
