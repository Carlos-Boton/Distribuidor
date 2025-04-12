import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import UserMenu from "./menuUsuario";
import Sidebar from "./sidebar";
import { Bars3Icon } from '@heroicons/react/24/outline';

const Navbar = () => {

    const routeTitles = {
        "/": "Generar Pedidos",
        "/Viaje_pedidos": "Viaje de Pedidos",
        "/Clientes": "Clientes",
        "/Productos": "Productos",
        "/Consultar_ventas": "Consultar Ventas",
    };



    const location = useLocation();
    const currentPath = location.pathname;
    const currentTitle = routeTitles[currentPath] || "Título por defecto";


    // Estado para controlar si el sidebar está abierto o cerrado
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Función para manejar el toggle del sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  

  return (
    
    <>  
    <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-yellow-600 shadow-md z-40 print:hidden">
        <div className="container mx-auto flex items-center justify-between">
          {/* Nombre de la app */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar} // Al hacer clic aquí, se alterna el sidebar
              className="text-white text-xl font-semibold ml-2"
            >
              <Bars3Icon className="h-10 w-10 text-white" />
            </button>
          </div>

          <UserMenu/>
        </div>

        {/* Franja debajo del Navbar */}
      <div className="bg-yellow-500 py-2">
        <div className="container mx-auto text-center">
          <h1 className="text-white text-2xl font-semibold">{currentTitle}</h1>
        </div>
      </div>
      </nav>
    </>
  );
};

export default Navbar;
