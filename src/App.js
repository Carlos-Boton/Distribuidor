
import { AuthProvider,useAuth } from './components/firebase/AutoContext';  // Solo importa AuthProvider desde 'AuthContext'
import Navbar from "./components/layout/navbar";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import UnaVenta from "./components/unaVenta/unaVenta";
import ViajedePedidos from "./components/Viaje de Pedidos/ViajeDePedidos";
import ConsultarVentas from "./components/consultarVentas/consultarVentas";
import Clientes from "./components/clientes/clientes";
import Productos from "./components/productos/productos";
import Registro from "./components/registro/sesion";
import Eventos from "./components/eventos/evento";
import { useState } from 'react';

function App() { // Verifica si estás obteniendo el usuario correctamente

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const [viaje, setViaje] = useState("0");
  const [mermas, setMermas] = useState([]);
  const [total, setTotal] = useState(0);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const { user } = useAuth();  // Accede al estado del usuario desde el contexto

  return (
    <BrowserRouter>
        {user && <Navbar />}
        <Routes>
            <Route 
                path="/" 
                element={user ? <UnaVenta viaje={viaje} setViaje={setViaje} productosSeleccionados={productosSeleccionados}
                setProductosSeleccionados={setProductosSeleccionados} mermas={mermas} setMermas={setMermas} clienteSeleccionado={clienteSeleccionado} setClienteSeleccionado={setClienteSeleccionado} total={total} setTotal={setTotal}
                /> : <Navigate to="/login" />}
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
