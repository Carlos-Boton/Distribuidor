
const Mermas = ({mermas,setMermas,viaje, direccionSeleccionado}) => {

    const handleEliminarMerma = (index) => {
        setMermas((prevMermas) => prevMermas.filter((_, i) => i !== index));
    };

    return(
        <>
            {viaje === "evento" ? (
                <>
                    <h3 className="text-lg font-semibold mt-4">Direccion</h3>
                    <ul className="space-y-2">
                        <li className="flex justify-between items-center p-2 border border-gray-400 rounded-md">
                            {direccionSeleccionado}
                        </li>
                    </ul>
                </>
            ) : (
                <>
                    <h3 className="text-lg font-semibold mt-4">Mermas:</h3>
                    <ul className="space-y-2">
                        {mermas.map((merma, index) => (
                            <li key={index} className="flex justify-between items-center p-2 border border-gray-200 rounded-md">
                                <span>
                                    {merma.cantidad} Pz -- {merma.descripcion}
                                </span>
                                <button
                                onClick={() => handleEliminarMerma(index)}
                                className="text-red-500 hover:text-red-600"
                                >
                                    ❌
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    )
}

export default Mermas;