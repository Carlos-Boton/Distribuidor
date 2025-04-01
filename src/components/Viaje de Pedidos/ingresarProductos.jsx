import { useState } from "react";

const IngresarProductos = ({handleAgregarProducto,productos,setModalOtro}) =>{
    const [codigo, setCodigo] = useState("");

    const handleBuscarProducto = (e) => {
        if (e.key !== "Enter") return;

        const productoEncontrado = productos.find((p) => p.codigo === codigo);
        if (!productoEncontrado) return alert("Producto no encontrado");

        handleAgregarProducto(productoEncontrado);
        setCodigo(""); // Limpiar el input
    }

    return(
        <>
            <button
            onClick={() => setModalOtro(true)}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            >
                Otro
            </button>
            <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                onKeyDown={handleBuscarProducto}
                placeholder="Ingresa el código y presiona Enter"
                className="p-2 border border-gray-300 rounded-md w-full"
            />
            <button
            // onClick={() => setModalProducto(true)}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
                    🔍
            </button>
        </>
    )
}

export default IngresarProductos;