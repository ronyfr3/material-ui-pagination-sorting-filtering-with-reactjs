import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://reqres.in";

//cart
export const getUsers = createAsyncThunk(
  "getUsers/getUsers",
  async (pageNumber) => {
    return axios
    .get(`${url}/api/users?page=${pageNumber}`)
    .then((response) => response.data.data)
    .catch((error) => console.log(error));
  }
);
export const createUser = createAsyncThunk(
  "createUser/createUser",
  async (id) => {
    return axios
      .post(`${url}/api/users/${id}`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }
);
export const deleteUser = createAsyncThunk(
  "deleteUser/deleteUser",
  async (id) => {
    return axios
      .delete(`${url}/api/users/${id}`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }
);
export const updateUser = createAsyncThunk(
  "updateUser/updateUser",
  async (id) => {
    return axios
      .put(`${url}/api/users/${id}`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }
);
