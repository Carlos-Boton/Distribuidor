
const FiltrarViaje = ({setFiltroViaje,filtroViaje}) => {

    return(
        <>
            {/* Select para filtrar */}
            <div>
                <label className="font-bold print:hidden">Filtrar por viaje:</label>
                <select
                className="border p-2 ml-2 rounded-md print:hidden"
                value={filtroViaje}
                onChange={(e) => setFiltroViaje(e.target.value)}
                >
                    <option value="0">Todos</option>
                    <option value="1">Viaje 1</option>
                    <option value="2">Viaje 2</option>
                    <option value="3">Viaje 3</option>
                    <option value="4">Viaje 4</option>
                    <option value="5">Viaje 5</option>
                </select>
            </div>
        </>
    )
}

export default FiltrarViaje;