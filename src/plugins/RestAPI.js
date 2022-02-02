import axios from "axios";
const APIURL = "https://reqres.in/api";
export default {
  getAllUsers() {
    return axios.get(APIURL + "/users?page=2");
  },

  getSingleUser(id) {
    return axios.get(APIURL + `/users/${id}`)
  },

  UpdateUser(id, req) {
    return axios.patch(APIURL + `/users/${id}`, req);
  },

  DeleteUser(id) {
    return axios.delete(APIURL + `/users/${id}`);
  },
};
