import { useState, useEffect } from "react";

const ConsultarVentas = () =>{
    const [viajeFiltro, setViajeFiltro] = useState("0");
    const [registros, setRegistros] = useState([]);
    const [fechasUnicas, setFechasUnicas] = useState([]);
    const [pedidosFiltrados, setPedidosFiltrados] = useState([]);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [modalPedido, setModalPedido] = useState(null);
    const [vistaPedidos, setVistaPedidos] = useState(false);

    useEffect(() => {
        obtenerRegistroLocal();
    }, []);

    const obtenerRegistroLocal = () => {
        try {
            // Suponiendo que guardas tus pedidos en localStorage con una clave como "registros_semana"
            const registrosJSON = localStorage.getItem("registros");

            if (!registrosJSON) {
                console.log("No hay registros en el localStorage");
                setRegistros([]);
                setFechasUnicas([]);
                return;
            }

            const almacen = JSON.parse(registrosJSON);

            setRegistros(almacen);

            // Extraer fechas únicas desde los datos
            const fechas = [...new Set(almacen.map((r) => r.fecha))];
            setFechasUnicas(fechas);

        } catch (error) {
            console.error("Error al obtener registros locales:", error);
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
            {!vistaPedidos ? (
                <div>
                    <h3 className="text-lg font-semibold mt-2 mb-4">Fechas Registradas</h3>
                    <ul>
                        {fechasUnicas.map((fecha, index) => (
                            <li key={index} className="border border-gray-600 rounded-md p-2 flex justify-between mb-3">
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
                    <div className="flex justify-between space-x-3 mb-2">
                        <button
                        onClick={regresarAFechas}
                        className="mb-2 bg-red-700 text-white p-1 rounded"
                        >
                            Regresar
                        </button>
                        <h3 className="text-lg font-semibold">Pedidos del {fechaSeleccionada}</h3>
                    </div>
                    <label><strong>Filtrar por viaje:</strong></label>
                    <select value={viajeFiltro} onChange={(e) => filtrarPorViaje(e.target.value)}
                    className="border border-gray-500 rounded-md ml-2 p-1"
                    >
                        <option value="0">Todos</option>
                        {[...new Set(pedidosFiltrados.map((p) => p.viaje))].map((viaje) => (
                        <option key={viaje} value={viaje}>{viaje}</option>
                        ))}
                    </select>

                    <ul className="mt-4">
                        {pedidosFiltrados.map((pedido, index) => (
                        <li key={index} className="border border-gray-500 rounded-md p-2 flex justify-between mb-2">
                            <span><strong>Cliente: </strong>{pedido.cliente} - Viaje: {pedido.viaje}</span>
                            <button
                            onClick={() => setModalPedido(pedido)}
                            className="bg-green-500 text-white p-1 rounded"
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
                    <div className="bg-white p-4 rounded w-80">
                        <h3 className="text-lg font-bold">Detalles del Pedido</h3>
                        <div className="flex justify-between space-x-3 mb-2">
                            <p><strong>Cliente: </strong>{modalPedido.cliente}</p>
                            <p><strong>Viaje: </strong>{modalPedido.viaje}</p>
                        </div>
                        <p><strong>Total: </strong>{modalPedido.total}</p>
                        <table className="w-full border-collapse border border-gray-300 my-4">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 p-2">##</th>
                                    <th className="border border-gray-300 p-2">Producto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {modalPedido.productos.map((producto, i) => (
                                    <tr key={i} className="text-center">
                                        <td className="border border-gray-300 p-2">{producto.cantidad}</td>
                                        <td className="border border-gray-300 p-2">{producto.producto}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {modalPedido.mermas > [0] && (
                            <div>
                                <p><strong>Mermas:</strong></p>
                                <table className="w-full border-collapse border border-gray-300 my-4">
                                    <thead>
                                        <tr className="bg-red-300">
                                            <th className="border border-gray-300 p-2">##</th>
                                            <th className="border border-gray-300 p-2">Merma</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Vista de cada Merma del Pedido */}
                                        {modalPedido.mermas.map((merma, i) => (
                                            <tr key={i} className="text-center">
                                                <td className="border border-gray-300 p-2">{merma.cantidad}</td>
                                                <td className="border border-gray-300 p-2">{merma.descripcion}</td>
                                            </tr>
                                        ))}
                                        {/* Fin de Vista de cada Merma del Pedido */}
                                    </tbody>
                                </table>
                            </div>
                        )}
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