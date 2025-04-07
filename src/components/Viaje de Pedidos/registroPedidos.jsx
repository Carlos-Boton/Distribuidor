

const RegistroPedidos = ({registrosFiltrados,setRegistros,registros,abrirModalEdicion,setModalTiket,setTiketImpreso}) => {
    
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
        const nuevosRegistros = registros.filter((registro) => registro.id !== id);
        setRegistros(nuevosRegistros);
        localStorage.setItem("registros", JSON.stringify(nuevosRegistros));
        alert("Registro eliminado.");
    };
    // Fin de Eliminar Registro de Pedido

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

                                <button
      onClick={() => moverArriba(registro.id)}
      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mr-2">
      Subir
    </button>

    {/* Botón para mover el registro hacia abajo */}
    <button
      onClick={() => moverAbajo(registro.id)}
      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
      Bajar
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
                                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mr-2">
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
        </>
    )
}

// Exportando RegistroPedidos
export default RegistroPedidos;