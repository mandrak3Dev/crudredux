import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR,
} from "../types";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());
    try {
      // Insertar en BD
      await clienteAxios.post("/productos", producto);
      // Actualiza el state
      dispatch(agregarProductoExito(producto));
      // Alert
      Swal.fire("Correcto", "El producto se agregó correctamente", "success");
    } catch (error) {
      dispatch(agregarProductoError(true));
      // Alerta error
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };
}
const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});
// Guarda en BD
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});
// Error
const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});
// Obtener productos de BD
export const obtenerProductosAction = () => {
  return async (dispatch) => {
    dispatch(descargarProductos());
    try {
      const respuesta = await clienteAxios.get("/productos");
      dispatch(descargaProductosExitosa(respuesta.data));
    } catch (error) {
      dispatch(descargaProductosError());
    }
  };
};
const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});
const descargaProductosExitosa = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});
const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true,
});
// Eiminar producto
export const borrarProductoAction = (id) => {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));
    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());
      // Muestra alerta al eliminar
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    } catch (error) {
      dispatch(eliminarProductoError());
    }
  };
};
const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
});
const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO,
});
const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true,
});
// Colocar producto en edición
export const obtenerProductoEditarAction = (producto) => {
  return (dispatch) => {
    dispatch(obtenerProducto(producto));
  };
};
const obtenerProducto = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});
// Editar registro en api
export const editarProductoAction = (producto) => {
  return async (dispatch) => {
    dispatch(editarProducto());
    try {
      await clienteAxios.put(`/productoss/${producto.id}`, producto);
      dispatch(editarProductoExito(producto));
    } catch (error) {
        dispatch(editarProductoError());
    }
  };
};
const editarProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO
});
const editarProductoExito = (producto) => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
  });
const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})