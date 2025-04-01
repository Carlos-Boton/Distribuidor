

const BotonOtro = ({setModalOtroAbierto}) => {
    return(
        <>
            <button
            onClick={() => setModalOtroAbierto(true)}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            >
                Otro
            </button>
        </>
    )
}

export default BotonOtro;