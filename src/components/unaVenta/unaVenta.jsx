import { useState, useEffect} from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/data"
import ModalOtro from "./modalOtro";
import AgregarCodigo from "./agregarCodigo";
import MuestraProducto from "./muestraProductos";
import BuscarProducto from "./buscarProducto";
import BotonBuscar from "./botonBuscar";
import BotonOtro from "./botonOtro";
import BotonCliente from "./botonCliente";
import ModalCliente from "./modalCliente";
import Mermas from "./mermas";
import Ticket from "../ticket/Ticket";


const UnaVenta = () =>{
    const [viaje, setViaje] = useState("0");
    const [total, setTotal] = useState(0);
    const [tiketImpreso, setTiketImpreso] = useState();
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [mermas, setMermas] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [modalOtroAbierto, setModalOtroAbierto] = useState(false);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [modalTiket, setModalTiket] = useState(false);
    const [modalClientesAbierto, setModalClientesAbierto] = useState(false);

  useEffect(() => {
    const productosRef = collection(db, "productos");
    getDocs(productosRef)
    .then((resp) => {
      setProductos(
        resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id}
        })
      )
    })
  }, [])

  useEffect(() => {
    const clientesRef = collection(db, "clientes");
    getDocs(clientesRef)
    .then((resp) => {
      setClientes(
        resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id}
        })
      )
    })
  }, [])

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
        
            {modalTiket ? (
                <>
                <Ticket tiketImpreso={tiketImpreso} setModalTiket={setModalTiket} />
                </>   
            ) : (
                <div className="pt-36 p-4">
                    <BotonCliente setModalClientesAbierto={setModalClientesAbierto} clienteSeleccionado={clienteSeleccionado}/>
                    <div className="flex space-x-3 mb-4">
                        <BotonOtro setModalOtroAbierto={setModalOtroAbierto}/>
                        <AgregarCodigo productos={productos} agregarProducto={agregarProducto}/>
                        <BotonBuscar setModalAbierto={setModalAbierto}/>
                    </div>
                    <MuestraProducto productosSeleccionados={productosSeleccionados} total={total} setClienteSeleccionado={setClienteSeleccionado} setProductosSeleccionados={setProductosSeleccionados} setTotal={setTotal} setMermas={setMermas} viaje={viaje} setViaje={setViaje}  mermas={mermas} clienteSeleccionado={clienteSeleccionado} setTiketImpreso={setTiketImpreso} setModalTiket={setModalTiket} />
                    <Mermas mermas={mermas} setMermas={setMermas}/>
                </div>
            )}
        
        <BuscarProducto productos={productos} modalAbierto={modalAbierto} setModalAbierto={setModalAbierto} agregarProducto={agregarProducto}/>
        <ModalOtro modalOtroAbierto={modalOtroAbierto} setModalOtroAbierto={setModalOtroAbierto} setClienteSeleccionado={setClienteSeleccionado} setProductosSeleccionados={setProductosSeleccionados} setTotal={setTotal} setMermas={setMermas} />
        <ModalCliente setModalClientesAbierto={setModalClientesAbierto} modalClientesAbierto={modalClientesAbierto} setClienteSeleccionado={setClienteSeleccionado} clientes={clientes} />
        </>
    )
}

export default UnaVenta;