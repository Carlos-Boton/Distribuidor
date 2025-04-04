import { useState, useEffect } from "react";
import Ticket from "../ticket/Ticket";

const MostrarRegistros = () => {
  const [registros, setRegistros] = useState([]);
  const [registroEditando, setRegistroEditando] = useState(null);
  const [tiketImpreso, setTiketImpreso] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalResumenAbierto, setModalResumenAbierto] = useState(false);
  const [productosSeleccionados, setProductosSeleccionados] = useState({});
  const [resumen, setResumen] = useState({ totalPedidos: 0, totalProductos: 0, productosAgrupados: {} });
  const [filtroViaje, setFiltroViaje] = useState("0"); // Estado del filtro

  const handleEliminarProducto = (codigoProducto) => {
    setRegistroEditando((prevRegistro) => {
      const productosFiltrados = prevRegistro.productos.filter((p) => p.codigo !== codigoProducto);
      const nuevoTotal = productosFiltrados.reduce((acc, p) => acc + p.subtotal, 0);
      
      return {
        ...prevRegistro,
        productos: productosFiltrados,
        total: nuevoTotal
      };
    });
  };
  

  useEffect(() => {
    const registrosGuardados = JSON.parse(localStorage.getItem("registros")) || [];
    setRegistros(registrosGuardados);
  }, []);

  const tiketEnviado = (index) => {
    setTiketImpreso({ ...registros[index], index });
  };


  const hoy = new Date();
  const fechaHoy = hoy.toLocaleDateString("en-GB"); // Obtiene solo la fecha en formato "YYYY-MM-DD"

  const registrosFiltrados = filtroViaje === "0"
  ? registros.filter((registro) => registro.fecha === fechaHoy)
  : registros.filter((registro) => registro.fecha === fechaHoy && registro.viaje === filtroViaje);

  const eliminarRegistro = (index) => {
    const nuevosRegistros = registros.filter((_, i) => i !== index);
    setRegistros(nuevosRegistros);
    localStorage.setItem("registros", JSON.stringify(nuevosRegistros));
    alert("Registro eliminado.");
  };

  const marcarComoEntregado = (index) => {
    const nuevosRegistros = [...registros];
    nuevosRegistros[index].entregado = !nuevosRegistros[index].entregado; // Alternar entre entregado y no entregado

    // Ordenar: los no entregados primero, los entregados al final
    nuevosRegistros.sort((a, b) => (a.entregado === b.entregado ? 0 : a.entregado ? 1 : -1));

    setRegistros(nuevosRegistros);
    localStorage.setItem("registros", JSON.stringify(nuevosRegistros));
  };

  const abrirModalEdicion = (index) => {
    setRegistroEditando({ ...registros[index], index });
    setModalAbierto(true);
  };

  const guardarEdicion = () => {
    const nuevosRegistros = [...registros];
    nuevosRegistros[registroEditando.index] = { ...registroEditando };
    setRegistros(nuevosRegistros);
    localStorage.setItem("registros", JSON.stringify(nuevosRegistros));
    setModalAbierto(false);
    alert("Registro actualizado.");
  };

  const calcularResumen = () => {
    let totalPedidos = 0;
    let totalProductos = 0;
    let productosAgrupados = {};

    registrosFiltrados.forEach((registro) => {
      totalPedidos += registro.total;
      registro.productos.forEach((prod) => {
        totalProductos += prod.cantidad;
        if (productosAgrupados[prod.producto]) {
          productosAgrupados[prod.producto] += prod.cantidad;
        } else {
          productosAgrupados[prod.producto] = prod.cantidad;
        }
      });
    });

    setResumen({ totalPedidos, totalProductos, productosAgrupados });
    setModalResumenAbierto(true);
  };

  const toggleSeleccionProducto = (producto) => {
    setProductosSeleccionados((prev) => ({
      ...prev,
      [producto]: !prev[producto]
    }));
  };

  const handleEliminarMerma = (index) => {
    setRegistroEditando((prevRegistro) => {
      const nuevasMermas = prevRegistro.mermas.filter((_, i) => i !== index);
      return {
        ...prevRegistro,
        mermas: nuevasMermas
      };
    });
  };

  return (
    <div className="p-4 pt-36">
      <h2 className="text-xl font-bold mb-4">Registros Guardados</h2>
      <div className="flex justify-between space-x-3 mb-4">
        <button
          onClick={calcularResumen}
          className="mb-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Ver Resumen
        </button>
        <button
  onClick={() => {
    localStorage.removeItem("registros");
    window.location.reload(); // Recarga la página para aplicar los cambios
  }}
  className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
>
  Limpiar LocalStorage
</button>

        {/* Select para filtrar */}
        <div>
          <label className="font-bold">Filtrar por viaje:</label>
          <select
            className="border p-2 ml-2 rounded-md"
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
      </div>
      {registrosFiltrados.length === 0 ? (
        <div className="mb-4 p-4 border rounded-lg shadow-md">
          <p>No hay registros guardados</p>
        </div>
      ) : (
        <ul>
          {registrosFiltrados.map((registro, index) => (
            <li key={index} className={`mb-4 p-4 border rounded-lg shadow-md ${registro.entregado ? "bg-green-200" : "bg-white"}`}>
              <div className="flex justify-between space-x-3 mb-3">
                <p className="text-2xl"><strong>Cliente:</strong> {registro.cliente}</p>
                <p className="text-2xl"><strong>viaje:</strong> {registro.viaje}</p>
              </div>
              <p><strong>Productos:</strong></p>
              <table className="w-full border-collapse border border-gray-300 my-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">##</th>
                    <th className="border border-gray-300 p-2">Producto</th>
                    <th className="border border-gray-300 p-2">Precio</th>
                    <th className="border border-gray-300 p-2">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {registro.productos.map((prod, i) => (
                    <tr key={i} className="text-center">
                      <td className="border border-gray-300 p-2">{prod.cantidad}</td>
                      <td className="border border-gray-300 p-2">{prod.producto}</td>
                      <td className="border border-gray-300 p-2">${prod.precio.toFixed(2)}</td>
                      <td className="border border-gray-300 p-2">${(prod.cantidad * prod.precio).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-3xl"><strong>Total:</strong> ${registro.total}</p>
              {registro.mermas && (
                <div>
                  <p><strong>Mermas:</strong></p>
                  <table className="w-full border-collapse border border-gray-300 my-4">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 p-2">##</th>
                        <th className="border border-gray-300 p-2">Merma</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registro.mermas.map((merma, i) => (
                      <tr key={i} className="text-center">
                        <td className="border border-gray-300 p-2">{merma.cantidad}</td>
                        <td className="border border-gray-300 p-2">{merma.descripcion}</td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <p><strong>Fecha/Hora:</strong> {registro.fecha}</p>
              <button
                onClick={() => marcarComoEntregado(index)}
                className={`p-2 rounded-md text-white mr-2 ${
                  registro.entregado ? "bg-green-600 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {registro.entregado ? "Desentregar" : "Entregado"}
              </button>
              <button
                onClick={() => abrirModalEdicion(index)}
                className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => tiketEnviado(index)}
                className="p-2 rounded-md text-white mr-2 bg-blue-500 hover:bg-blue-600"
              >
                Imprimir Ticket
              </button>
              <button
                onClick={() => eliminarRegistro(index)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
       {tiketImpreso && (
        <div>
          <Ticket tiketImpreso={tiketImpreso}/>
        </div>
      )}
{modalResumenAbierto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-36">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Resumen de Pedidos</h2>
            <p><strong>Total de Pedidos:</strong> ${resumen.totalPedidos.toFixed(2)}</p>
            <p><strong>Total de Productos:</strong> {resumen.totalProductos}</p>
            <h3 className="mt-4 font-bold mb-2">Productos Agrupados</h3>
            <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-md mb-2">
            <table className="w-full border-collapse border border-gray-300 my-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Producto</th>
                  <th className="border border-gray-300 p-2">Cantidad Total</th>
                  <th className="border border-gray-300 p-2">Seleccionar</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(resumen.productosAgrupados).map(([producto, cantidad], i) => (
                  <tr key={i} className={productosSeleccionados[producto] ? "bg-green-200" : ""}>
                    <td className="border border-gray-300 p-2">{producto}</td>
                    <td className="border border-gray-300 p-2">{cantidad}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      <input
                        type="radio"
                        name="productoSeleccionado"
                        onChange={() => toggleSeleccionProducto(producto)}
                        checked={productosSeleccionados[producto] || false}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <button onClick={() => setModalResumenAbierto(false)} className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de Edición */}
      {modalAbierto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-36">
          <div className="bg-white p-6 rounded-lg shadow-lg max-h-[95%] overflow-auto w-100">
            <h2 className="text-lg font-bold mb-4">Editar Registro</h2>
            
            {/* Editar Cliente */}
            <p className="text-xl"><strong>Cliente:</strong> {registroEditando.cliente}</p>
            <p className="text-xl"><strong>fecha:</strong> {registroEditando.fecha}</p>

            {/*<input
              type="text"
              className="border p-2 w-full mb-2"
              value={registroEditando.cliente}
              onChange={(e) => setRegistroEditando({ ...registroEditando, cliente: e.target.value })}
            />*/}

            {/* Editar Productos */}

            <h3 className="text-lg font-semibold mt-4">Total: ${registroEditando.total}</h3>

            <label className="block">Productos:</label>

            <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Quit</th>
                            <th className="border p-2">##</th>
                            <th className="border p-2">Nombre</th>
                            <th className="border p-2">Precio</th>
                            <th className="border p-2">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registroEditando.productos.map((producto) => (
                            <tr key={producto.codigo}>
                                <td className="border p-2">
                                    <button
                                    onClick={() => handleEliminarProducto(producto.codigo)}
                                    className="text-red-500 hover:text-red-600"
                                    >
                                    ❌
                                    </button>
                                </td>
                                <td className="border p-2">{producto.cantidad}</td>
                                <td className="border p-2">{producto.producto}</td>
                                <td className="border p-2">${producto.precio}</td>
                                <td className="border p-2">${producto.subtotal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            {/* Editar Mermas */}
            <label className="block">Mermas:</label>
            
            {registroEditando.mermas.map((merma, index) => (
              <li key={index} className="flex justify-between items-center p-2 border border-gray-200 rounded-md">
                <span>
                  {merma.descripcion} - Cantidad: {merma.cantidad}
                </span>
                <button
                  onClick={() => handleEliminarMerma(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  ❌
                </button>
              </li>
            ))}

            {/* Botones */}
            <div className="flex justify-end mt-4">
              <button onClick={guardarEdicion} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mr-2">
                Guardar
              </button>
              <button onClick={() => setModalAbierto(false)} className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MostrarRegistros;
