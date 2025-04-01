import JsBarcode from "jsbarcode";
import { useEffect, useRef } from "react";

const TicketCodigoBarras = ({ producto }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (producto?.codigo) {
      JsBarcode(barcodeRef.current, producto.codigo, {
        format: "CODE128",
        displayValue: true,
        fontSize: 16,
      });
    }
  }, [producto]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-container">
      <div className="ticket">
        <h2>{producto.nombre}</h2>
        <svg ref={barcodeRef}></svg>
      </div>
      <button onClick={handlePrint} className="print-btn">
        Imprimir Código
      </button>
    </div>
  );
};

export default TicketCodigoBarras;
