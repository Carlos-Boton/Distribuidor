
const BotonCliente = ({ setModalClientesAbierto,clienteSeleccionado }) => {

    return(
        <>
            <div className="flex justify-between space-x-3 mb-4">
                <ul className=" p-2">
                    <h3 className="text-lg font-semibold">Cliente: {clienteSeleccionado} </h3>
                </ul>
                <button
                onClick={() => setModalClientesAbierto(true)}
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Seleccionar Cliente
                </button>
            </div>
        </>
    )
}

export default BotonCliente