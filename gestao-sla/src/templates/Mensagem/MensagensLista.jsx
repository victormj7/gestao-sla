import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import MensagemService from '../../services/MensagemService';
import Sidebar from '../../components/Menu/Sidebar';
import Header from '../../components/Header/Header';
import logo from '../../assets/images/home.png'

const MensagensLista = () => {
    const _dbRecords = useRef();

    const recordsPerPage = [2, 4, 6];
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(recordsPerPage[0]);
    const [pages, setPages] = useState();

    const [search, setSearch] = useState("");

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - records.length) : 0;

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onChangeSearch = (e) => {
        const search = e.target.value;
        setSearch(search);
    };

    const findByFilter = (search) => {
        // const result = records.filter((record) => record === search);
        // const newRecords = records.filter(e.target.value);
        // setRecords(newRecords);
        console.log(search);
    };

    const findByEmail = () => {
        MensagemService.findByEmail(search).then(
            (response) => {
                const records = response.data;
                if (records.length > 0) {
                    setRecords(records);
                    setPages(Math.ceil(records.length / rowsPerPage));
                } else {
                    setRecords([]);
                }
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        findByEmail();
    }, [search]);

    useEffect(() => {
        const rowsLength = records.length;
        const pages = rowsLength / rowsPerPage;
        setPages(Math.ceil(pages));
    }, [rowsPerPage]);

    const listItems = () => {
        var recordsPage = [];
        let i = 1;
        for (i = 1; i <= pages; i++) {
            recordsPage.push(
                <li className="page-item" key={i}>
                    <button className="page-link" type='button' value={i}
                        onClick={(e) => setPage(e.target.value - 1)}>
                        {i}
                    </button>
                </li>
            )
        }
        return (
            <nav aria-label="Page navigation example" >
                <ul className="pagination pt-3">
                    <li className="page-item">
                        <button className="page-link" type='button' aria-label="Previous"
                            onClick={() => setPage((page) => page > 0 ? page - 1 : page)}>
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>

                    {recordsPage}

                    <li className="page-item">
                        <button className="page-link" type='button' aria-label="Next"
                            onClick={() => setPage((page) => page < (pages - 1) ? page + 1 : page)}>
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
        )
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className='p-3 w-100'>
                <Header
                    goto={'/mensagem'}
                    title={'Lista de Mensagens'}
                    logo={logo}
                />
                <section>
                    <form className="shadow m-2 row py-4 rounded-2">
                        <label htmlFor="inputSearch" className="col-lg-3 col-form-label fs-5 mt-1">Pesquise por email: </label>
                        <div className="col-lg-8">
                            <input type="text" className="form-control fs-5  mt-1" id="inputSearch" placeholder="Pesquise aqui..."
                                value={search}
                                onChange={onChangeSearch} />
                        </div>
                        <div className='col-lg-1 d-flex flex-row-reverse mt-1'>
                            <button type="button" className="btn btn-primary" onClick={() => findByFilter(search)}>
                                <i className='bi bi-search fs-5'></i>
                            </button>
                        </div>
                    </form>

                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered shadow">
                            <thead className='table-warning text-center'>
                                <tr>
                                    <th>ID</th>
                                    <th>Data</th>
                                    <th>Remetente</th>
                                    <th>Email</th>
                                    <th>Telefone</th>
                                    <th>Status</th>
                                    <th>Abrir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(rowsPerPage > 0
                                    ? records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : records
                                ).map((mensagem) => (
                                    <tr key={mensagem.id}>
                                        <td scope="row" className='text-center'>{mensagem.id}</td>
                                        <td>{mensagem.dataMensagem}</td>
                                        <td>{mensagem.remetente}</td>
                                        <td>{mensagem.email}</td>
                                        <td>{mensagem.telefone}</td>
                                        <td className='text-center'>{mensagem.statusMensagem}</td>
                                        <td className='text-center'>
                                            <button type='button' className='btn btn-sm btn-success'>
                                                <i className="bi bi-folder2-open"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <hr />
                        <div className='bg-warning bg-opacity-25 d-flex justify-content-between align-items-center px-2 rounded-2'>
                            <div className='me-1 fw-bold'>
                                <span> Quantidade de Registros: </span>
                                <span> {records.length} </span>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <label htmlFor="itensPorPagina" className='me-2 fw-bold'>Registros por página:</label>
                                <select id="itensPorPagina" className="form-select me-2"
                                    value={rowsPerPage} onChange={(e) => handleChangeRowsPerPage(e)}
                                    aria-label="Default select example" style={{ width: "70px" }}>
                                    {recordsPerPage.map((r) => (
                                        <option value={r} key={r}>{r}</option>
                                    ))}
                                </select>
                                <div>
                                    {listItems()}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>

    )
}

export default MensagensLista;