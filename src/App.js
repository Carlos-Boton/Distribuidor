import { useEffect } from "react";
import { db } from "./components/firebase/data"; // Asegúrate que esté bien importado
import { addDoc, collection } from "firebase/firestore";
import Navbar from "./components/layout/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UnaVenta from "./components/unaVenta/unaVenta";
import ViajedePedidos from "./components/Viaje de Pedidos/ViajeDePedidos"
import ConsultarVentas from "./components/consultarVentas/consultarVentas";
import Clientes from "./components/clientes/clientes";
import Productos from "./components/productos/productos";

function App() {
  useEffect(() => {
    const registros = JSON.parse(localStorage.getItem("registros")) || [];
  
    if (registros.length > 0) {
      const hoy = new Date().toLocaleDateString("en-GB");
  
      if (registros[0].fecha !== hoy) {
        registros.forEach(async (registro) => {
          const { id, ...registroSinId } = registro; // Quitar el id
  
          try {
            await addDoc(collection(db, "registros"), registroSinId);
          } catch (error) {
            console.error("Error al guardar en Firebase:", error);
          }
        });
  
        localStorage.removeItem("registros");
        console.log("Registros enviados a Firebase y eliminados del localStorage.");
      }
    }
  }, []);  
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<UnaVenta/>}/>
          <Route path="/Viaje_pedidos" element={<ViajedePedidos/>}/>
          <Route path="/Clientes" element={<Clientes/>}/>
          <Route path="/Productos" element={<Productos/>}/>
          <Route path="/Consultar_ventas" element={<ConsultarVentas/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
