import { useState } from "react";
import { XMarkIcon,Cog6ToothIcon } from '@heroicons/react/24/outline'


const ModalOtro = ({modalOtro,setModalOtro,setRegistroEditando,registroEditando,eliminarRegistro}) =>{
    const [seccionModal, setSeccionModal] = useState("producto");
    const [nuevaMerma, setNuevaMerma] = useState({ cantidad: 1, descripcion: "" });
    const [nuevoCliente, setNuevoCliente] = useState(null);
    const [nuevoProducto, setNuevoProducto] = useState({ cantidad: 1, producto: "", precio: "" });

    const agregarProductoEspecial = () => {
        if (!nuevoProducto.producto.trim() || isNaN(nuevoProducto.precio) || nuevoProducto.precio <= 0) {
          return alert("Por favor, ingresa un nombre y un precio válido.");
        }
    
        setRegistroEditando((prevRegistro) => {
            const productoEspecial = {
                codigo: `esp-${Date.now()}`,
                producto: nuevoProducto.producto,
                precio: parseFloat(nuevoProducto.precio),
                cantidad: parseInt(nuevoProducto.cantidad),
                subtotal: parseFloat(nuevoProducto.precio) * parseInt(nuevoProducto.cantidad),
            };
    
            const productosActualizados = [...prevRegistro.productos, productoEspecial]
            const nuevoTotal = prevRegistro.total + productoEspecial.subtotal;

            return {
                ...prevRegistro,
                productos: productosActualizados,
                total: nuevoTotal
            };
        });
        setNuevoProducto({ cantidad: 1, producto: "", precio: "" });
        setModalOtro(false);
    };

    const agregarMerma = () => {
        if (!nuevaMerma.descripcion.trim() || nuevaMerma.cantidad <= 0) {
          return alert("Por favor, ingresa una descripción y cantidad válida.");
        }

        setRegistroEditando((prevRegistro) => {
      
            const mermaActualizados = [...prevRegistro.mermas, nuevaMerma]

            return {
                ...prevRegistro,
                mermas: mermaActualizados,
            };
        });
        setNuevaMerma({ cantidad: 1, descripcion: "" });
        setModalOtro(false);
    };

    const agregarOtroCliente = () => {
        if (!nuevoCliente?.trim()) {
            return alert("Por favor, ingresa una descripción y cantidad válida.");
        }

        setRegistroEditando((prevRegistro) => {

            const clienteActualizados =  nuevoCliente;

            return {
                ...prevRegistro,
                cliente: clienteActualizados,
            };
        });
    
        setModalOtro(false);
        setNuevoCliente("");
    };

    return(
        <>
            {modalOtro && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-[90%] h-[30%] rounded-lg overflow-hidden flex flex-col">
                        <div className="bg-gray-600 flex justify-between mb-4">
                            <button className={`p-2 ${seccionModal === "opcion" ? "font-bold bg-white" : "bg-blue-600 text-white"}`} onClick={() => setSeccionModal("opcion")}>
                                <Cog6ToothIcon className="h-8 w-8" />
                            </button>
                            <button className={`p-2 w-full ${seccionModal === "producto" ? "font-bold bg-white" : "text-white"}`} onClick={() => setSeccionModal("producto")}>
                                    Producto
                            </button>
                            <button className={`p-2 w-full ${seccionModal === "merma" ? "font-bold bg-white" : "text-white"}`} onClick={() => setSeccionModal("merma")}>
                                Merma
                            </button>
                            <button className={`p-2 w-full ${seccionModal === "cliente" ? "font-bold bg-white" : "text-white"}`} onClick={() => setSeccionModal("cliente")}>
                                Cliente
                            </button>
                            <button onClick={() => setModalOtro(false)} className="bg-red-500 text-white p-2 hover:bg-red-500">
                                <XMarkIcon className="h-8 w-8 text-black cursor-pointer" />
                            </button>
                        </div>
                        <div className="p-4">
                            { seccionModal === "opcion" ? (
                                <>
                                    <button
                                    onClick={() => eliminarRegistro(registroEditando.id)}
                                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
                                        Eliminar
                                    </button>
                                </>
                            ) : seccionModal === "producto" ? (
                                <>  
                                    <label>Producto Especial</label>
                                    <input
                                        type="text"
                                        value={nuevoProducto.producto}
                                        onChange={(e) => setNuevoProducto({ ...nuevoProducto, producto: e.target.value })}
                                        className="p-2 border w-full mb-2"
                                        placeholder="Producto Especial" 
                                    />
                                    <div className="flex space-x-4">
                                        <div className="p-2 w-1/2">
                                            <label>Cantidad</label>
                                            <input
                                                type="number"
                                                value={nuevoProducto.cantidad}
                                                onChange={(e) => setNuevoProducto({ ...nuevoProducto, cantidad: e.target.value })}
                                                className="p-2 border w-full"
                                            />
                                        </div>
                                        <div className="p-2 w-1/2">
                                            <label>Precio</label>
                                            <input
                                                type="number"
                                                value={nuevoProducto.precio}
                                                onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
                                                className="p-2 border w-full"
                                                placeholder="Precio"
                                            />
                                        </div>
                                    </div>
                                    <button
                                    onClick={agregarProductoEspecial}
                                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 w-full mb-2"
                                    >
                                        Agregar
                                    </button>
                                </>
                            ) : seccionModal === "merma" ? (
                                <>
                                    <label>Producto Merma</label>
                                    <input type="text"
                                        value={nuevaMerma.descripcion}
                                        onChange={(e) => setNuevaMerma({ ...nuevaMerma, descripcion: e.target.value })}
                                        className="p-2 border w-full mb-2"
                                        placeholder="Producto Merma" 
                                    />
                                    <label>Cantidad</label>
                                    <input
                                        type="number"
                                        value={nuevaMerma.cantidad}
                                        onChange={(e) => setNuevaMerma({ ...nuevaMerma, cantidad: e.target.value })}
                                        className="p-2 border w-full mb-2"
                                    />
                                    <button
                                    onClick={agregarMerma}
                                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 w-full mb-2"
                                    >
                                        Agregar
                                    </button>
                                </>
                            ) : (
                                <>
                                    <label>Cliente</label>
                                    <input type="text"
                                        value={nuevoCliente}
                                        onChange={(e) => setNuevoCliente(e.target.value)}
                                        className="p-2 border w-full mb-2"
                                        placeholder="Cliente" 
                                    />

                                    <button
                                    onClick={agregarOtroCliente}
                                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 w-full mb-2"
                                    >
                                        Agregar
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default ModalOtro;