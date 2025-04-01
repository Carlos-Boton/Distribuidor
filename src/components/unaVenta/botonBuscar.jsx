
const BotonBuscar = ({setModalAbierto}) => {

    return(
        <>
            <button
            onClick={() => setModalAbierto(true)}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
                🔍
            </button>
        </>
    )
}

export default BotonBuscar;