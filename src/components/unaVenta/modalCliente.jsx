import { useState } from "react";
import { XMarkIcon  } from '@heroicons/react/24/outline'

const ModalCliente = ({ setModalClientesAbierto,modalClientesAbierto,setClienteSeleccionado,clientes }) =>{
    const [busquedaCliente, setBusquedaCliente] = useState("");

    const agregarCliente = (cliente) => {
        setClienteSeleccionado(cliente.cliente);
        setModalClientesAbierto(false);
    };

    const clienteFiltrados = clientes.filter(
        (c) =>
        c.cliente.toLowerCase().includes(busquedaCliente.toLowerCase())
    );
    
    return(
        <>              
            {/* MODAL CLIENTES */}
            {modalClientesAbierto && (
                <div className="fixed inset-0 bg-black bg-opacity-50 pt-36 flex justify-center items-start">
                    <div
                        className="bg-white w-[90vh] max-h-[80vh] overflow-y-auto rounded-xl shadow-lg"
                        dir="rtl"
                    >
                        <div dir="ltr" className="bg-gray-500 flex justify-between">
                            <h3 className="text-xl text-white px-8 py-4 font-semibold">Buscar Clientes</h3>
                            <button onClick={() => setModalClientesAbierto(false)} className="bg-red-500 p-2 hover:bg-red-600">
                                <XMarkIcon className="h-8 w-8 text-black cursor-pointer" />
                            </button>
                        </div>

                        <div dir="ltr" className="p-4 overflow-y-auto max-h-[70vh]">

                            <input
                        type="text"
                        value={busquedaCliente}
                        onChange={(e) => setBusquedaCliente(e.target.value)}
                        placeholder="Buscar por nombre"
                        className="p-2 border border-gray-300 rounded-md w-full mb-4"
                        />
                        <ul className="space-y-2">
                            {clienteFiltrados.map(( cliente ) => (
                                <li key={cliente.id} className="flex justify-between items-center p-2 border border-gray-200 rounded-md">
                                    <span>
                                        {cliente.cliente}
                                    </span>
                                    <button
                                    onClick={() => agregarCliente(cliente)}
                                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                                    >
                                        ➕
                                    </button>
                                </li>
                            ))}
                        </ul>

                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalCliente;