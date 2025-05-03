import { useState, useEffect } from "react";
import ModalResumen from "./modalResumen";
import RegistroPedidos from "./registroPedidos";
import EditarPedido from "./EditarPedido";
import FiltrarViaje from "./filtrarViaje";
import Ticket from "../ticket/Ticket";
import TodoTicket from "../ticket/todoTiket";

const MostrarRegistros = () => {
    const [registros, setRegistros] = useState([]);
    const [modalResumenAbierto, setModalResumenAbierto] = useState(false);
    const [productosSeleccionados, setProductosSeleccionados] = useState({});
    const [filtroViaje, setFiltroViaje] = useState("0"); // Estado del filtro
    const [registroEditando, setRegistroEditando] = useState(null);
    const [modalTiket, setModalTiket] = useState(false);
    const [modalTodoTiket, setModalTodoTiket] = useState(false);
    const [pedidoActualizado, setPedidoActualizado] = useState(false);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [tiketImpreso, setTiketImpreso] = useState()
    const [resumen, setResumen] = useState({ totalPedidos: 0, totalProductos: 0, productosAgrupados: {} });

    useEffect(() => {
        const registrosGuardados = JSON.parse(localStorage.getItem("registros")) || [];
        setRegistros(registrosGuardados);
    }, []);

    const hoy = new Date();
    const fechaHoy = hoy.toLocaleDateString("en-GB"); // Obtiene solo la fecha en formato "YYYY-MM-DD"

    const registrosFiltrados = filtroViaje === "0"
    ? registros.filter((registro) => registro.fecha === fechaHoy)
    : registros.filter((registro) => registro.fecha === fechaHoy && registro.viaje === filtroViaje);

    const abrirModalEdicion = (id) => {
        const registro = registros.find((r) => r.id === id);
        if (registro) {
        setRegistroEditando({ ...registro});
            setModalAbierto(true);
        }
    };

    const calcularResumen = () => {
        let totalPedidos = 0;
        let totalProductos = 0;
        let productosAgrupados = {};
    
        registrosFiltrados.forEach((registro) => {
            totalPedidos += registro.total;
            registro.productos.forEach((prod) => {
                totalProductos += prod.cantidad;
                if (productosAgrupados[prod.producto]) {
                    productosAgrupados[prod.producto] += prod.cantidad;
                } else {
                    productosAgrupados[prod.producto] = prod.cantidad;
                }
            });
        });
    
        setResumen({ totalPedidos, totalProductos, productosAgrupados });
        setModalResumenAbierto(true);
    };

    return(
        <div className="p-4">
            {!modalAbierto ? (
                <div>
                    {!modalTodoTiket ? (
                        <>
                            {!modalTiket ? (
                        <>
                            <div className="flex justify-between space-x-3 mb-4 pt-36">
                                <button
                                onClick={calcularResumen}
                                className="mb-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 print:hidden"
                                >
                                        Ver Resumen
                                </button>
                                <FiltrarViaje setFiltroViaje={setFiltroViaje} filtroViaje={filtroViaje} />
                            </div>
                            <RegistroPedidos registrosFiltrados={registrosFiltrados} setRegistros={setRegistros} registros={registros} abrirModalEdicion={abrirModalEdicion} setModalTiket={setModalTiket} setTiketImpreso={setTiketImpreso} pedidoActualizado={pedidoActualizado}  setPedidoActualizado={setPedidoActualizado} />
                            <ModalResumen modalResumenAbierto={modalResumenAbierto} setModalResumenAbierto={setModalResumenAbierto} productosSeleccionados={productosSeleccionados} setProductosSeleccionados={setProductosSeleccionados} resumen={resumen} setModalTodoTiket={setModalTodoTiket}/>
                        </>
                    ) : (
                        <>
                            <Ticket tiketImpreso={tiketImpreso} setModalTiket={setModalTiket} />
                        </>
                    )}
                        </>
                    ) : (
                        <>
                            <TodoTicket registrosFiltrados={registrosFiltrados} setModalTodoTiket={setModalTodoTiket} />
                        </>
                    )}
                    
                </div>
            ) : (
                <div>
                    <EditarPedido registroEditando={registroEditando} setModalAbierto={setModalAbierto} setRegistroEditando={setRegistroEditando} setRegistros={setRegistros} registros={registros} setPedidoActualizado={setPedidoActualizado} />
                </div>
            )}
        </div>
    )   
}

export default MostrarRegistros;