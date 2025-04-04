import { useState } from "react";

const ModalOtro = ({ modalOtroAbierto, setModalOtroAbierto, setClienteSeleccionado, setProductosSeleccionados, setTotal, setMermas}) => {
    const [seccionModal, setSeccionModal] = useState("producto");
    const [nuevoProducto, setNuevoProducto] = useState({ cantidad: 1, producto: "", precio: "" });
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

    return(
        <>


        {modalOtroAbierto && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-md w-80">
                    <div className="flex justify-between mb-4">
                        <button className={`p-2 ${seccionModal === "producto" ? "font-bold" : ""}`} onClick={() => setSeccionModal("producto")}>
                            Producto
                        </button>
                        <button className={`p-2 ${seccionModal === "merma" ? "font-bold" : ""}`} onClick={() => setSeccionModal("merma")}>
                            Merma
                        </button>
                        <button className={`p-2 ${seccionModal === "cliente" ? "font-bold" : ""}`} onClick={() => setSeccionModal("cliente")}>
                            Cliente
                        </button>
                    </div>
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
                        <>
                            <button onClick={() => setModalOtroAbierto(false)} className="bg-gray-500 text-white p-2 rounded-md w-full">
                                    Cancelar
                            </button>
                        </>
                </div>
            </div>
        )}
        </>
    )
}

export default ModalOtro;