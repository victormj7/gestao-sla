import Header from "../../components/Header/Header"
import Sidebar from '../../components/Menu/Sidebar'
import logo from '../../assets/images/home.png'
import { useState } from "react"
import CadastroEventoService from "../../services/CadastroEventoService"
import ImageUploaderModal from "../../components/ImageUploader/ImageUploaderModal"
import UsuarioService from "../../services/UsuarioService"

const CadastroEventoNova = () => {
    const usuario = UsuarioService.getCurrentUser();

    const [file, setFile] = useState("");
    const [formData, setFormData] = useState({
        nome: "",
        info: ""
    });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);

        CadastroEventoService.addCadastroEvento(file, formData, usuario).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
            }, (error) => {
                const resMessage =
                    (error.response?.data?.message) ||
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
                    goto={'/cadastroevento'}
                    title={'Cadastro de Novo Evento'}
                    logo={logo}
                />
                <section className="m-2 p-2">
                    <form className="row g-3 m-3 p-3 border shadow rounded-2" onSubmit={handleSubmit}>
                        {!successful && (
                            <>
                                <div className="col-md-12">
                                    <label htmlFor="inputNome" className="form-label mb-1 fw-bold">Nome:</label>
                                    <input type="text" className="form-control" id="inputNome"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleChange} />
                                </div>
                                
                                <div className="col-md-12">
                                    <label htmlFor="inputInfo" className="form-label mb-1 fw-bold">Descrição:</label>
                                    <textarea rows={5} className="form-control" id="inputInfo"
                                        name="info"
                                        value={formData.info}
                                        onChange={handleChange}>
                                    </textarea>
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

export default CadastroEventoNova
