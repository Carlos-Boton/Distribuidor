import { useState } from "react";
import { Cog6ToothIcon,XMarkIcon  } from '@heroicons/react/24/outline'

const ModalResumen = ({modalResumenAbierto,setModalResumenAbierto,productosSeleccionados,setProductosSeleccionados,resumen}) => {
    const [seccionModal, setSeccionModal] = useState("resumen");
    
    const toggleSeleccionProducto = (producto) => {
        setProductosSeleccionados((prev) => ({
            ...prev,
            [producto]: !prev[producto]
        }));
    };

    return(
        <>

            {modalResumenAbierto && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center pt-16">
                    <div className="bg-white w-[90%] h-[77%] rounded-lg overflow-hidden flex flex-col">
                        <div className="flex bg-gray-500 justify-between mb-4">
                            <button className={`px-4 ${seccionModal === "opciones" ? "bg-white font-bold" : "text-white"}`} onClick={() => setSeccionModal("opciones")}>
                                <Cog6ToothIcon className="h-8 w-8" />
                            </button>
                            <button className={`w-full text-lg font-bold ${seccionModal === "resumen" ? "bg-white" : "text-white"}`} onClick={() => setSeccionModal("resumen")}>
                                Resumen de pedidos
                            </button>
                            <button onClick={() => setModalResumenAbierto(false)} className="bg-red-500 p-2 hover:bg-red-600">
                                <XMarkIcon className="h-8 w-8 text-black cursor-pointer" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-auto p-4">
                            { seccionModal === "resumen" ? (
                                <div className="h-full">
                                    <p><strong>Total de Pedidos:</strong> ${resumen.totalPedidos.toFixed(2)}</p>
                                    <p><strong>Total de Productos:</strong> {resumen.totalProductos}</p>
                                    <h3 className="mt-4 font-bold mb-2">Productos Agrupados</h3>
                                    <div className="h-[70%] overflow-y-auto border border-gray-300 rounded-md mb-2">
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
                                </div>
                            ) : (
                                <div className="h-full">
                                    <button
                                    className="bg-red-500 rounded-md p-2"
                                    >
                                        imprimir todo
                                    </button>
                                    <button
                                    className="bg-green-500 rounded-md p-2"
                                    >
                                        acomodar viaje
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalResumen;