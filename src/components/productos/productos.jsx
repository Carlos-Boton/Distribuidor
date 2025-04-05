import { useState, useEffect } from "react";
import { db } from "../firebase/data";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import Barcode from "react-barcode";
import TicketCodigoBarras from "./codeBarra";
import { PrinterIcon, PencilIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'



const Productos = () => {
    const [id,setId] = useState("");
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [codigo, setCodigo] = useState("")
    const [modalCode, setModalCode] = useState("");
    const [valorCode, setValorCode] = useState(null);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [actualizar, setActualizar] = useState(false);
    const [alertaAgregar, setAlertaAgregar] = useState(false);
    const [alertaActualizar, setAlertaActualizar] = useState(false);

    const regresar = () => {
        setCodigo("");
        setPrecio("");
        setNombre("");
        setModoEdicion(false);
        setActualizar(false);
    }

    useEffect(() => {
        obtenerProductos();
      }, []);

      const obtenerProductos = () => {
        const productosRef = collection(db, "productos");
        getDocs(productosRef).then((resp) => {
          setProductos(
            resp.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
          );
        });
      };

    const ImprimirCode = (i) => {
        setValorCode({ ...productos[i], i });
        setModalCode(true);
    }

    const generarCodigoBarras = () => {
        let dale;
        do {
            dale = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        } while (productos.some((producto) => producto.dale === dale));
        setCodigo(dale)
    };

    const agregarProducto = async () => {
        if (!nombre || !precio || !codigo) return;
        
        try {
            const nuevoProducto = {
                producto: nombre,
                precio: parseFloat(precio),
                codigo: parseFloat(codigo),
                habilitado: true,
            };
            const docRef = await addDoc(collection(db, "productos"), nuevoProducto);
            setProductos([...productos, nuevoProducto]);
            setNombre("");
            setPrecio("");
            setCodigo("");
            setModoEdicion(false);
            setAlertaAgregar(true); // Muestra la alerta
        
        // Ocultar la alerta después de 3 segundos
        setTimeout(() => {
            setAlertaAgregar(false);
        }, 3000);
        } catch (error) {
            console.error("Error al agregar el producto:", error);
        }
    };

    const editarProducto = async (id) => {
        try {
            const productoRef = doc(db, "productos", id);
            const productoSnap = await getDoc(productoRef);
    
            if (productoSnap.exists()) {
                const productoData = productoSnap.data(); // Guardamos los datos en una variable
    
                // Usamos productoData en lugar de productoEditando
                setId(id);
                setNombre(productoData.producto);
                setPrecio(productoData.precio);
                setCodigo(productoData.codigo);
                setModoEdicion(true);
                setActualizar(true);
            } else {
                console.log("No se encontró el producto con ID:", id);
            }
        } catch (error) {
            console.error("Error al obtener el producto:", error);
        }
    };

    const guardarEdicion = async () => {
        if (!nombre || !precio || !codigo || !id) return;
        try {
            const productoRef = doc(db, "productos", id); // Referencia al documento por ID
            const nuevosDatos = {
                producto: nombre,
                precio: parseFloat(precio),
                codigo: parseFloat(codigo),
                habilitado: true,
            };
        
            await updateDoc(productoRef, nuevosDatos); // Actualiza los datos
            console.log("Producto actualizado correctamente");
            obtenerProductos();
            setAlertaActualizar(true);
            setTimeout(() => {
                setAlertaActualizar(false);
            }, 3000);
          } catch (error) {
            console.error("Error al actualizar el producto:", error);
          }
        setModoEdicion(false);
        setNombre("");
        setPrecio("");
        setCodigo("");
    };

    const toggleHabilitado = (index) => {
        const productosActualizados = [...productos];
        productosActualizados[index].habilitado = !productosActualizados[index].habilitado;
        setProductos(productosActualizados);
    };

  return (
    <div>
        {modalCode ? (
            <>
                <TicketCodigoBarras valorCode={valorCode} setModalCode={setModalCode} />
            </>   
        ) : (
            <div className="p-4 pt-36">
                {modoEdicion ? (
                    <>
                    <div className="print:hidden">
                        <input type="hidden" placeholder="Nombre" value={id} onChange={(e) => setId(e.target.value)} className="p-2 border border-gray-300 mb-2 rounded-md w-full" />
                        <label>Nombre del producto</label>
                        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="p-2 border border-gray-300 mb-2 rounded-md w-full" />
                        <label>Precio</label>
                        <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} className="p-2 border border-gray-300 mb-2 rounded-md w-full" />
                        <label>Codigo</label>
                        <div className="flex space-x-3 mb-6">
                            <input type="number" placeholder="Codigo" value={codigo} onChange={(e) => setCodigo(e.target.value)} className="p-2 border border-gray-300 rounded-md w-full"/>
                            <button onClick={() => generarCodigoBarras()} className="bg-blue-500 text-white p-2 rounded-md">Generar</button>
                        </div>

                        <div className="flex justify-between space-x-3 mt-4">
                            <div>
                                { codigo && (
                                    <>
                                        <h2>
                                            <Barcode value={codigo} format="CODE128" />
                                        </h2>
                                    </>
                                )}
                            </div>
                            <div>
                                {actualizar ? (
                                    <>
                                        <button onClick={guardarEdicion} className="bg-green-500 text-white p-2 rounded-md">Actualizar</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={agregarProducto} className="bg-green-500 text-white p-2 rounded-md">Agregar</button>
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
                        <h3 className="mt-4 font-bold">Lista de Productos</h3>
                        <table className="w-full border-collapse border border-gray-300 my-4">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 p-2">Acciones</th>
                                    <th className="border border-gray-300 p-2">Nombre</th>
                                    <th className="border border-gray-300 p-2">Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((p, i) => (
                                    <tr key={i} className={!p.habilitado ? "bg-red-200" : ""}>
                                        <td className="border border-gray-300 p-2">
                                            <button onClick={() => toggleHabilitado(i)} className={`text-white p-1 mr-2 rounded-md ${
                                            p.habilitado ? "bg-red-600 hover:bg-red-700" : "bg-green-500 hover:bg-green-600"}`}>{p.habilitado ? (<><XCircleIcon className='h-6 w-6 text-white-500' /></>) : (<><CheckCircleIcon className='h-6 w-6 text-white-500' /></>)}</button>
                                            <button onClick={() => editarProducto(p.id)} className="bg-blue-500 text-white p-1 mr-2 rounded-md"><PencilIcon className="h-6 w-6 text-white-500" /></button>
                                            <button onClick={() => ImprimirCode(i)} className="bg-yellow-700 text-white p-1 rounded-md"><PrinterIcon className="h-6 w-6 text-white-500" /></button>
                                        </td>
                                        <td className="border border-gray-300 p-2">{p.producto}</td>
                                        <td className="border border-gray-300 p-2">${p.precio}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                    </div>
                    
                )}
            </div>
        )}
        {alertaAgregar && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <div className="flex justify-between items-center">
                        <strong className="font-bold">¡Éxito!</strong>
                        <button
                            onClick={() => setAlertaAgregar(false)}
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
                    <p className="text-sm text-gray-600">El producto fue agregado correctamente.</p>
                </div>
            </div>
        )}
        {alertaActualizar && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <div className="flex justify-between items-center">
                        <strong className="font-bold">¡Éxito!</strong>
                        <button
                            onClick={() => setAlertaActualizar(false)}
                            className="text-gray-600 hover:text-gray-800"
                        >
                            X
                        </button>
                    </div>
                    <p className="text-sm text-gray-600">El producto fue Actualizado correctamente.</p>
                </div>
            </div>
        )}

    </div>
  );
};

export default Productos;
