import { useState } from "react";
import { XMarkIcon  } from '@heroicons/react/24/outline'

const BuscarProducto = ({ productos, modalAbierto, setModalAbierto, agregarProducto }) => {
    const [busqueda, setBusqueda] = useState("");

    const productosFiltrados = productos.filter(
        (p) =>
        p.producto.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.precio.toString().includes(busqueda)
    );

    return(
        <>
            {modalAbierto && (
                <div className="fixed inset-0 bg-black bg-opacity-50 pt-36 flex justify-center items-start">
                    <div
                        className="bg-white w-[90vh] max-h-[80vh] overflow-y-auto rounded-xl shadow-lg"
                        dir="rtl"
                    >
                        <div dir="ltr" className="bg-gray-500 flex justify-between">
                            <h3 className="text-xl text-white px-8 py-4 font-semibold">Buscar Productos</h3>
                            <button onClick={() => setModalAbierto(false)} className="bg-red-500 p-2 hover:bg-red-600">
                                <XMarkIcon className="h-8 w-8 text-black cursor-pointer" />
                            </button>
                        </div>

                        <div dir="ltr" className="p-4 overflow-y-auto max-h-[70vh]">

                            <input
                            type="text"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Buscar por nombre, categoría o precio"
                            className="p-2 border border-gray-300 rounded-md w-full mb-4"
                            />
                            <ul className="space-y-2">
                                {productosFiltrados.map(({ codigo, producto, precio }) => (
                                    <li key={codigo} className="flex justify-between items-center p-2 border border-gray-200 rounded-md">
                                        <span>
                                            {producto} - ${precio}
                                        </span>
                                        <button
                                        onClick={() => agregarProducto({ codigo, producto, precio })}
                                        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                                        >
                                            ➕
                                        </button>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default BuscarProducto;