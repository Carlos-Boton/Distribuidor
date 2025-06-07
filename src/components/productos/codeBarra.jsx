import Barcode from "react-barcode";

const TicketCodigoBarras = ({ valorCode,setModalCode,imprimirTodas,productitos,toggleImprimirTodas }) => {

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            {imprimirTodas ? (
                <>
                    <div className="flex flex-col items-center justify-center">
                        <div className="mt-40 print:hidden">
                        </div>
                        <div className="p-4 mt-3">
                            <button onClick={handlePrint} className="bg-green-500 text-white p-2 rounded-md print:hidden">
                                Imprimir Código
                            </button>
                            <button onClick={toggleImprimirTodas} className="bg-red-500 text-white p-2 ml-2 rounded-md print:hidden">
                                Regresar
                            </button>
                        </div>
                        {productitos.map((p, i) => (
                            <div key={i}>
                                <div className="text-center">
                                    <h2 className="text-2xl">{p.producto}</h2>
                                    <h2>
                                        <Barcode value={p.codigo} format="CODE128"/>
                                    </h2>
                                </div>
                            </div>
                        ))}
                        <div className="p-4 mt-3">
                            <button onClick={handlePrint} className="bg-green-500 text-white p-2 rounded-md print:hidden">
                                Imprimir Código
                            </button>
                            <button onClick={toggleImprimirTodas} className="bg-red-500 text-white p-2 ml-2 rounded-md print:hidden">
                                Regresar
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-col items-center justify-center">
                        <div className="mt-40 print:hidden">
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl">{valorCode.producto}</h2>
                            <h2>
                                <Barcode value={valorCode.codigo} format="CODE128"/>
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
                </>
            ) }
        </>
    );
};

export default TicketCodigoBarras;