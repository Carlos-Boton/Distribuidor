// src/pages/Eventos.jsx
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const Eventos = () => {
    const [vistaEventos,setVistaEventos] = useState([])
    const [seccionEvento, setSeccionEvento] = useState(false);
    const [eventoVista, setEventoVista] = useState(null);

    useEffect(() => {
        const EventosGuardado = JSON.parse(localStorage.getItem("eventos")) || [];
        setVistaEventos(EventosGuardado)
    }, [])
    
    const abrirModalVista = (id) => {
        const evento = vistaEventos.find((r) => r.id === id);
        if (evento) {
        setEventoVista({ ...evento});
            setSeccionEvento(true);
        }
    };
    return (
        <div className="pt-36 px-4">
            {seccionEvento ? (
                <>
                    <p className="text-xl mb-2"><strong>Cliente:</strong> {eventoVista.cliente}</p>
                    <p><strong>Productos:</strong></p>
                            {/* Tabla de productos */}
                            <table className="w-full border-collapse border border-gray-300 my-4">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 p-2">##</th>
                                        <th className="border border-gray-300 p-2">Producto</th>
                                        <th className="border border-gray-300 p-2">Precio</th>
                                        <th className="border border-gray-300 p-2">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Vista de cada producto del pedido */}
                                    {eventoVista.productos.map((prod, i) => (
                                        <tr key={i} className="text-center">
                                            <td className="border border-gray-300 p-2">{prod.cantidad}</td>
                                            <td className="border border-gray-300 p-2">{prod.producto}</td>
                                            <td className="border border-gray-300 p-2">${prod.precio.toFixed(2)}</td>
                                            <td className="border border-gray-300 p-2">${(prod.cantidad * prod.precio).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                    {/* Fin de Vista de cada Producto del Pedido */}
                                </tbody>
                            </table>
                            {/* Fin de tabla de productos */}

                            {/* Vista del Total */}
                            <p className="text-3xl"><strong>Total:</strong> ${eventoVista.total}</p>

                    <div className='mt-3'>
                        <button  className="bg-blue-500 text-white p-2 ml-2 rounded-md hover:bg-blue-600">
                        Imprimir
                        </button>
                        <button  className="bg-yellow-500 text-white p-2 ml-2 rounded-md hover:bg-yellow-600">
                        Editar
                        </button>
                        <button onClick={() => setSeccionEvento(false)} className="bg-red-500 text-white p-2 ml-2 rounded-md hover:bg-red-600">
                        Cancelar
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {vistaEventos.map((evento) => (
                        <div key={evento.id} className='flex justify-center items-center mb-3 border rounded-lg shadow-md'>
                            <div className='p-2 flex flex-col items-center justify-center'>
                                <CalendarDaysIcon className="w-16 h-16 text-blue-500 mx-auto mb-4"/>
                            </div>
                            <div className="bg-gray-300 p-2 w-full flex justify-between items-center">
                                <div className='px-2'>
                                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">{evento.cliente}</h1>
                                    <p className="text-gray-800">fecha de entrega: <strong>{evento.fecha}</strong></p>
                                    <p className="text-gray-800">Direccion: <strong>{evento.direccion}</strong></p>
                                </div>
                                <button
                                className='bg-red-500 text-white rounded-lg p-2'
                                onClick={() => abrirModalVista(evento.id)}
                                >Ver Pedido</button>
                            </div>
                        </div>
                    ))}
                    <div >
                    </div>
                </>
            )}
        </div>
    );
}

export default Eventos;