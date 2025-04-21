import { useState } from "react";

const AgregarCodigo = ({ productos, agregarProducto }) => {
    const [codigo, setCodigo] = useState("");
    
    const handleBuscarProducto = (e) => {
        if (e.key !== "Enter") return;

        const productoEncontrado = productos.find((p) => p.codigo === Number(codigo));
        if (!productoEncontrado) return alert("Producto no encontrado");

        agregarProducto(productoEncontrado);
        setCodigo(""); // Limpiar el input
    }

      return (
        <>
            <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            onKeyDown={handleBuscarProducto}
            placeholder="Ingresa el código y presiona Enter"
            className="p-2 border border-gray-300 rounded-md w-full"
            />
        </>
      )
}

export default AgregarCodigo;