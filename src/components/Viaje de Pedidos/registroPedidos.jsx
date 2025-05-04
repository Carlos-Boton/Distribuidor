import { useState } from "react";
import VistaRegistro from "./vistaRegistro";


const RegistroPedidos = ({registrosFiltrados,setRegistros,registros,abrirModalEdicion,setModalTiket,setTiketImpreso,pedidoActualizado,setPedidoActualizado}) => {

    const [verEntregado, setVerEntregado] = useState(false);
    // Función para mover un registro hacia arriba usando el id
    const moverArriba = (id) => {
        const index = registros.findIndex((registro) => registro.id === id);
        if (index > 0) {
            const nuevosRegistros = [...registros];
            [nuevosRegistros[index], nuevosRegistros[index - 1]] = [nuevosRegistros[index - 1], nuevosRegistros[index]];
            setRegistros(nuevosRegistros);
            localStorage.setItem("registros", JSON.stringify(nuevosRegistros)); // Guardar cambios en localStorage
        }
    };
    
    // Función para mover un registro hacia abajo usando el id
    const moverAbajo = (id) => {
        const index = registros.findIndex((registro) => registro.id === id);
        if (index < registros.length - 1) {
            const nuevosRegistros = [...registros];
            [nuevosRegistros[index], nuevosRegistros[index + 1]] = [nuevosRegistros[index + 1], nuevosRegistros[index]];
            setRegistros(nuevosRegistros);
            localStorage.setItem("registros", JSON.stringify(nuevosRegistros)); // Guardar cambios en localStorage
        }
    };

    const marcarComoEntregado = (id) => {
        const nuevosRegistros = [...registros];
        const registro = nuevosRegistros.find((r) => r.id === id);
        if (registro) {
            registro.entregado = !registro.entregado
        }
    
        // // Ordenar: los no entregados primero, los entregados al final
        // nuevosRegistros.sort((a, b) => (a.entregado === b.entregado ? 0 : a.entregado ? 1 : -1));
    
        setRegistros(nuevosRegistros);
        localStorage.setItem("registros", JSON.stringify(nuevosRegistros));
    };

    const tiketEnviado = (id) => {
        const registro = registros.find((r) => r.id === id);
        if (registro) {
            setTiketImpreso({ ...registro });
            setModalTiket(true);
        }
    };

    // inicio de Vista de Pedidos
    return(
        <>
            {/* Preguntamos si tenermos algo en registroFiltrado */}
            {registrosFiltrados.length === 0 ? (
                <div className="mb-4 p-4 border rounded-lg shadow-md">
                    <p>No hay registros guardados</p>
                </div>

            ) : (
                <div>

                    {verEntregado === true  && (
                        <>
                            <div className="flex my-4 justify-center">
                                <button
                                onClick={() => setVerEntregado(false)}
                                className="bg-red-600 rounded-md p-2 text-white hover:bg-red-700">Regresar</button>
                            </div>

                            <hr className="mb-4" />
                        </>
                    )}

                    {registrosFiltrados.map((registro) => (

                        <>
                            {verEntregado ? (
                                <>
                                    {registro.entregado === true &&(
                                        <>
                                            <VistaRegistro registro={registro} marcarComoEntregado={marcarComoEntregado} moverArriba={moverArriba} moverAbajo={moverAbajo} abrirModalEdicion={abrirModalEdicion} tiketEnviado={tiketEnviado}/>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    {registro.entregado === false &&(
                                        <>
                                            <VistaRegistro registro={registro} marcarComoEntregado={marcarComoEntregado} moverArriba={moverArriba} moverAbajo={moverAbajo} abrirModalEdicion={abrirModalEdicion} tiketEnviado={tiketEnviado}/>
                                        </>
                                    )}
                                </>
                            )}
                        </>
                       
                    ))}

                    {verEntregado === false  && (
                        <>
                            <hr className="mt-4" />

                            <div className="flex my-4 justify-center">
                                <button
                                onClick={() => setVerEntregado(true)}
                                className="bg-green-600 rounded-md p-2 text-white hover:bg-green-700">ver entregados</button>
                            </div>
                        </>
                    )}
                </div>
            )}

            {pedidoActualizado && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
                        <h2 className="text-3xl font-semibold mb-4 text-gray-800">¡Pedido Actualizado!</h2>
                        <p className="text-gray-700 mb-6">El pedido se ha actualizado con exito!!</p>
                        <button
                            onClick={() => setPedidoActualizado(false)}
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

// Exportando RegistroPedidos
export default RegistroPedidos;