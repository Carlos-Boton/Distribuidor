import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Ticket = ({ tiketImpreso }) => {
  const ticketRef = useRef();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const hasPrintedRef = useRef(false); // Usamos useRef para rastrear si ya se imprimió

  // Ejecutamos la impresión automáticamente cuando el componente se monta
  useEffect(() => {
    if (tiketImpreso && !isProcessing && !hasPrintedRef.current) {
      window.print(); // Esto abrirá el diálogo de impresión
      hasPrintedRef.current = true; // Marcamos que ya se ha impreso
    }
  }, [tiketImpreso, isProcessing]); // Solo se ejecuta cuando el ticket cambia

  // Redirigir después de la impresión usando un setTimeout
  useEffect(() => {
    if (tiketImpreso) {
      const timer = setTimeout(() => {
        navigate("/"); // Redirige después de que el diálogo de impresión se cierre
      }, 100); // Esperamos 2 segundos después de la impresión para redirigir

      return () => clearTimeout(timer); // Limpiar el temporizador en caso de que el componente se desmonte
    }
  }, [tiketImpreso, navigate]);

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
              <th className="text-left">Cant.</th>
              <th className="text-left">Producto</th>
              <th className="text-right">Precio</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {tiketImpreso?.productos?.map((p, index) => (
              <tr key={index}>
                <td>{p.cantidad}</td>
                <td>{p.producto}</td>
                <td className="text-right">${p.precio.toFixed(2)}</td>
                <td className="text-right">${(p.cantidad * p.precio).toFixed(2)}</td>
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


        <p><strong>Total:</strong> ${tiketImpreso?.total?.toFixed(2) || "0.00"}</p>
        <p><strong>N° de Artículos:</strong> {tiketImpreso?.productos?.reduce((acc, p) => acc + p.cantidad, 0) || 0}</p>

        <div className="text-center mt-4">
          <p>¡Gracias por su compra!</p>
          <p>DISTRIBUIDOR TIGER</p>
          <p>SANTO DOMINGO KESTE</p>
        </div>
      </div>

      {/* Botón de imprimir dentro del ticket */}
    </div>
  );
};

export default Ticket;
