import { useState } from "react";
import { XMarkIcon  } from '@heroicons/react/24/outline'


const ModalOtro = ({ modalOtroAbierto, setModalOtroAbierto, setClienteSeleccionado, setProductosSeleccionados, setTotal, setMermas,setModalEvento,setViaje,viaje,setDireccionSeleccionado}) => {
    const [seccionModal, setSeccionModal] = useState("producto");
    const [nuevoProducto, setNuevoProducto] = useState({ cantidad: 1, producto: "", precio: "" });
    const [direccion, setDireccion] = useState("");
    const [nuevaMerma, setNuevaMerma] = useState({ cantidad: 1, descripcion: "" });
    const [nuevoCliente, setNuevoCliente] = useState("");

    const agregarOtroCliente = () => {
        if (!nuevoCliente?.trim()) {
            return alert("Por favor, ingresa una descripción y cantidad válida.");
        }
    
        const clienteOtro = nuevoCliente

        setClienteSeleccionado (clienteOtro);
        setModalOtroAbierto(false);
        setNuevoCliente("");
    };

    const agregarDireccion = () => {
        if (!direccion?.trim()) {
            return alert("Por favor, ingresa una descripción y cantidad válida.");
        }
    
        const estaDireccion = direccion

        setDireccionSeleccionado(estaDireccion);
        setModalOtroAbierto(false);
        setDireccion("");
    };

    const agregarProductoEspecial = () => {
        if (!nuevoProducto.producto.trim() || isNaN(nuevoProducto.precio) || nuevoProducto.precio <= 0) {
          return alert("Por favor, ingresa un nombre y un precio válido.");
        }
    
        const productoEspecial = {
          codigo: `esp-${Date.now()}`,
          producto: nuevoProducto.producto,
          precio: parseFloat(nuevoProducto.precio),
          cantidad: parseInt(nuevoProducto.cantidad),
          subtotal: parseFloat(nuevoProducto.precio) * parseInt(nuevoProducto.cantidad),
        };
    
        setProductosSeleccionados((prev) => [...prev, productoEspecial]);
        setTotal((prevTotal) => prevTotal + productoEspecial.subtotal);
        setModalOtroAbierto(false);
        setNuevoProducto({ cantidad: 1, producto: "", precio: "" });
    };

    const agregarMerma = () => {
        if (!nuevaMerma.descripcion.trim() || nuevaMerma.cantidad <= 0) {
          return alert("Por favor, ingresa una descripción y cantidad válida.");
        }
        
        setMermas((prevMermas) => [...prevMermas, nuevaMerma]);
        setNuevaMerma({ cantidad: 1, descripcion: "" });
        setModalOtroAbierto(false);
    };

    const nuevoEvento = () => {
        setSeccionModal("producto")
        setViaje("evento")
        setModalEvento(true);
        setModalOtroAbierto(false);
    }

    return(
        <>
            {modalOtroAbierto && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start pt-48 justify-center">
                    <div className="bg-white w-[90%] max-h-[40vh] rounded-lg overflow-hidden flex flex-col">
                        <div className="bg-gray-600 flex justify-between mb-4">
                            <button className={`p-2 w-full ${seccionModal === "producto" ? "font-bold bg-white" : "text-white"}`} onClick={() => setSeccionModal("producto")}>
                                Producto
                            </button>
                            <button className={`p-2 w-full ${seccionModal === "merma" ? "font-bold bg-white" : "text-white"}`} onClick={() => setSeccionModal("merma")}>
                                {viaje === "evento" ? (
                                    <>
                                        Direccion
                                    </>
                                ) : (
                                    <>
                                        Merma
                                    </>
                                )}
                            </button>
                            <button className={`p-2 w-full ${seccionModal === "cliente" ? "font-bold bg-white" : "text-white"}`} onClick={() => setSeccionModal("cliente")}>
                                Cliente
                            </button>
                            {viaje === "evento" ? (
                                <></>
                            ) : (
                                <>
                                    <button className={`p-2 w-full ${seccionModal === "evento" ? "font-bold bg-white" : "text-white"}`} onClick={() => setSeccionModal("evento")}>
                                        Evento
                                    </button>
                                </>
                            )}
                            <button onClick={() => setModalOtroAbierto(false)} className="bg-red-500 p-2 hover:bg-red-600">
                                <XMarkIcon className="h-8 w-8 text-black cursor-pointer" />
                            </button>
                        </div>
                        <div className="p-4">
                            
                        { seccionModal === "producto" ? (
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
                                {viaje === "evento" ? (
                                    <>
                                        <div className="mb-2">
                                            <label>Ingrese la direccion</label>
                                        </div>
                                        <textarea
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                        className="p-2 border border-gray-700 w-full h-32 mb-2"
                                        name="" id="">
                                        </textarea>
                                        <button
                                        onClick={agregarDireccion}
                                        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 w-full mb-2"
                                        >
                                            Agregar
                                        </button>
                                    </>
                                ) : (
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
                                )}
                            </>
                        ) : seccionModal === "cliente" ? (
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
                        ) : (
                            <>
                                <div className="flex justify-center items-center">
                                    <h2 className="text-2xl mb-4">
                                        Generar Evento
                                    </h2>
                                </div>
                                <button
                                onClick={nuevoEvento}
                                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 w-full mb-2"
                                >
                                    Generar Evento
                                </button>
                            </>
                        )}
                        <>
                        </>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalOtro;