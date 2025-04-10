import React, { useRef, useEffect } from "react";


const Ticket = ({ tiketImpreso,setModalTiket }) => {
  const ticketRef = useRef();
  const hasPrintedRef = useRef(false); // Usamos useRef para rastrear si ya se imprimió

  // Ejecutamos la impresión automáticamente cuando el componente se monta
  useEffect(() => {
    if (tiketImpreso && !hasPrintedRef.current) {
      window.print(); // Esto abrirá el diálogo de impresión
      hasPrintedRef.current = true; // Marcamos que ya se ha impreso
    }
  }, [tiketImpreso]); // Solo se ejecuta cuando el ticket cambia

  // Redirigir después de la impresión usando un setTimeout
  useEffect(() => {
    if (tiketImpreso) {
      const timer = setTimeout(() => {
      }, 100); // Esperamos 2 segundos después de la impresión para redirigir

      return () => clearTimeout(timer); // Limpiar el temporizador en caso de que el componente se desmonte
    }
  }, [tiketImpreso]);

  return (
    <div className="flex flex-col">
      {/* Contenedor del ticket */}
      <div ref={ticketRef} className="">
        <div className="text-center">
          <h2 className="font-bold text-lg">Distribuidor TIGER</h2>
          <p>Calle Independencia #99</p>
          <p>Tel: 9821038088</p>
          <hr className="my-2" />
        </div>

        <p><strong>Fecha:</strong> {tiketImpreso?.fecha || "N/A"}</p>
        <p><strong>Cliente:</strong> {tiketImpreso?.cliente || "N/A"}</p>

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
            {tiketImpreso?.productos?.map((p, index) => (
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

        {tiketImpreso.mermas > [0] && (
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
            {tiketImpreso?.mermas?.map((m, index) => (
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


        <p className="text-2xl" ><strong>Total:</strong> ${tiketImpreso?.total || "0.00"}</p>
        <p><strong>N° de Artículos:</strong> {tiketImpreso?.productos?.reduce((acc, p) => acc + p.cantidad, 0) || 0}</p>

        <div className="text-center mt-4">
          <p>¡Gracias por su compra!</p>
          <p>DISTRIBUIDOR TIGER</p>
          <p>SANTO DOMINGO KESTE</p>
        </div>
      </div>

      {/* Botón de imprimir dentro del ticket */}
      <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 print:hidden" onClick={() => setModalTiket(false)}>Salir</button>
    </div>
  );
};

export default Ticket;
