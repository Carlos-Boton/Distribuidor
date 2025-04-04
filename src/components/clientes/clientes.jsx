import { useState, useEffect } from "react";
import { db } from "../firebase/data";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import { PrinterIcon, PencilIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'



const Clientes = () => {
    const [id,setId] = useState("");
    const [clientes, setClientes] = useState([]);
    const [clienteEditado, setClienteEditando] = useState(null);
    const [nombre, setNombre] = useState("");
    const [modoEdicion, setModoEdicion] = useState(false);
    const [actualizar, setActualizar] = useState(false);

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
        if (!nombre) return;
        
        try {
            const nuevoCliente = {
                cliente: nombre,
                habilitado: true,
            };
            const docRef = await addDoc(collection(db, "clientes"), nuevoCliente);
            console.log("Producto agregado correctamente");
            setClientes([...clientes, nuevoCliente]);
            setNombre("");
            setModoEdicion(false)
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
                setClienteEditando({ id, ...clienteData }); 
    
                // Usamos productoData en lugar de productoEditando
                setId(id);
                setNombre(clienteData.cliente);
                setModoEdicion(true);
                setActualizar(true);
            } else {
                console.log("No se encontró el cliente con ID:", id);
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
          } catch (error) {
            console.error("Error al actualizar el cliente:", error);
          }
        setModoEdicion(false);
        setNombre("");
    };

    const toggleHabilitado = (index) => {
        const productosActualizados = [...clientes];
        productosActualizados[index].habilitado = !productosActualizados[index].habilitado;
        setClientes(productosActualizados);
    };

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
                        <button onClick={() => setModoEdicion(true)} className="bg-blue-500 text-white p-2 rounded-md mb-4">
                            Nuevo
                        </button>
                        <h3 className="mt-4 font-bold">Lista de Clientes</h3>
                        <table className="w-full border-collapse border border-gray-300 my-4">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 p-2">Acciones</th>
                                    <th className="border border-gray-300 p-2">Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map((c, i) => (
                                    <tr key={i} className={!c.habilitado ? "bg-red-200" : ""}>
                                        <td className="border border-gray-300 p-2">
                                            <button onClick={() => toggleHabilitado(i)} className={`text-white p-1 mr-2 rounded-md ${
                                            c.habilitado ? "bg-red-600 hover:bg-red-700" : "bg-green-500 hover:bg-green-600"}`}>{c.habilitado ? (<><XCircleIcon className='h-6 w-6 text-white-500' /></>) : (<><CheckCircleIcon className='h-6 w-6 text-white-500' /></>)}</button>
                                            <button onClick={() => editarCliente(c.id)} className="bg-blue-500 text-white p-1 mr-2 rounded-md"><PencilIcon className="h-6 w-6 text-white-500" /></button>
                                        </td>
                                        <td className="border border-gray-300 p-2">{c.cliente}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
    </div>
  );
};

export default Clientes;
