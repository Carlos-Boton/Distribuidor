

const TodoTiket = ({registrosFiltrados, setModalTiket}) => {
    return(
        <>
            {registrosFiltrados.map((registro) => (

            <>
                {registro.entregado === false &&(
                    <>
                        <div className="">
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

            <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 print:hidden" onClick={() => setModalTiket(false)}>Salir</button>
        </>
    )
}

export default TodoTiket;