
const ModalResumen = ({modalResumenAbierto,setModalResumenAbierto,productosSeleccionados,setProductosSeleccionados,setFiltroViaje,resumen,setResumen,registrosFiltrados}) => {

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
    
    const toggleSeleccionProducto = (producto) => {
        setProductosSeleccionados((prev) => ({
            ...prev,
            [producto]: !prev[producto]
        }));
    };

    return(
        <>
            <div>
                <button
                onClick={calcularResumen}
                className="mb-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 print:hidden"
                >
                    Ver Resumen
                </button>
            </div>

            {modalResumenAbierto && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-12">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-100">
                        <h2 className="text-lg font-bold mb-4">Resumen de Pedidos</h2>
                        <p><strong>Total de Pedidos:</strong> ${resumen.totalPedidos.toFixed(2)}</p>
                        <p><strong>Total de Productos:</strong> {resumen.totalProductos}</p>
                        <h3 className="mt-4 font-bold mb-2">Productos Agrupados</h3>
                        <div className="max-h-72 overflow-y-auto border border-gray-300 rounded-md mb-2">
                            <table className="w-full border-collapse border border-gray-300 my-4">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 p-2">Producto</th>
                                        <th className="border border-gray-300 p-2">Cantidad Total</th>
                                        <th className="border border-gray-300 p-2">Seleccionar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(resumen.productosAgrupados)
                                        .map(([producto, cantidad]) => {
                                        // Extraemos el número de litros del nombre del producto
                                        const match = producto.match(/(\d+(\.\d+)?)/); // Busca un número (incluye decimales)
                                        const litros = match ? parseFloat(match[0]) : 0; // Convierte el número en float o usa 0 si no encuentra

                                        return { producto, cantidad, litros };
                                        })
                                        .sort((a, b) => b.litros - a.litros) // Ordena de mayor a menor por litros
                                        .map(({ producto, cantidad }, i) => (
                                        <tr key={i} className={productosSeleccionados[producto] ? "bg-green-200" : ""}>
                                            <td className="border border-gray-300 p-2">{producto}</td>
                                            <td className="border border-gray-300 p-2">{cantidad}</td>
                                            <td className="border border-gray-300 p-2 text-center">
                                                <input
                                                type="button"
                                                name="productoSeleccionado"
                                                value="O"
                                                onClick={() => toggleSeleccionProducto(producto)}
                                                checked={productosSeleccionados[producto] || false}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                        <button onClick={() => setModalResumenAbierto(false)} className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600">
                        Cerrar
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalResumen;