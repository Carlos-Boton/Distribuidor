import { useState } from "react";


const MuestraProducto = ({ productosSeleccionados,total,setClienteSeleccionado,setProductosSeleccionados,setTotal,setMermas,viaje,setViaje,clienteSeleccionado,mermas}) => {

    const [agregaCliente, setAgregaCliente] = useState(false);
    const [agregaProducto, setAgregaProducto] = useState(false);
    const [guardadoExito, setGuardadoExito] = useState(false);

    const handleGuardarRegistro = () => {
        if (!clienteSeleccionado) {
          setAgregaCliente(true)
          return;
        }
        if (productosSeleccionados.length === 0) {
          setAgregaProducto(true);
          return;
        }
    
        const registro = {
            cliente: clienteSeleccionado,
            productos: productosSeleccionados,
            mermas: mermas.length > 0 ? mermas : ([]),
            total: total,
            viaje: viaje,
            fecha: new Date().toLocaleDateString("en-GB")
        };
    
          const registrosPrevios = JSON.parse(localStorage.getItem("registros")) || [];
          localStorage.setItem("registros", JSON.stringify([...registrosPrevios, registro]));
    
          setGuardadoExito(true);
          setTotal(0);
          setMermas([]);
          setProductosSeleccionados([]);
          setClienteSeleccionado(null);
    }

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
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <div className="flex justify-between items-center">
                            <strong className="font-bold">Advertencia</strong>
                            <button
                                onClick={() => setAgregaCliente(false)}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                <svg
                                    className="fill-current text-gray-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M14 6L6 14M6 6l8 8"></path>
                                </svg>
                            </button>
                        </div>
                        <p className="text-xl">Agrega Cliente</p>
                    </div>
                </div>
            )}
            {agregaProducto && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <div className="flex justify-between items-center">
                            <strong className="font-bold">Advertencia</strong>
                            <button
                                onClick={() => setAgregaProducto(false)}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                <svg
                                    className="fill-current text-gray-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M14 6L6 14M6 6l8 8"></path>
                                </svg>
                            </button>
                        </div>
                        <p className="text-xl">Agrega al menos un producto</p>
                    </div>
                </div>
            )}
            {guardadoExito && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <div className="flex justify-between items-center">
                            <strong className="font-bold">Exito</strong>
                            <button
                                onClick={() => setGuardadoExito(false)}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                <svg
                                    className="fill-current text-gray-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M14 6L6 14M6 6l8 8"></path>
                                </svg>
                            </button>
                        </div>
                        <p className="text-xl">Pedido Agregado</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default MuestraProducto;