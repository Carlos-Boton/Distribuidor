import { useState } from "react";
import { Cog6ToothIcon,XMarkIcon,LockClosedIcon    } from '@heroicons/react/24/outline'

const ModalResumen = ({modalResumenAbierto,setModalResumenAbierto,productosSeleccionados,setProductosSeleccionados,resumen,setModalTodoTiket}) => {
    const [seccionModal, setSeccionModal] = useState("resumen");
    const [pinNumber, setPinNumber] = useState("");
    const [pinCorrecto, setPinCorrecto] = useState(false);
    const [pinIncorrecto, setPinIncorrecto] = useState(false);
    
    const toggleSeleccionProducto = (producto) => {
        setProductosSeleccionados((prev) => ({
            ...prev,
            [producto]: !prev[producto]
        }));
    };

    const verPin = () => {
        if ( "6875" === pinNumber){
            setPinCorrecto(true)
            setPinNumber("")
        } else {
            setPinIncorrecto(true)
            setTimeout(() => {
                setPinIncorrecto(false);
            }, 500);
        }
    }

    console.log(pinNumber)

    const ocultarModal = () => {
        setModalResumenAbierto(false)
        setPinCorrecto(false)
        setPinNumber("")
        setSeccionModal("resumen")
    }

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
                            <button onClick={ocultarModal} className="bg-red-500 p-2 hover:bg-red-600">
                                <XMarkIcon className="h-8 w-8 text-black cursor-pointer" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-auto p-4">
                            { seccionModal === "resumen" ? (
                                <div className="h-full">
                                    <p className="text-xl">Total de Productos: <strong> {resumen.totalProductos} </strong> </p>
                                    <h3 className="mt-4 font-bold mb-2">Productos Agrupados</h3>
                                    <div className="h-[70%] overflow-y-auto border border-gray-300 rounded-md mb-2">
                                        <table className="w-full border-collapse border border-gray-300 my-4">
                                            <thead>
                                                <tr className="bg-gray-200">
                                                    <th className="border border-gray-300 p-2">#</th>
                                                    <th className="border border-gray-300 p-2">Producto</th>
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
                                                        <td className="border text-xl border-gray-300 p-2"><strong>{cantidad}</strong></td>
                                                        <td className="border text-xl border-gray-300 p-2">{producto}</td>
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
                                <div className="h-full p-2">
                                    <div className="flex justify-between mb-24" >
                                        <button
                                        onClick={() => setModalTodoTiket(true)}
                                        className="bg-red-500 rounded-md p-3 hover:bg-red-600"
                                        >
                                            imprimir todo
                                        </button>
                                        <button
                                        className="bg-green-500 rounded-md p-3 hover:bg-green-600"
                                        >
                                            acomodar viaje
                                        </button>
                                    </div>
                                    <div className="flex justify-center mb-12">
                                        <button
                                        onClick={verPin}
                                        className="bg-blue-500 rounded-md p-3 hover:bg-blue-600"
                                        >
                                            ver
                                        </button>
                                        <input
                                        value={pinNumber}
                                        onChange={(e) => setPinNumber(e.target.value)}
                                        className="border border-gray-300 ml-3 w-32"
                                        type="number" name="" id=""
                                        maxlength="4"
                                        placeholder="PIN"
                                        />
                                    </div>
                                    {pinCorrecto ? (
                                        <>
                                            <div className="text-center">
                                            <h1 className="text-2xl font-bold">
                                                Total
                                            </h1>
                                            <p className="text-5xl font-bold">{resumen.totalPedidos}</p>
                                        </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex justify-center">
                                                    <div className={`transition-all duration-1000 ease-in-out flex border-8 border-gray-600 items-center justify-center ${
                                                        pinIncorrecto ? " border-red-600" : ""
                                                    } w-24 h-24 text-gray-600`}>
                                                    <LockClosedIcon className={`transition-all duration-1000 ease-in-out flex flex-col items-center justify-center ${
                                                        pinIncorrecto ? "h-24 w-24 text-red-600" : ""
                                                    } w-16 h-16 text-gray-600`} />
                                                </div>
                                            </div>
                                        </>
                                    )}
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