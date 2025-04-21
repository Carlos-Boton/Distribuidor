import { useState } from "react";


const RegistroPedidos = ({registrosFiltrados,setRegistros,registros,abrirModalEdicion,setModalTiket,setTiketImpreso,pedidoActualizado,setPedidoActualizado}) => {

    const [preguntaEliminar, setPreguntaEliminar] = useState(false);
    const [eliminado, setEliminado] = useState(false);
    const [eliminarId, setEliminarId] = useState(0);
    // Función para mover un registro hacia arriba usando el id
    const moverArriba = (id) => {
        const index = registros.findIndex((registro) => registro.id === id);
        if (index > 0) {
            const nuevosRegistros = [...registros];
            [nuevosRegistros[index], nuevosRegistros[index - 1]] = [nuevosRegistros[index - 1], nuevosRegistros[index]];
            setRegistros(nuevosRegistros);
            localStorage.setItem("registros", JSON.stringify(nuevosRegistros)); // Guardar cambios en localStorage
        }
    };
    
    // Función para mover un registro hacia abajo usando el id
    const moverAbajo = (id) => {
        const index = registros.findIndex((registro) => registro.id === id);
        if (index < registros.length - 1) {
            const nuevosRegistros = [...registros];
            [nuevosRegistros[index], nuevosRegistros[index + 1]] = [nuevosRegistros[index + 1], nuevosRegistros[index]];
            setRegistros(nuevosRegistros);
            localStorage.setItem("registros", JSON.stringify(nuevosRegistros)); // Guardar cambios en localStorage
        }
    };
  
    // Elimiar Registro de Pedido
    const eliminarRegistro = (id) => {
        setEliminarId(id)
        setPreguntaEliminar(true);
    };

    // Fin de Eliminar Registro de Pedido
    const Eliminacion = (valor) =>{
        const nuevosRegistros = registros.filter((registro) => registro.id !== valor);
        setRegistros(nuevosRegistros);
        localStorage.setItem("registros", JSON.stringify(nuevosRegistros));
        setPreguntaEliminar(false);
        setEliminado(true);
    }

    const marcarComoEntregado = (id) => {
        const nuevosRegistros = [...registros];
        const registro = nuevosRegistros.find((r) => r.id === id);
        if (registro) {
            registro.entregado = !registro.entregado
        }
    
        // Ordenar: los no entregados primero, los entregados al final
        nuevosRegistros.sort((a, b) => (a.entregado === b.entregado ? 0 : a.entregado ? 1 : -1));
    
        setRegistros(nuevosRegistros);
        localStorage.setItem("registros", JSON.stringify(nuevosRegistros));
    };

    const tiketEnviado = (id) => {
        const registro = registros.find((r) => r.id === id);
        if (registro) {
            setTiketImpreso({ ...registro });
            setModalTiket(true);
        }
    };

    // inicio de Vista de Pedidos
    return(
        <>
            {/* Preguntamos si tenermos algo en registroFiltrado */}
            {registrosFiltrados.length === 0 ? (
                <div className="mb-4 p-4 border rounded-lg shadow-md">
                    <p>No hay registros guardados</p>
                </div>

            ) : (
                <div>
                    {registrosFiltrados.map((registro) => (

                        // Pregunramos si esta entregado
                        <div key={registro.id} className={`mb-4 p-4 border rounded-lg shadow-md ${registro.entregado ? "bg-green-200" : "bg-white"}`}>
                            <div className="flex justify-between space-x-3 mb-3">
                                <p className="text-2xl"><strong>Cliente:</strong>
                                {/* Vista del Cliente en Pedido */}
                                {registro.cliente}</p>
                                <p className="text-2xl"><strong>viaje:</strong>
                                {/* Vista de Viaje en Pedido */}
                                {registro.viaje}</p>
                            </div>

                            {/* Botón para mover el registro hacia arriba  */}
                            <button
                            onClick={() => moverArriba(registro.id)}
                            className="bg-blue-300 text-white p-2 rounded-md hover:bg-blue-500 ml-2 mr-4">
                                ▲
                            </button>

                            {/* Botón para mover el registro hacia abajo  */}
                            <button
                            onClick={() => moverAbajo(registro.id)}
                            className="bg-blue-300 text-white p-2 rounded-md hover:bg-blue-500">
                                ▼
                            </button>

                            <p><strong>Productos:</strong></p>
                            {/* Tabla de productos */}
                            <table className="w-full border-collapse border border-gray-300 my-4">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 p-2">##</th>
                                        <th className="border border-gray-300 p-2">Producto</th>
                                        <th className="border border-gray-300 p-2">Precio</th>
                                        <th className="border border-gray-300 p-2">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Vista de cada producto del pedido */}
                                    {registro.productos.map((prod, i) => (
                                        <tr key={i} className="text-center">
                                            <td className="border border-gray-300 p-2">{prod.cantidad}</td>
                                            <td className="border border-gray-300 p-2">{prod.producto}</td>
                                            <td className="border border-gray-300 p-2">${prod.precio.toFixed(2)}</td>
                                            <td className="border border-gray-300 p-2">${(prod.cantidad * prod.precio).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                    {/* Fin de Vista de cada Producto del Pedido */}
                                </tbody>
                            </table>
                            {/* Fin de tabla de productos */}

                            {/* Vista del Total */}
                            <p className="text-3xl"><strong>Total:</strong> ${registro.total}</p>

                            {/* Preguntamos si tenemos merma */}
                            {registro.mermas > [0] && (
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
                                            {registro.mermas.map((merma, i) => (
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
                            {/* Vista de Fecha */}
                            <p><strong>Fecha:</strong> {registro.fecha}</p>
                            {/* Boton para Marcar como Entregado */}
                            <button
                            onClick={() => marcarComoEntregado(registro.id)}
                            className={`p-2 rounded-md text-white mr-2 mb-2 ${
                            registro.entregado ? "bg-green-600 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-600"
                            }`}>
                            {registro.entregado ? "Desentregar" : "Entregado"}
                            </button>
                            {/* Boton de Editar Pedido */}
                            <button
                            onClick={() => abrirModalEdicion(registro.id)}
                            className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 mr-2">
                                Editar
                            </button>
                            <button
                            onClick={() => tiketEnviado(registro.id)}
                            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mr-2">
                                imprimir
                            </button>
                            {/* Boton de Eliminar Pedido */}
                            <button
                            onClick={() => eliminarRegistro(registro.id)}
                            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {pedidoActualizado && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
                        <h2 className="text-3xl font-semibold mb-4 text-gray-800">¡Pedido Actualizado!</h2>
                        <p className="text-gray-700 mb-6">El pedido se ha actualizado con exito!!</p>
                        <button
                            onClick={() => setPedidoActualizado(false)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            )}

            {preguntaEliminar && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
                        <h2 className="text-3xl font-semibold mb-4 text-gray-800">¡Eliminar!</h2>
                        <p className="text-gray-700 mb-6">¿Estas seguro de Eliminar el pedido?</p>
                        <button onClick={() => Eliminacion(eliminarId)} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition mr-3">
                            Eliminar
                        </button>
                        <button
                        onClick={() => setPreguntaEliminar(false)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {eliminado && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
                        <h2 className="text-3xl font-semibold mb-4 text-gray-800">¡Pedido Eliminado!</h2>
                        <p className="text-gray-700 mb-6">El pedido se ha Eliminado con exito!!</p>
                        <button
                        onClick={() => setEliminado(false)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            )}

        </>
    )
}

// Exportando RegistroPedidos
export default RegistroPedidos;