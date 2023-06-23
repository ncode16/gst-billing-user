import { post, get } from "../../utility/client";

const addUser = (body) => {
  return post("add/user", body);
}

const listUser = (body) => {
  return post("users", body);
};

const deleteUser = (id) => {
  return post(`delete/user/${id}`);
};

const activeUserData = (id, body) => {
  return post(`active-inactive/user/${id}`, body);
};

const getEditUserData = (id) => {
  if(id) {
    return get(`edit/user/${id}`)
  }
  return get(`edit/user/0`)
}

const updateUserData = (id, body) => {
  return post(`update/user/${id}`, body)
}

export { addUser, listUser, deleteUser, activeUserData, getEditUserData, updateUserData };
