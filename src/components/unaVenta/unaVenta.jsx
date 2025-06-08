import { useState, useEffect} from "react";
import { collection, getDocs, getDoc, doc, updateDoc} from "firebase/firestore";
import { db } from "../firebase/data"
import ModalOtro from "./modalOtro";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AgregarCodigo from "./agregarCodigo";
import MuestraProducto from "./muestraProductos";
import BuscarProducto from "./buscarProducto";
import BotonBuscar from "./botonBuscar";
import BotonOtro from "./botonOtro";
import BotonCliente from "./botonCliente";
import ModalCliente from "./modalCliente";
import Mermas from "./mermas";
import Ticket from "../ticket/Ticket";

const UnaVenta = ({viaje,setViaje,productosSeleccionados,setProductosSeleccionados,mermas,setMermas,clienteSeleccionado,setClienteSeleccionado,total,setTotal}) =>{
    
    const [tiketImpreso, setTiketImpreso] = useState();
    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [direccionSeleccionado, setDireccionSeleccionado] = useState(null)
    const [modalOtroAbierto, setModalOtroAbierto] = useState(false);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [modalTiket, setModalTiket] = useState(false);
    const [modalEvento, setModalEvento] = useState(false)
    const [modalClientesAbierto, setModalClientesAbierto] = useState(false);
    const [semana, setSemana] = useState(false);

    useEffect(() => {
        fechaPdf();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fechaPdf = async () => {
        // localStorage.removeItem("fecha_ayer");
        const fechisima = localStorage.getItem("fecha_ayer");
        
        if(fechisima === null){
            const fechaGuardar = doc(db, "fecha_pdf", "sOyJ7XlTqqhlRs47GCd1");
            const docSnap = await getDoc(fechaGuardar);

            if (docSnap.exists()) {
                const data = docSnap.data();
                localStorage.setItem("fecha_ayer", data.fechapdf);
                fechaPdf();
            } else {
                console.log("No existe el documento");
            }
        } else {
            const ahora = new Date().toLocaleDateString("en-GB");
            if(ahora === fechisima){
                setSemana(true);
            }
        }
    }

    const generarPDF = () => {
        const data = localStorage.getItem("registros");
        if (!data) {
            setNuevaSemana()
            setSemana(false);
            return
        };
      
        const registros = JSON.parse(data);
      
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Registro semanal de pedidos", 14, 20);
      
        // Agrupar por fecha y luego por viaje
        const agrupados = {};
      
        registros.forEach(reg => {
          const { fecha, viaje } = reg;
      
          if (!agrupados[fecha]) {
            agrupados[fecha] = {};
          }
      
          if (!agrupados[fecha][viaje]) {
            agrupados[fecha][viaje] = [];
          }
      
          agrupados[fecha][viaje].push(reg);
        });
      
        // Ordenar las fechas de menor a mayor
        const fechasOrdenadas = Object.keys(agrupados).sort((a, b) => {
            const [d1, m1, y1] = a.split("/").map(Number);
            const [d2, m2, y2] = b.split("/").map(Number);
            return new Date(y1, m1 - 1, d1) - new Date(y2, m2 - 1, d2);
        });

        const fechaInicio = fechasOrdenadas[0].replace(/\//g, "-");
        const fechaFin = fechasOrdenadas[fechasOrdenadas.length - 1].replace(/\//g, "-");

        const nombreArchivo = `registro-semanal-${fechaInicio}_al_${fechaFin}.pdf`;
            
        let y = 30;
      
        fechasOrdenadas.forEach(fecha => {
            doc.setFontSize(14);
            doc.text(`Fecha: ${fecha}`, 14, y);
            y += 6;
        
            const viajes = Object.keys(agrupados[fecha]).sort((a, b) => a - b);
        
            viajes.forEach(viaje => {
                doc.setFontSize(12);
                doc.text(`Viaje: ${viaje}`, 20, y);
                y += 5;
        
                agrupados[fecha][viaje].forEach(registro => {
                    const { cliente, total, productos } = registro;
        
                    doc.setFontSize(11);
                    doc.text(`Cliente: ${cliente}`, 20, y);
                    y += 5;
                    doc.text(`Total: $${total.toFixed(2)}`, 20, y);
                    y += 5;
        
                    const filas = productos.map(prod => [
                        prod.producto,
                        prod.cantidad,
                        `$${prod.precio.toFixed(2)}`,
                        `$${prod.subtotal.toFixed(2)}`
                    ]);
        
                    autoTable(doc, {
                        startY: y,
                        head: [["Producto", "Cantidad", "Precio", "Subtotal"]],
                        body: filas,
                        styles: { fontSize: 10 },
                        margin: { left: 20 },
                        theme: "grid",
                        didDrawPage: data => {
                            y = data.cursor.y + 10;
                        }
                    });
        
                    y += 5; // Espacio entre pedidos
                });
            });
        });
        

        localStorage.removeItem("registros");
      
        doc.save(nombreArchivo);

        setSemana(false);
        setNuevaSemana();
    };

    const setNuevaSemana = async () => {
        const hoy = new Date();
    
        // 2. Restar un día
        hoy.setDate(hoy.getDate() + 7);

        // 3. Formatear la fecha (ej. "14/04/2025")
        const fechaAyer = hoy.toLocaleDateString("en-GB");
        const fechaRef = doc(db, "fecha_pdf", "sOyJ7XlTqqhlRs47GCd1");
        const fechaCambio = {
            fechapdf: fechaAyer
        }
        await updateDoc(fechaRef, fechaCambio);
        // 4. Guardarla en localStorage
        localStorage.setItem("fecha_ayer", fechaAyer);
    }

    useEffect(() => {
        const productosRef = collection(db, "productos");
        getDocs(productosRef)
            .then((resp) => {
            setProductos(
                resp.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id}
                })
            )
        })
    }, [])

    useEffect(() => {
        const clientesRef = collection(db, "clientes");
        getDocs(clientesRef)
        .then((resp) => {
            setClientes(
                resp.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id}
                })
            )
        })
    }, [])

    const agregarProducto = (producto) => {
        setProductosSeleccionados((prevProductos) => {
            const existe = prevProductos.find((p) => p.codigo === producto.codigo);
            if (existe) {
                return prevProductos.map((p) =>
                p.codigo === producto.codigo
                    ? { 
                        ...p,
                        cantidad: p.cantidad + 1,
                        subtotal: (p.cantidad + 1) * p.precio
                    }
                    : p
                );
            } else {
                return [...prevProductos, { ...producto, cantidad: 1, precio: producto.precio, subtotal: producto.precio }];
            }
        });
    
        setTotal((prevTotal) => Math.max(0, prevTotal + producto.precio));
        setModalAbierto(false);
    };

    return (
        <>
        
            {modalTiket ? (
                <>
                    <Ticket tiketImpreso={tiketImpreso} setModalTiket={setModalTiket} />
                </>   
            ) : (
                <div className="pt-36 p-4">
                    <BotonCliente setModalClientesAbierto={setModalClientesAbierto} clienteSeleccionado={clienteSeleccionado}/>
                    <div className="flex space-x-3 mb-4">
                        <BotonOtro setModalOtroAbierto={setModalOtroAbierto}/>
                        <AgregarCodigo productos={productos} agregarProducto={agregarProducto}/>
                        <BotonBuscar setModalAbierto={setModalAbierto}/>
                    </div>
                    <MuestraProducto productosSeleccionados={productosSeleccionados} total={total} setClienteSeleccionado={setClienteSeleccionado} setProductosSeleccionados={setProductosSeleccionados} setTotal={setTotal} setMermas={setMermas} viaje={viaje} setViaje={setViaje}  mermas={mermas} clienteSeleccionado={clienteSeleccionado} setTiketImpreso={setTiketImpreso} setModalTiket={setModalTiket} modalEvento={modalEvento} setModalEvento={setModalEvento} direccionSeleccionado={direccionSeleccionado} />
                    <Mermas mermas={mermas} setMermas={setMermas} viaje={viaje} direccionSeleccionado={direccionSeleccionado} />
                </div>
            )}
        
            <BuscarProducto productos={productos} modalAbierto={modalAbierto} setModalAbierto={setModalAbierto} agregarProducto={agregarProducto}/>
            <ModalOtro modalOtroAbierto={modalOtroAbierto} setModalOtroAbierto={setModalOtroAbierto} setClienteSeleccionado={setClienteSeleccionado} setProductosSeleccionados={setProductosSeleccionados} setTotal={setTotal} setMermas={setMermas} setModalEvento={setModalEvento} setViaje={setViaje} viaje={viaje} setDireccionSeleccionado={setDireccionSeleccionado} />
            <ModalCliente setModalClientesAbierto={setModalClientesAbierto} modalClientesAbierto={modalClientesAbierto} setClienteSeleccionado={setClienteSeleccionado} clientes={clientes} />
            {semana && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-[90%] min-h-80 text-center">
                        <h2 className="text-3xl font-semibold mb-4 text-gray-800">¡¡Advertencia!!</h2>
                        <div className="flex items-center justify-center">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGQARYK9tpBfHq10xo_CsQZ7lnVgJaOh2WkA&s" alt="Advertencia" className="w-28" />
                        </div>
                        <p className="text-gray-600 mb-6">Inicio de semana, para mayor seguridad de los pedidos, los pedidos de la semana pasada se guardaran en PDF </p>
                        <button
                        onClick={generarPDF}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default UnaVenta;