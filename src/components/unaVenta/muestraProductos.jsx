import { useState } from "react";


const MuestraProducto = ({ productosSeleccionados,total,setClienteSeleccionado,setProductosSeleccionados,setTotal,setMermas,viaje,setViaje,clienteSeleccionado,mermas,setTiketImpreso,setModalTiket}) => {

    const [agregaCliente, setAgregaCliente] = useState(false);
    const [agregaProducto, setAgregaProducto] = useState(false);
    const [guardadoExito, setGuardadoExito] = useState(false);

    const generarCodigoUnico = (registros) => {
        let intentos = 0;
        const maxIntentos = 10;
      
        while (intentos < maxIntentos) {
          const nuevoCodigo = Math.floor(1000000000 + Math.random() * 9000000000).toString();
          const existe = registros.some((r) => r.id === nuevoCodigo);
      
          if (!existe) return nuevoCodigo;
      
          intentos++;
        }
      
        return null; // no se pudo generar un código único
    };
      

    const handleGuardarRegistro = () => {
        if (!clienteSeleccionado) {
            setAgregaCliente(true);
            setTimeout(() => {
                setAgregaCliente(false);
            }, 3000);
            return;
        }
      
        if (productosSeleccionados.length === 0) {
            setAgregaProducto(true);
            setTimeout(() => {
                setAgregaProducto(false);
            }, 3000);
            return;
        }
      
        const registrosPrevios = JSON.parse(localStorage.getItem("registros")) || [];
      
        const codigoGenerado = generarCodigoUnico(registrosPrevios);

        if (!codigoGenerado) {
            alert("No se pudo generar un ID único");
            return;
        }

        const registro = {
            id: codigoGenerado,
            cliente: clienteSeleccionado,
            productos: productosSeleccionados,
            mermas: mermas.length > 0 ? mermas : [],
            total: total,
            viaje: viaje,
            fecha: new Date().toLocaleDateString("en-GB")
        };
      
        if (viaje === "0") {
            setTiketImpreso(registro);
            setModalTiket(true);
        }
      
        localStorage.setItem("registros", JSON.stringify([ registro ,...registrosPrevios]));
      
        setTotal(0);
        setMermas([]);
        setProductosSeleccionados([]);
        setClienteSeleccionado(null);
        setGuardadoExito(true);
        setTimeout(() => {
            setGuardadoExito(false);
        }, 3000);
    };
      
    const handleEliminarProducto = (codigoProducto) => {
        setProductosSeleccionados((prevProductos) => {
            const productoAEliminar = prevProductos.find((p) => p.codigo === codigoProducto);
            if (!productoAEliminar) return prevProductos;
    
            const nuevoTotal = Math.max(0, total - productoAEliminar.subtotal);
            setTotal(nuevoTotal);
    
            return prevProductos.filter((p) => p.codigo !== codigoProducto);
        });
    };

    const cancelarVenta = () => {
        setClienteSeleccionado(null);
        setProductosSeleccionados([]);
        setMermas([]);
        setTotal(0);
    };

    return (
        <>
            <div className="flex justify-between space-x-3 mb-3">
                <h3 className="text-lg font-semibold">Productos Agregados</h3>
                <select value={viaje} onChange={(e) => setViaje(e.target.value)} className="rounded-md border border-gray-400 p-2 mr-2">
                    <option value="0">Venta</option>
                    <option value="1">Viaje 1</option>
                    <option value="2">Viaje 2</option>
                    <option value="3">Viaje 3</option>
                    <option value="4">Viaje 4</option>
                    <option value="5">Vieje 5</option>
                </select>
            </div>

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
                    {productosSeleccionados.map((producto) => (
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

            <div className="flex justify-between space-x-3 mt-4">
                <h3 className="text-lg font-semibold mt-4">Total: ${total}</h3>
                <div>
                    <button
                    onClick={handleGuardarRegistro}
                    className="bg-green-500 text-white p-2 mr-2 rounded-md hover:bg-green-600" >Guardar</button>
                    <button
                    onClick={cancelarVenta}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600" >Cancelar</button>
                </div>
            </div>

            {agregaCliente && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
                        <h2 className="text-3xl font-semibold mb-4 text-gray-800">¡Advertencia!</h2>
                        <p className="text-gray-600 mb-6">El Ingrese el cliente</p>
                        <button
                        onClick={() => setAgregaCliente(false)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            )}

            {agregaProducto && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
                        <h2 className="text-3xl font-semibold mb-4 text-gray-800">¡Advertencia!</h2>
                        <p className="text-gray-600 mb-6">Agrega un producto para guardar datos</p>
                        <button
                        onClick={() => agregaProducto(false)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            )}

            {guardadoExito && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
                        <h2 className="text-3xl font-semibold mb-4 text-gray-800">¡Agregado!</h2>
                        <p className="text-gray-600 mb-6">El pedido se ha guardado en el Viaje {viaje} </p>
                        <button
                        onClick={() => setGuardadoExito(false)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default MuestraProducto;