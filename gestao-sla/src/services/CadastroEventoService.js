import http from "../common/http-common";
const API_URL = "produto/";

const findAll = () => {
  return http.mainInstance.get(API_URL + "findAll");
};

const findById = id => {
  return http.mainInstance.get(API_URL + `findById/${id}`);
};

const addCadastroEvento = (file, data, usuario) =>{
  const formData = new FormData();

  formData.append('nome', data.nome);
  formData.append('descricao', data.descricao);
  formData.append('localEvento', data.localEvento);
  formData.append('foto', data.foto);
  formData.append('quantidadeLugares', data.quantidadeLugares);
  formData.append('dataEvento', data.dataEvento);
  formData.append('periodo', data.periodo);
  formData.append('dataCadastro', data.dataCadastro);
  formData.append('categoria_id', data.categoria_id);
  formData.append('usuario_id', data.usuario_id);

  formData.append('statusEvento', data.statusEvento);

  return http.multipartInstance.post(API_URL + "addCadastroEvento", formData);
};

const createComFoto = (file, data) => {
  const formData = new FormData();

formData.append('nome', data.nome);
  formData.append('descricao', data.descricao);
  formData.append('localEvento', data.localEvento);
  formData.append('foto', data.foto);
  formData.append('quantidadeLugares', data.quantidadeLugares);
  formData.append('dataEvento', data.dataEvento);
  formData.append('periodo', data.periodo);
  formData.append('dataCadastro', data.dataCadastro);
  formData.append('categoria_id', data.categoria_id);
  formData.append('usuario_id', data.usuario_id);

  formData.append('statusEvento', data.statusEvento);

  for (const key of formData.entries()) {
    console.log(key[0] + ', ' + key[1]);
  } 

  return http.multipartInstance.post(API_URL + "createComFoto", formData);
};

const alterar = (file, id, data) => {
  const formData = new FormData();
  
formData.append('nome', data.nome);
  formData.append('descricao', data.descricao);
  formData.append('localEvento', data.localEvento);
  formData.append('foto', data.foto);
  formData.append('quantidadeLugares', data.quantidadeLugares);
  formData.append('dataEvento', data.dataEvento);
  formData.append('periodo', data.periodo);
  formData.append('dataCadastro', data.dataCadastro);
  formData.append('categoria_id', data.categoria_id);
  formData.append('usuario_id', data.usuario_id);

  formData.append('statusEvento', data.statusEvento);
  
  if (data.categoria.id === undefined) { // SE O USUÁRIO ALTEROU A "Categoria"
    formData.append('categoria', data.categoria.toString());
  } else { // SE O USUÁRIO NÃO ALTEROU A "Categoria"
    formData.append('categoria', data.categoria.id);
  }

/*
  for (const key of formData.entries()) {
    console.log(key[0] + ', ' + key[1]);
  } 
*/
  return http.multipartInstance.put(API_URL + `alterar/${id}`, formData);
};


const inativar = (id) => {
  return http.multipartInstance.put(API_URL + `inativar/${id}`);
};

const reativar = (id) => {
  return http.multipartInstance.put(API_URL + `reativar/${id}`);
};

const addCardapio = (id) => {
  return http.multipartInstance.put(API_URL + `addCardapio/${id}`);
};

const findAllCardapio = () => {
  return http.mainInstance.get(API_URL + "findAllCardapio");
};

const ProdutoService = {
  findAll,
  findById,
  addCadastroEvento,
  createComFoto,
  alterar,
  inativar,
  reativar,
 
};

export default ProdutoService;