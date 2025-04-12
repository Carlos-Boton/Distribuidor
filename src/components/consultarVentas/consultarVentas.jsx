import { useState, useEffect } from "react";
import { db } from "../firebase/data";
import { collection, getDocs, query, orderBy } from "firebase/firestore";


const ConsultarVentas = () =>{
    const [registros, setRegistros] = useState([]);
  const [fechasUnicas, setFechasUnicas] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);
  const [viajeFiltro, setViajeFiltro] = useState("0");
  const [modalPedido, setModalPedido] = useState(null);
  const [vistaPedidos, setVistaPedidos] = useState(false);

    useEffect(() => {
        obtenerRegistro();
    }, []);

    const obtenerRegistro = async () => {
        try {
          const registroRef = collection(db, "registros");
          const q = query(registroRef, orderBy("fecha", "desc"));
          const resp = await getDocs(q);
      
          const registrosObtenidos = resp.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
      
          setRegistros(registrosObtenidos);
      
          // Extraer fechas únicas desde los datos
          const fechas = [...new Set(registrosObtenidos.map((r) => r.fecha))];
          setFechasUnicas(fechas);
      
        } catch (error) {
          console.error("Error al obtener registros:", error);
        }
      };

  const seleccionarFecha = (fecha) => {
    setFechaSeleccionada(fecha);
    setPedidosFiltrados(registros.filter((r) => r.fecha === fecha));
    setVistaPedidos(true);
  };

  const regresarAFechas = () => {
    setVistaPedidos(false);
    setFechaSeleccionada(null);
  };

  const filtrarPorViaje = (viaje) => {
    setViajeFiltro(viaje);
    if (viaje === "0") {
      setPedidosFiltrados(registros.filter((r) => r.fecha === fechaSeleccionada));
    } else {
      setPedidosFiltrados(
        registros.filter((r) => r.fecha === fechaSeleccionada && r.viaje === viaje)
      );
    }
  };

  return (
    <div className="p-4 pt-36">
      <h2 className="text-xl font-bold">Registro de Pedidos</h2>
      {!vistaPedidos ? (
        <div>
          <h3 className="text-lg font-semibold mt-4">Fechas Registradas</h3>
          <ul>
            {fechasUnicas.map((fecha, index) => (
              <li key={index} className="border p-2 flex justify-between mb-2">
                <span>{fecha}</span>
                <button
                  onClick={() => seleccionarFecha(fecha)}
                  className="bg-blue-500 text-white p-1 rounded"
                >
                  Ver

                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-4">
          <button
            onClick={regresarAFechas}
            className="mb-2 bg-gray-500 text-white p-1 rounded"
          >
            Regresar
          </button>
          <h3 className="text-lg font-semibold">Pedidos del {fechaSeleccionada}</h3>
          <label>Filtrar por viaje:</label>
          <select value={viajeFiltro} onChange={(e) => filtrarPorViaje(e.target.value)}>
            <option value="0">Todos</option>
            {[...new Set(pedidosFiltrados.map((p) => p.viaje))].map((viaje) => (
              <option key={viaje} value={viaje}>{viaje}</option>
            ))}
          </select>

          <ul className="mt-4">
            {pedidosFiltrados.map((pedido, index) => (
              <li key={index} className="border p-2 flex justify-between mb-2">
                <span>Cliente: {pedido.cliente} - Viaje: {pedido.viaje}</span>
                <button
                  onClick={() => setModalPedido(pedido)}
                  className="bg-gray-500 text-white p-1 rounded"
                >
                  Ver
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {modalPedido && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded w-1/2">
            <h3 className="text-lg font-bold">Detalles del Pedido</h3>
            <p>Cliente: {modalPedido.cliente}</p>
            <p>Viaje: {modalPedido.viaje}</p>
            <p>Total: {modalPedido.total}</p>
            <h4 className="font-bold">Productos:</h4>
            <ul>
              {modalPedido.productos.map((producto, i) => (
                <li key={i}>{producto.producto} - Cantidad: {producto.cantidad}</li>
              ))}
            </ul>
            <h4 className="font-bold">Merma:</h4>
            <ul>
              {modalPedido.mermas.map((merma, i) => (
                <li key={i}>{merma.descripcion} - Cantidad: {merma.cantidad}</li>
              ))}
            </ul>
            <button
              onClick={() => setModalPedido(null)}
              className="mt-2 bg-red-500 text-white p-1 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultarVentas;