

const GuardarCancelar = ({setModalAbierto,setRegistros,registros,registroEditando}) => {

        // Guardar El Pedido Editado
        const guardarEdicion = () => {
            const nuevosRegistros = [...registros];
            nuevosRegistros[registroEditando.index] = { ...registroEditando };
            setRegistros(nuevosRegistros);
            localStorage.setItem("registros", JSON.stringify(nuevosRegistros));
            setModalAbierto(false);
            alert("Registro actualizado.");
          };
        //   Fin de Guardar El Pedido Editado
    return(
        <>
        {/* Botones de Guardar y Cancelar */}
        <div className="flex justify-end mt-4">
            <button onClick={guardarEdicion} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mr-2">
                Guardar
            </button>
            <button onClick={() => setModalAbierto(false)} className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600">
                Cancelar
            </button>
        </div>
        {/* Fin de Botones de Guardar y Cancelar */}
        </>
    )
}
export default GuardarCancelar;