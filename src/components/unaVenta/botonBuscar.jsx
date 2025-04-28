
const BotonBuscar = ({setModalAbierto}) => {

    return(
        <>
            <button
            onClick={() => setModalAbierto(true)}
            className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
            >
                🔍
            </button>
        </>
    )
}

export default BotonBuscar;
