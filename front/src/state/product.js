import {
  createReducer,
  createAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { busquedaUsuario } from "./allusers";

/*Acciones:
Traer favoritos ======= que seria esto???
Traer un producto
Traer por categoría
Agregar review
Admin: agregar producto
Admin: modificar producto
Admin: eliminar producto
*/

export const getProductsByPage = createAsyncThunk("GET_PRODUCTS_BY_PAGE", (data) => {
  const {limit, page} = data
  return axios.get(`/api/products?limit=${limit}&page=${page}`).then((respuesta) => respuesta.data);
});

export const getProducts = createAsyncThunk("GET_PRODUCTS", (data) => {
  return axios.get("/api/products/", data).then((respuesta) => respuesta.data);
});

export const getOne = createAsyncThunk("GET_ONE_PRODUCT", (data) => {
    return axios.get(`/api/products/${data}`).then((respuesta) => respuesta.data)
})

export const getCategoryProducts = createAction("GET_CATEGORY_PRODUCTS");

export const addReview = createAsyncThunk("ADD_REVIEW", () => {
  /*En algun lugar de la data tiene que venir el id para encontrar la ruta*/
  return axios
    .post(/*ver ruta*/ "api/products/productId/reviews")
    .then((respuesta) => respuesta.data);
});

//FUNCIONES SOLO PARA EL ADMIN
export const addProduct = createAsyncThunk("ADD_PRODUCT", (data) => {
  return axios.post("/api/products/", data).then((respuesta) => respuesta.data);
});

export const changeProduct = createAsyncThunk("CHANGE_PRODUCT", (data) => {
  /*En algun lugar de la data tiene que venir el id para encontrar la ruta y la info para actualziar*/
  return axios
    .post("/api/products/productId", data)
    .then((respuesta) => respuesta.data);
});

export const deleteProduct = createAsyncThunk("DELETE_PRODUCT", (data) => {
  /*En algun lugar de la data tiene que venir el id para encontrar la ruta*/
  return axios
    .delete("/api/products/productId")
    .then((respuesta) => respuesta.data);
});
export const getProductsByKeyword = createAsyncThunk(
  "GET_PRODUCT_BY_KEYWORD",
  (data) => {
    console.log("data", data);
    return axios
      .get(`/api/products/search?name=${data}`)
      .then((respuesta) => respuesta.data);
  }
);

export const busquedaProducto = createAction("BUSQUEDA_PRODUCTO");

const productReducer = createReducer([], {
  [getProductsByPage.fulfilled]: (state, action) => action.payload[0],
  [getProducts.fulfilled]: (state, action) => action.payload,
  [getOne.fulfilled]: (state, action) => [action.payload],
  [getProductsByKeyword.fulfilled]: (state, action) => action.payload,
  [getCategoryProducts]: (state, action) => action.payload, //Devuelve un arreglo con productos
  [addReview.fulfilled]: (state, action) => action.payload, //Que devuelva el producto
  [addProduct.fulfilled]: (state, action) => [...state, action.payload],
  [changeProduct.fulfilled]: (state, action) => action.payload, //Que devuelva todos
  [deleteProduct.fulfilled]: (state, action) => action.payload, //Que devuelva todos
  [busquedaProducto]: (state, action) => action.payload,
});

export default productReducer;
