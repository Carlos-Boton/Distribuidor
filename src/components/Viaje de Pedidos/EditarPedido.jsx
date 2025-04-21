import { useState,useEffect } from "react";
import { db } from "../firebase/data";
import { collection, getDocs } from "firebase/firestore";
import GuardarCancelar from "./guardarCancelar";
import IngresarProductos from "./ingresarProductos";
import ModalOtro from "./modalOtro";
import BuscarProducto from "./buscarProducto";


const EditarPedido = ({setModalAbierto,registroEditando,setRegistroEditando,registros,setRegistros,setPedidoActualizado}) => {

    const [modalOtro, setModalOtro] = useState(false);
    const [viaje, setViaje] = useState(registroEditando.viaje);
    const [productos, setProductos] = useState([]);
    const [modalProducto, setModalProducto] = useState(false);

    registroEditando.viaje = viaje;

    useEffect(() => {
        const productosRef = collection(db, "productos");
        getDocs(productosRef)
        .then((resp) => {
            setProductos(
                resp.docs.map((doc) => {
                return { ...doc.data(), id: doc.id}
                })
            )
        })
    }, [])

    // Eliminar Merma
    const handleEliminarMerma = (index) => {
        setRegistroEditando((prevRegistro) => {
            const nuevasMermas = prevRegistro.mermas.filter((_, i) => i !== index);
            return {
                ...prevRegistro,
                mermas: nuevasMermas
            };
        });
    };
    // Fin de Eliminar Merma

    //   Eliminar Producto
    const handleEliminarProducto = (codigoProducto) => {
        setRegistroEditando((prevRegistro) => {
            const productosFiltrados = prevRegistro.productos.filter((p) => p.codigo !== codigoProducto);
            const nuevoTotal = productosFiltrados.reduce((acc, p) => acc + p.subtotal, 0);
            
            return {
                ...prevRegistro,
                productos: productosFiltrados,
                total: nuevoTotal
            };
        });
    };
    // Fin Eliminar Merma

    const handleAgregarProducto = (nuevoProducto) => {
        setRegistroEditando((prevRegistro) => {
    
            const existe = prevRegistro.productos.find((p) => p.codigo === nuevoProducto.codigo);

            let productosActualizados;
            let nuevoTotal;

            if (existe) {
                productosActualizados = prevRegistro.productos.map((p) =>
                    p.codigo === nuevoProducto.codigo
                        ? { 
                            ...p, 
                            cantidad: p.cantidad + 1, 
                            subtotal: (p.cantidad + 1) * p.precio 
                          }
                        : p
                );
                nuevoTotal = prevRegistro.total + nuevoProducto.precio;
                setModalProducto(false);
            } else {
                productosActualizados = [...prevRegistro.productos, { ...nuevoProducto, cantidad: 1, subtotal: nuevoProducto.precio }];
                nuevoTotal = prevRegistro.total + nuevoProducto.precio;
                setModalProducto(false);
            }

            return {
                ...prevRegistro,
                productos: productosActualizados,
                total: nuevoTotal
            };

        });
    };

    // Inicio de Vista de Editar Pedido
    return (
        <>
            <div className="pt-36">
                <p className="text-xl mb-2"><strong>Cliente:</strong> {registroEditando.cliente}</p>
                <div className="flex space-x-3 mb-4">
                    <IngresarProductos handleAgregarProducto={handleAgregarProducto} setModalOtro={setModalOtro} productos={productos} setModalProducto={setModalProducto} />
                </div>
                <div className="flex justify-between space-x-3 mb-3">
                    <h3 className="text-lg font-semibold mt-4">Total: ${registroEditando.total}</h3>
                    <select value={viaje} onChange={(e) => setViaje(e.target.value)} className="rounded-md border border-gray-400 p-2 mr-2">
                        <option value="0">Venta</option>
                        <option value="1">Viaje 1</option>
                        <option value="2">Viaje 2</option>
                        <option value="3">Viaje 3</option>
                        <option value="4">Viaje 4</option>
                        <option value="5">Vieje 5</option>
                    </select>
                </div>
                <label className="block">Productos:</label>
                {/* Editar Productos */}
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Quit</th>
                            <th className="border p-2">##</th>
                            <th className="border p-2">Nombre</th>
                            <th className="border p-2">Precio</th>
                            <th className="border p-2">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registroEditando.productos.map((producto) => (
                            <tr key={producto.codigo}>
                                <td className="border p-2">
                                    <button
                                    onClick={() => handleEliminarProducto(producto.codigo)}
                                    className="text-red-500 hover:text-red-600"
                                    >
                                    ❌
                                    </button>
                                </td>
                                <td className="border p-2">{producto.cantidad}</td>
                                <td className="border p-2">{producto.producto}</td>
                                <td className="border p-2">${producto.precio}</td>
                                <td className="border p-2">${producto.subtotal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Fin de Editar Productos */}

                {/* Editar Mermas */}
                <label className="block">Mermas:</label>
                
                {registroEditando.mermas > [0] && (
                    <ul>
                        {registroEditando.mermas.map((merma, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center p-2 border border-gray-200 rounded-md"
                            >
                                <span>
                                {merma.descripcion} - Cantidad: {merma.cantidad}
                                </span>
                                <button
                                onClick={() => handleEliminarMerma(index)}
                                className="text-red-500 hover:text-red-600"
                                >
                                ❌
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                {/* Fin de Editar Mermas */}

                <GuardarCancelar setModalAbierto={setModalAbierto} registroEditando={registroEditando} setRegistros={setRegistros} registros={registros} setPedidoActualizado={setPedidoActualizado} />

                <BuscarProducto productos={productos} setModalProducto={setModalProducto} modalProducto={modalProducto} handleAgregarProducto={handleAgregarProducto} />

                <ModalOtro modalOtro={modalOtro} setModalOtro={setModalOtro} setRegistroEditando={setRegistroEditando} />
            </div>
        </>
    )
}
// Fin de Vista de Editar Pedido

// Exportar la Vista
export default EditarPedido;