import { useState } from "react";
import Barcode from "react-barcode";
import TicketCodigoBarras from "./codeBarra";
import { PrinterIcon, PencilIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'



const GestionProductos = () => {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [codigo, setCodigo] = useState("")
    const [modalCode, setModalCode] = useState("");
    const [valorCode, setValorCode] = useState(null);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [actualizar, setActualizar] = useState(false);

    const regresar = () => {
        setCodigo("");
        setPrecio("");
        setNombre("");
        setModoEdicion(false);
    }

    const generarCodigoBarras = () => {
        let barra;
        do {
            barra = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        } while (productos.some((producto) => producto.barra === barra));
        setCodigo(barra)
    };

    const agregarProducto = () => {
        if (!nombre || !precio || !codigo) return;
        const nuevoProducto = {
        nombre,
        precio: parseFloat(precio),
        codigo: parseFloat(codigo),
        habilitado: true,
        };
        setProductos([...productos, nuevoProducto]);
        setNombre("");
        setPrecio("");
        setCodigo("");
        setModoEdicion(false)
    };

    const editarProducto = (index) => {
        setModoEdicion(index);
        setNombre(productos[index].nombre);
        setPrecio(productos[index].precio);
        setCodigo(productos[index].codigo);
        setActualizar(true);
        setModoEdicion(true);
    };

    const guardarEdicion = (index) => {
        const productosActualizados = [...productos];
        productosActualizados[index].nombre = nombre;
        productosActualizados[index].precio = parseFloat(precio);
        productosActualizados[index].codigo = parseFloat(codigo);
        setProductos(productosActualizados);
        setModoEdicion(false);
        setNombre("");
        setPrecio("");
        setCodigo("");
    };

    const toggleHabilitado = (index) => {
        const productosActualizados = [...productos];
        productosActualizados[index].habilitado = !productosActualizados[index].habilitado;
        setProductos(productosActualizados);
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
                    <div className="print:hidden">
                        <label>Nombre del producto</label>
                        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="p-2 border border-gray-300 mb-2 rounded-md w-full" />
                        <label>Precio</label>
                        <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} className="p-2 border border-gray-300 mb-2 rounded-md w-full" />
                        <label>Codigo</label>
                        <div className="flex space-x-3 mb-6">
                            <input type="number" placeholder="Codigo" value={codigo} onChange={(e) => setCodigo(e.target.value)} className="p-2 border border-gray-300 rounded-md w-full"/>
                            <button onClick={() => generarCodigoBarras()} className="bg-blue-500 text-white p-2 rounded-md">Generar</button>
                        </div>

                        <div className="flex justify-between space-x-3 mt-4">
                            <div>
                                { codigo && (
                                    <>
                                        <h2>
                                            <Barcode value={codigo} format="CODE128" />
                                        </h2>
                                    </>
                                )}
                            </div>
                            <div>
                                {actualizar ? (
                                    <>
                                        <button onClick={guardarEdicion} className="bg-green-500 text-white p-2 rounded-md">Actualizar</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={agregarProducto} className="bg-green-500 text-white p-2 rounded-md">Agregar</button>
                                    </>
                                )}
                                <button onClick={() => regresar()} className="bg-red-500 text-white p-2 rounded-md ml-2">Salir</button>
                            </div>
                        </div>
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
                                    <th className="border border-gray-300 p-2">Acciones</th>
                                    <th className="border border-gray-300 p-2">Nombre</th>
                                    <th className="border border-gray-300 p-2">Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((p, i) => (
                                    <tr key={i} className={!p.habilitado ? "bg-red-200" : ""}>
                                        <td className="border border-gray-300 p-2">
                                            <button onClick={() => toggleHabilitado(i)} className={`text-white p-1 mr-2 rounded-md ${
                                            p.habilitado ? "bg-red-600 hover:bg-red-700" : "bg-green-500 hover:bg-green-600"}`}>{p.habilitado ? (<><XCircleIcon className='h-6 w-6 text-white-500' /></>) : (<><CheckCircleIcon className='h-6 w-6 text-white-500' /></>)}</button>
                                            <button onClick={() => editarProducto(i)} className="bg-blue-500 text-white p-1 mr-2 rounded-md"><PencilIcon className="h-6 w-6 text-white-500" /></button>
                                            <button onClick={() => [setModalCode(true), setValorCode(p.codigo)]} className="bg-yellow-700 text-white p-1 rounded-md"><PrinterIcon className="h-6 w-6 text-white-500" /></button>
                                        </td>
                                        <td className="border border-gray-300 p-2">{p.nombre}</td>
                                        <td className="border border-gray-300 p-2">${p.precio}</td>
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
