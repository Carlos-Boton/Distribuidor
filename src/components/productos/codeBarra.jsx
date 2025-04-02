import Barcode from "react-barcode";

const TicketCodigoBarras = ({ valorCode,setModalCode }) => {

    const handlePrint = () => {
        window.print();
    };

    return (
        <div>
            <div>
                <h2>
                <Barcode value={valorCode} format="CODE128" />
                </h2>
            </div>
            <div className="p-4 mt-3">
                <button onClick={handlePrint} className="bg-green-500 text-white p-2 rounded-md print:hidden">
                    Imprimir Código
                </button>
                <button onClick={() => setModalCode(false)} className="bg-red-500 text-white p-2 ml-2 rounded-md print:hidden">
                    Regresar
                </button>
            </div>
        
        </div>
    );
};

export default TicketCodigoBarras;