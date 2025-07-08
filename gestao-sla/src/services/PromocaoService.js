import http from "../common/http-common";
const API_URL = "promocao/";

const findAll = () => {
  return http.mainInstance.get(API_URL + "findAll");
};

const findAllAtivos = () => {
  return http.mainInstance.get(API_URL + "findAllAtivos");
};

const findById = id => {
  return http.mainInstance.get(API_URL + `findById/${id}`);
};

const addPromocao = (file, data, usuario) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('nome', data.nome);
  formData.append('info', data.info);
  formData.append('usuario', usuario.id);

  for (const key of formData.entries()) {
    console.log(key[0] + ', ' + key[1]);
  } 

  return http.multipartInstance.post(API_URL + "addPromocao", formData);
};

const alterar = (file, id, data, usuario) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('nome', data.nome);
  formData.append('info', data.info);
  formData.append('usuario', usuario.id);

/*
  for (const key of formData.entries()) {
    console.log(key[0] + ', ' + key[1]);
  } 
*/
  return http.multipartInstance.put(API_URL + `alterar/${id}`, formData);
};

const inativar = (id) => {
  return http.mainInstance.put(API_URL + `inativar/${id}`);
};


const PromocaoService = {
  findAll,
  findAllAtivos,
  findById,
  addPromocao,
  alterar,
  inativar,
};

export default PromocaoService;