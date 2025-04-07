import { useState, useEffect } from "react";
import ModalResumen from "./modalResumen";
import RegistroPedidos from "./registroPedidos";
import EditarPedido from "./EditarPedido";
import FiltrarViaje from "./filtrarViaje";
import Ticket from "../ticket/Ticket";

const MostrarRegistros = () =>{
  const [registros, setRegistros] = useState([]);
  const [modalResumenAbierto, setModalResumenAbierto] = useState(false);
  const [productosSeleccionados, setProductosSeleccionados] = useState({});
  const [filtroViaje, setFiltroViaje] = useState("0"); // Estado del filtro
  const [registroEditando, setRegistroEditando] = useState(null);
  const [modalTiket, setModalTiket] = useState(false);
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

  return(
    <div className="p-4">
        {!modalAbierto ? (
            <div>
                {!modalTiket ? (
                  <>
                  <div className="flex justify-between space-x-3 mb-4 pt-36">
                <ModalResumen modalResumenAbierto={modalResumenAbierto} setModalResumenAbierto={setModalResumenAbierto} productosSeleccionados={productosSeleccionados} setProductosSeleccionados={setProductosSeleccionados} setFiltroViaje={setFiltroViaje} resumen={resumen} setResumen={setResumen} registrosFiltrados={registrosFiltrados} />
                <FiltrarViaje setFiltroViaje={setFiltroViaje} filtroViaje={filtroViaje} />
              </div>
                    <RegistroPedidos registrosFiltrados={registrosFiltrados} setRegistros={setRegistros} registros={registros} abrirModalEdicion={abrirModalEdicion} setModalTiket={setModalTiket} setTiketImpreso={setTiketImpreso} />
                  </>
                ) : (
                  <>
                    <Ticket tiketImpreso={tiketImpreso} setModalTiket={setModalTiket} />
                  </>
                )}
            </div>
        ) : (
            <div>
              <EditarPedido registroEditando={registroEditando} setModalAbierto={setModalAbierto} setRegistroEditando={setRegistroEditando} setRegistros={setRegistros} registros={registros} />
            </div>
        )}
    </div>

  )   
}

export default MostrarRegistros;