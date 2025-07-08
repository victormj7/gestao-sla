import { useEffect, useState } from "react";
import ProdutoService from "../../services/ProdutoService";
import logo from '../../assets/images/home.png'

const Cardapio = () => {

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        ProdutoService.findAllCardapio().then(
            (response) => {
                const produtos = response.data;
                setProdutos(produtos);
            }
        ).catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <div className="container">

            <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="20">
                <div className="container">
                    <nav id="navbar-example2" className="navbar bg-body-tertiary px-3 mb-3">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <ul className="nav nav-pills">
                            <li className="nav-item " >
                                <a className="nav-link" href="#scrollspyHeading1">First</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#scrollspyHeading2">Second</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#scrollspyHeading3">Third</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#scrollspyHeading4">Fourth</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#scrollspyHeading5">Fifth</a>
                            </li>
                        </ul>
                    </nav>
                    <div data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" className="scrollspy-example bg-body-tertiary p-3 rounded-2" tabIndex="0">
                        <h4 id="scrollspyHeading1">First heading</h4>
                        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                        <h4 id="scrollspyHeading2">Second heading</h4>
                        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                        <h4 id="scrollspyHeading3">Third heading</h4>
                        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                        <h4 id="scrollspyHeading4">Fourth heading</h4>
                        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                        <h4 id="scrollspyHeading5">Fifth heading</h4>
                        <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                    </div>
                </div>
            </div>
            <section className='m-3' id='promo'>
                {produtos?.map((produto) => (
                    <div className="card text-center m-5 shadow-lg" key={produto.id}>
                        <div className="card-header">
                            {produto.nome} - R$ {produto.preco}
                        </div>
                        <div className="card-body">
                            <img className='my-3 rounded-4' src={produto.foto ? 'data:image/jpeg;base64,' + produto.foto : logo} alt="logo" />
                            <h5 className="card-title fst-italic">{produto.nome}</h5>
                            <p className="card-text">{produto.descricao}</p>
                            <a href="#" className="btn btn-primary">Saiba mais</a>
                        </div>
                        <div className="card-footer text-muted">
                            Tipo: {produto.categoria.nome}
                        </div>
                    </div>
                ))}

            </section>
        </div>
    )
}

export default Cardapio;