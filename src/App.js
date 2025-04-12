import { useEffect } from "react";
import { AuthProvider,useAuth } from './components/firebase/AutoContext';  // Solo importa AuthProvider desde 'AuthContext'
import { db } from "./components/firebase/data";  // Asegúrate que esté bien importado
import { addDoc, collection } from "firebase/firestore";
import Navbar from "./components/layout/navbar";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import UnaVenta from "./components/unaVenta/unaVenta";
import ViajedePedidos from "./components/Viaje de Pedidos/ViajeDePedidos";
import ConsultarVentas from "./components/consultarVentas/consultarVentas";
import Clientes from "./components/clientes/clientes";
import Productos from "./components/productos/productos";
import Registro from "./components/registro/sesion";
import Eventos from "./components/eventos/evento";

function App() { // Verifica si estás obteniendo el usuario correctamente

  
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
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user } = useAuth();  // Accede al estado del usuario desde el contexto

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
    <BrowserRouter>
        {user && <Navbar />}
        <Routes>
            <Route 
                path="/" 
                element={user ? <UnaVenta /> : <Navigate to="/login" />} 
            />
            <Route 
                path="/Viaje_pedidos" 
                element={user ? <ViajedePedidos /> : <Navigate to="/login" />} 
            />
            <Route 
                path="/Clientes" 
                element={user ? <Clientes /> : <Navigate to="/login" />} 
            />
            <Route 
                path="/Productos" 
                element={user ? <Productos /> : <Navigate to="/login" />} 
            />
            <Route 
                path="/Eventos" 
                element={user ? <Eventos /> : <Navigate to="/login" />} 
            />
            <Route 
                path="/Consultar_ventas" 
                element={user ? <ConsultarVentas /> : <Navigate to="/login" />} 
            />
            <Route 
                path="/login" 
                element={user ? <Navigate to="/" /> : <Registro />} 
            />
      </Routes>
    </BrowserRouter>
    );
}

export default App;
