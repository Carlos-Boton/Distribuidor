import Navbar from "./components/layout/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UnaVenta from "./components/unaVenta/unaVenta";
import ViajedePedidos from "./components/Viaje de Pedidos/ViajeDePedidos"
import ConsultarVentas from "./components/consultarVentas/consultarVentas";
import Clientes from "./components/clientes/clientes";
import Productos from "./components/productos/productos";
import Prueba from "./components/prueba/prueba";

function App() {
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
          <Route path="/Prueba" element={<Prueba/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
