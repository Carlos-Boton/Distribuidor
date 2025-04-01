import { useState } from "react";
import ModalOtro from "./modalOtro";
import AgregarCodigo from "./agregarCodigo";
import MuestraProducto from "./muestraProductos";
import BuscarProducto from "./buscarProducto";
import BotonBuscar from "./botonBuscar";
import BotonOtro from "./botonOtro";
import BotonCliente from "./botonCliente";
import ModalCliente from "./modalCliente";
import Mermas from "./mermas";


const UnaVenta = () =>{
  const [modalOtroAbierto, setModalOtroAbierto] = useState(false);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalClientesAbierto, setModalClientesAbierto] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [total, setTotal] = useState(0);
  const [mermas, setMermas] = useState([]);
  const [viaje, setViaje] = useState("0");

  const agregarProducto = (producto) => {
    setProductosSeleccionados((prevProductos) => {
      const existe = prevProductos.find((p) => p.codigo === producto.codigo);
      if (existe) {
        return prevProductos.map((p) =>
          p.codigo === producto.codigo
            ? { 
                ...p,
                cantidad: p.cantidad + 1,
                subtotal: (p.cantidad + 1) * p.precio
              }
            : p
        );
      } else {
        return [...prevProductos, { ...producto, cantidad: 1, precio: producto.precio, subtotal: producto.precio }];
      }
    });
  
    setTotal((prevTotal) => Math.max(0, prevTotal + producto.precio));
    setModalAbierto(false);
  };


    return (
        <>
        <div className="pt-36 p-4">
        <BotonCliente setModalClientesAbierto={setModalClientesAbierto} clienteSeleccionado={clienteSeleccionado}/>
            <div className="flex space-x-3 mb-4">
                <BotonOtro setModalOtroAbierto={setModalOtroAbierto}/>
                <AgregarCodigo agregarProducto={agregarProducto}/>
                <BotonBuscar setModalAbierto={setModalAbierto}/>
            </div>
            <MuestraProducto productosSeleccionados={productosSeleccionados} total={total} setClienteSeleccionado={setClienteSeleccionado} setProductosSeleccionados={setProductosSeleccionados} setTotal={setTotal} setMermas={setMermas} viaje={viaje} setViaje={setViaje}  mermas={mermas} clienteSeleccionado={clienteSeleccionado}/>
            <Mermas mermas={mermas} setMermas={setMermas} />
        </div>
        <BuscarProducto modalAbierto={modalAbierto} setModalAbierto={setModalAbierto} agregarProducto={agregarProducto}/>
        <ModalOtro modalOtroAbierto={modalOtroAbierto} setModalOtroAbierto={setModalOtroAbierto} setClienteSeleccionado={setClienteSeleccionado} setProductosSeleccionados={setProductosSeleccionados} setTotal={setTotal} setMermas={setMermas} />
        <ModalCliente setModalClientesAbierto={setModalClientesAbierto} modalClientesAbierto={modalClientesAbierto} setClienteSeleccionado={setClienteSeleccionado} />
        </>
    )
}

export default UnaVenta;