import { useState } from "react";

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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center pt-36">
                    <div className="bg-white p-6 rounded-md w-96 max-h-[80%] overflow-auto">
                        <div className="flex justify-between space-x-3 mb-4">
                            <h3 className="text-lg font-semibold">Buscar Productos</h3>
                            <button onClick={() => setModalAbierto(false)} className="text-red-500 hover:text-red-600">
                                ❌
                            </button>
                        </div>
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
                        <button onClick={() => setModalAbierto(false)} className="mt-4 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 w-full">
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default BuscarProducto;