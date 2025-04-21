import { useState, useEffect } from "react";
import { db } from "../firebase/data";
import { collection, addDoc, getDocs, getDoc, query, where, doc, updateDoc } from "firebase/firestore";
import { PencilIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'



const Clientes = () => {
    const [id,setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [busqueda, setBusqueda] = useState("");
    const [clientes, setClientes] = useState([]);
    const [clienteId, setClienteId] =useState(false);
    const [actualizar, setActualizar] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [existeNombre, setExisteNombre] = useState(false);
    const [alertaAgregar, setAlertaAgregar] = useState(false);
    const [agregarContenido, setAgregarContenido] = useState(false);
    const [alertaActualizar, setAlertaActualizar] = useState(false);

    const regresar = () => {
        setNombre("");
        setModoEdicion(false);
        setActualizar(false);
    }

    useEffect(() => {
        obtenerClientes();
    }, []);

    const obtenerClientes = () => {
        const clientesRef = collection(db, "clientes");
        getDocs(clientesRef).then((resp) => {
            setClientes(
                resp.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
                })
            );
        });
    };

    const agregarCliente = async () => {
        if (!nombre) {
            setAgregarContenido(true);
            setTimeout(() => {
              setAgregarContenido(false);
            }, 3000);
            return;
        };
        
        try {
            const clientesRef = collection(db, "clientes");
            
            // Verificar si ya existe por nombre
            const nombreQuery = query(clientesRef, where("cliente", "==", nombre.trim()));
            const nombreSnapshot = await getDocs(nombreQuery);

            if (!nombreSnapshot.empty) {
                setExisteNombre(true);
                setTimeout(() => {
                    setExisteNombre(false);
                }, 3000);
                return;
            }
            const nuevoCliente = {
                cliente: nombre,
                habilitado: true,
            };
            await addDoc(collection(db, "clientes"), nuevoCliente);
            setClientes([...clientes, nuevoCliente]);
            setNombre("");
            setModoEdicion(false)
            setAlertaAgregar(true); // Muestra la alerta
        
            // Ocultar la alerta después de 3 segundos
            setTimeout(() => {
                setAlertaAgregar(false);
            }, 3000);
        } catch (error) {
            console.error("Error al agregar el cliente:", error);
        }
        
    };

    const editarCliente = async (id) => {
        try {
            const clienteRef = doc(db, "clientes", id);
            const clienteSnap = await getDoc(clienteRef);
    
            if (clienteSnap.exists()) {
                const clienteData = clienteSnap.data(); // Guardamos los datos en una variable
    
                // Usamos productoData en lugar de productoEditando
                setId(id);
                setNombre(clienteData.cliente);
                setModoEdicion(true);
                setActualizar(true);
            } else {
                setClienteId(true)
                // Ocultar la alerta después de 3 segundos
                setTimeout(() => {
                    setClienteId(false);
                }, 3000);
            }
        } catch (error) {
            console.error("Error al obtener el cliente:", error);
        }
    };

    const guardarEdicion = async () => {
        if (!nombre || !id) return;
        try {
            const clienteRef = doc(db, "clientes", id); // Referencia al documento por ID
            const nuevosDatos = {
                cliente: nombre,
                habilitado: true,
            };
        
            await updateDoc(clienteRef, nuevosDatos); // Actualiza los datos
            console.log("Cliente actualizado correctamente");
            obtenerClientes();
            setAlertaActualizar(true);
            setTimeout(() => {
                setAlertaActualizar(false);
            }, 3000);
        } catch (error) {
            console.error("Error al actualizar el cliente:", error);
        }
        setModoEdicion(false);
        setNombre("");
        setActualizar(false);
    };

    const toggleHabilitado = (index) => {
        const clientesActualizados = [...clientes];
        clientesActualizados[index].habilitado = !clientesActualizados[index].habilitado;
        setClientes(clientesActualizados);
    };

    const clientitos = clientes.filter(
        (p) =>
        p.cliente.toLowerCase().includes(busqueda.toLowerCase())
    );

  return (
    <div>
        <div className="p-4 pt-36">
                {modoEdicion ? (
                    <>
                    <div className="print:hidden">
                        <input type="hidden" placeholder="Nombre" value={id} onChange={(e) => setId(e.target.value)} className="p-2 border border-gray-300 mb-2 rounded-md w-full" />
                        <label>Nombre del producto</label>
                        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="p-2 border border-gray-300 mb-2 rounded-md w-full" />
                        <div className="flex justify-between space-x-3 mt-4">

                            <div>
                                {actualizar ? (
                                    <>
                                        <button onClick={guardarEdicion} className="bg-green-500 text-white p-2 rounded-md">Actualizar</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={agregarCliente} className="bg-green-500 text-white p-2 rounded-md">Agregar</button>
                                    </>
                                )}
                                <button onClick={() => regresar()} className="bg-red-500 text-white p-2 rounded-md ml-2">Salir</button>
                            </div>
                        </div>
                    </div>
                    </>
                ) : (
                    <div>
                        <div className="flex justify-between space-x-3 mb-4">
                            <button onClick={() => setModoEdicion(true)} className="bg-blue-500 text-white p-2 rounded-md mb-4">
                                Nuevo
                            </button>
                            <input
                            type="text"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Buscar producto"
                            className="p-2 border border-gray-300 rounded-md w-full mb-4"
                            />
                        </div>
                        <h3 className="mt-4 font-bold">Lista de Clientes</h3>
                        <table className="w-full border-collapse border border-gray-300 my-4">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 p-2">Acciones</th>
                                    <th className="border border-gray-300 p-2">Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientitos.map((c, i) => (
                                    <tr key={i} className={!c.habilitado ? "bg-red-200" : ""}>
                                        <td className="border border-gray-300 p-2">
                                            <button onClick={() => toggleHabilitado(i)} className={`text-white p-1 mr-2 rounded-md ${
                                            c.habilitado ? "bg-red-600 hover:bg-red-700" : "bg-green-500 hover:bg-green-600"}`}>{c.habilitado ? (<><XCircleIcon className='h-6 w-6 text-white-500' /></>) : (<><CheckCircleIcon className='h-6 w-6 text-white-500' /></>)}</button>
                                            <button onClick={() => editarCliente(c.id)} className="bg-blue-500 text-white p-1 mr-2 rounded-md"><PencilIcon className="h-6 w-6 text-white-500" /></button>
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            {c.cliente}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {existeNombre && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
                        <h2 className="text-3xl font-semibold mb-4 text-gray-800">¡Error!</h2>
                        <p className="text-gray-600 mb-6">El cliente ya existe</p>
                        <button
                        onClick={() => setExisteNombre(false)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            )}
            {alertaAgregar && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
                    <h2 className="text-3xl font-semibold mb-4 text-gray-800">¡Agregado!</h2>
                    <p className="text-gray-700 mb-6">El cliente ha sido Agregado</p>
                    <button
                    onClick={() => setAlertaAgregar(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                    >
                        Entendido
                    </button>
                    </div>
                </div>
            )}
            {agregarContenido && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
                    <h2 className="text-3xl font-semibold mb-4 text-gray-800">¡Alerta!</h2>
                    <p className="text-gray-700 mb-6">Agrega al cliente</p>
                    <button
                    onClick={() => setAgregarContenido(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                    >
                        Entendido
                    </button>
                    </div>
                </div>
            )}
            {alertaActualizar && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
                    <h2 className="text-3xl font-semibold mb-4 text-gray-800">¡Actualizado!</h2>
                    <p className="text-gray-700 mb-6">El cliente a sido Actualizado</p>
                    <button
                    onClick={() => setAlertaActualizar(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                    >
                        Entendido
                    </button>
                    </div>
                </div>
            )}
            {clienteId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
                    <h2 className="text-3xl font-semibold mb-4 text-gray-800">¡Error!</h2>
                    <p className="text-gray-700 mb-6">Cliente no encontrado</p>
                    <button
                    onClick={() => setClienteId(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                    >
                        Entendido
                    </button>
                    </div>
                </div>
            )}
    </div>
  );
};

export default Clientes;
