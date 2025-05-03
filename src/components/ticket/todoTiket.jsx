import React, { useRef, useEffect } from "react";

const TodoTiket = ({registrosFiltrados, setModalTodoTiket}) => {
    const ticketRef = useRef();
        const hasPrintedRef = useRef(false); // Usamos useRef para rastrear si ya se imprimió
    
        // Ejecutamos la impresión automáticamente cuando el componente se monta
        useEffect(() => {
            if (registrosFiltrados && !hasPrintedRef.current) {
                window.print(); // Esto abrirá el diálogo de impresión
                hasPrintedRef.current = true; // Marcamos que ya se ha impreso
            }
        }, [registrosFiltrados]); // Solo se ejecuta cuando el ticket cambia
    
        // Redirigir después de la impresión usando un setTimeout
        useEffect(() => {
            if (registrosFiltrados) {
                const timer = setTimeout(() => {
                    setModalTodoTiket(false)
                }, 100); // Esperamos 2 segundos después de la impresión para redirigir
    
                return () => clearTimeout(timer); // Limpiar el temporizador en caso de que el componente se desmonte
            }
        }, [registrosFiltrados]);
    return(
        <>
            {registrosFiltrados.map((registro) => (

            <>
                {registro.entregado === false &&(
                    <>
                        <div ref={ticketRef} className="">
                            <div className="text-center">
                                <h2 className="font-bold text-lg">Distribuidor TIGER</h2>
                                <p>Calle Independencia #99</p>
                                <p>Tel: 9821038088</p>
                                <hr className="my-2" />
                            </div>

                            <p><strong>Fecha:</strong> {registro?.fecha || "N/A"}</p>
                            <p><strong>Cliente:</strong> {registro?.cliente || "N/A"}</p>

                            <hr className="my-2" />
                            <h1>Producto</h1>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr>
                                        <th className="text-left">##</th>
                                        <th className="text-left">Producto</th>
                                        <th className="text-right">subTotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registro?.productos?.map((p, index) => (
                                        <tr key={index}>
                                            <td className="text-xl">{p.cantidad}</td>
                                            <td className="text-xl">{p.producto}</td>
                                            <td className="text-xl text-right">${(p.cantidad * p.precio)}</td>
                                        </tr>
                                    )) || (
                                        <tr>
                                            <td colSpan="4" className="text-center">No hay productos</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <hr className="my-2" />

                            {registro.mermas > [0] && (
                                <>
                                    <h1>Merma</h1>
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr>
                                                <th className="text-left">Cant.</th>
                                                <th className="text-left">Producto</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {registro?.mermas?.map((m, index) => (
                                                    <tr key={index}>
                                                        <td>{m.cantidad}</td>
                                                        <td>{m.descripcion}</td>
                                                    </tr>
                                                )) || (
                                                    <tr>
                                                        <td colSpan="4" className="text-center">No hay productos</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    <hr className="my-2" />
                                </>
                            )}

                            <p className="text-2xl" ><strong>Total:</strong> ${registro?.total || "0.00"}</p>
                            <p><strong>N° de Artículos:</strong> {registro?.productos?.reduce((acc, p) => acc + p.cantidad, 0) || 0}</p>

                            <div className="text-center my-4">
                                <p>¡Gracias por su compra!</p>
                                <p>DISTRIBUIDOR TIGER</p>
                                <p>SANTO DOMINGO KESTE</p>
                            </div>
                        </div>
                    </>
                )}
            </>

            ))}
        </>
    )
}

export default TodoTiket;