import http from "../common/http-common";
const API_URL = "produto/";

const findAll = () => {
  return http.mainInstance.get(API_URL + "findAllCadastroEvento");
};

const findById = (id) => {
  return http.mainInstance.get(API_URL + `findById/${id}`);
};

const addCadastroEvento = (file, data, usuario) => {
  const formData = new FormData();

  formData.append('nome', data.nome);
  formData.append('info', data.info || '');
  formData.append('dataCadastro', data.dataCadastro || '');
  formData.append('usuario_id', usuario.id);

  if (file) {
    formData.append('foto', file);
  }

  formData.append('statusEvento', data.statusEvento || '');

  return http.multipartInstance.post(API_URL + "addCadastroEvento", formData);
};

const alterar = (file, id, data, usuario) => {
  const formData = new FormData();

  formData.append('nome', data.nome);
  formData.append('info', data.info || '');
  formData.append('dataCadastro', data.dataCadastro || '');
  formData.append('usuario_id', usuario.id);

  if (file) {
    formData.append('foto', file);
  }

  formData.append('statusEvento', data.statusEvento || '');

  return http.multipartInstance.put(API_URL + `alterar/${id}`, formData);
};

const inativar = (id) => {
  return http.multipartInstance.put(API_URL + `inativar/${id}`);
};

const reativar = (id) => {
  return http.multipartInstance.put(API_URL + `reativar/${id}`);
};

const CadastroEventoService = {
  findAll,
  findById,
  addCadastroEvento,
  alterar,
  inativar,
  reativar,
};

export default CadastroEventoService;
