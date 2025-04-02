import { useState } from "react";
import TicketCodigoBarras from "./codeBarra";

const generarCodigoBarras = (productos) => {
    let codigo;
    do {
        codigo = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    } while (productos.some((producto) => producto.codigo === codigo));
    return codigo;
};

const GestionProductos = () => {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [modalCode, setModalCode] = useState("");
    const [valorCode, setValorCode] = useState(null);
    const [modoEdicion, setModoEdicion] = useState(false);

    const agregarProducto = () => {
        if (!nombre || !precio) return;
        const nuevoProducto = {
        nombre,
        precio: parseFloat(precio),
        codigo: generarCodigoBarras(productos),
        habilitado: true,
        };
        setProductos([...productos, nuevoProducto]);
        setNombre("");
        setPrecio("");
        setModoEdicion(false)
    };

    const editarProducto = (index) => {
        setModoEdicion(index);
        setNombre(productos[index].nombre);
        setPrecio(productos[index].precio);
    };

    const guardarEdicion = (index) => {
        const productosActualizados = [...productos];
        productosActualizados[index].nombre = nombre;
        productosActualizados[index].precio = parseFloat(precio);
        setProductos(productosActualizados);
        setModoEdicion(null);
        setNombre("");
        setPrecio("");
    };

    const toggleHabilitado = (index) => {
        const productosActualizados = [...productos];
        productosActualizados[index].habilitado = !productosActualizados[index].habilitado;
        setProductos(productosActualizados);
    };

    const imprimirCodigo = (codigo) => {
        const ventana = window.open("", "_blank");

    };

  return (
    <div>
        {modalCode ? (
            <>
                <TicketCodigoBarras valorCode={valorCode} setModalCode={setModalCode} />
            </>   
        ) : (
            <div className="p-4 pt-36">
                {modoEdicion ? (
                    <>
                    <div className="mb-4 print:hidden">
                        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="border p-2 mr-2" />
                        <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} className="border p-2 mr-2" />
                        <button onClick={agregarProducto} className="bg-green-500 text-white p-2 rounded-md">Agregar</button>
                        <button onClick={() => setModoEdicion(false)} className="bg-red-500 text-white p-2 rounded-md">Salir</button>
                    </div>
                    </>
                ) : (
                    <div>
                        <button onClick={() => setModoEdicion(true)} className="bg-blue-500 text-white p-2 rounded-md mb-4">
                            Nuevo
                        </button>
                        <h3 className="mt-4 font-bold">Lista de Productos</h3>
                        <table className="w-full border-collapse border border-gray-300 my-4">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 p-2">Nombre</th>
                                    <th className="border border-gray-300 p-2">Precio</th>
                                    <th className="border border-gray-300 p-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((p, i) => (
                                    <tr key={i} className={!p.habilitado ? "bg-red-200" : ""}>
                                        <td className="border border-gray-300 p-2">{p.nombre}</td>
                                        <td className="border border-gray-300 p-2">${p.precio}</td>
                                        <td className="border border-gray-300 p-2 flex gap-2">
                                            <button onClick={() => toggleHabilitado(i)} className="bg-red-500 text-white p-1 rounded-md">{p.habilitado ? "Incativo" : "Activo"}</button>
                                            <button onClick={() => editarProducto(i)} className="bg-blue-500 text-white p-1 rounded-md">Editar</button>
                                            <button onClick={() => [setModalCode(true), setValorCode(p.codigo)]} className="bg-green-700 text-white p-1 rounded-md">Imprimir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        )}
    </div>
  );
};

export default GestionProductos;
