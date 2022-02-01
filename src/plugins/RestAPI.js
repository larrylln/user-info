import axios from "axios";
const APIURL = "https://reqres.in/api";
export default {
  getAllUsers() {
    return axios.get(APIURL + "/users?page=2");
  },

  UpdateUser(id, req) {
    return axios.put(APIURL + `/users/${id}`, req);
  },

  DeleteUser(id) {
    return axios.delete(APIURL + `/users/${id}`);
  },
};
