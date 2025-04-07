import { useState, useEffect } from "react";
import { db } from "../firebase/data";
import { collection, addDoc, getDocs, getDoc, query, where, doc, updateDoc } from "firebase/firestore";
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
    const [busqueda, setBusqueda] = useState("");
    const [valorCode, setValorCode] = useState(null);
    const [agregarContenido, setAgregarContenido] = useState(false);
    const [existeNombre, setExisteNombre] = useState(false);
    const [existeCodigo, setExisteCodigo] = useState(false);
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
        let intentos = 0;
        const maxIntentos = 10;
      
        while (intentos < maxIntentos) {
          const nuevoCodigo = Math.floor(1000000000 + Math.random() * 9000000000).toString();
          const existe = productos.some((r) => r.id === nuevoCodigo);
      
          if (!existe) return setCodigo(nuevoCodigo);
      
          intentos++;
        }
    };

    const agregarProducto = async () => {
        if (!nombre || !precio || !codigo){
            setAgregarContenido(true);
            return;
        }
        
        try {
            const productosRef = collection(db, "productos");

            // Verificar si ya existe por nombre
            const nombreQuery = query(productosRef, where("producto", "==", nombre.trim().toLowerCase()));
            const nombreSnapshot = await getDocs(nombreQuery);

            if (!nombreSnapshot.empty) {
                setExisteNombre(true);
                return;
            }

            // Verificar si ya existe por código
            const codigoQuery = query(productosRef, where("codigo", "==", parseFloat(codigo)));
            const codigoSnapshot = await getDocs(codigoQuery);

            if (!codigoSnapshot.empty) {
                setExisteCodigo(true);
                return;
            }

            const nuevoProducto = {
                producto: nombre,
                precio: parseFloat(precio),
                codigo: parseFloat(codigo),
                habilitado: true,
            };
            await addDoc(collection(db, "productos"), nuevoProducto);
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
        setActualizar(false);
    };

    const toggleHabilitado = (index) => {
        const productosActualizados = [...productos];
        productosActualizados[index].habilitado = !productosActualizados[index].habilitado;
        setProductos(productosActualizados);
    };

    const productitos = productos.filter(
        (p) =>
          p.producto.toLowerCase().includes(busqueda.toLowerCase()) ||
          p.precio.toString().includes(busqueda)
    );

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
                                {productitos.map((p, i) => (
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
        {existeNombre && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">¡Error!</h2>
              <p className="text-gray-600 mb-6">El producto ya existe</p>
              <button
                onClick={() => setExisteNombre(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
              >
                Entendido
              </button>
            </div>
          </div>
        )}
        {existeCodigo && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">¡Error!</h2>
              <p className="text-gray-600 mb-6">El Codigo del producto ya existe</p>
              <button
                onClick={() => setExisteCodigo(false)}
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
              <p className="text-gray-700 mb-6">Rellana los valores del producto</p>
              <button
                onClick={() => setAgregarContenido(false)}
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
              <p className="text-gray-700 mb-6">El producto ha sido Agregado</p>
              <button
                onClick={() => setAlertaAgregar(false)}
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
              <p className="text-gray-700 mb-6">El producto a sido Actualizado</p>
              <button
                onClick={() => setAlertaActualizar(false)}
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

export default Productos;
