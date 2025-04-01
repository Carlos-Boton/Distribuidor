import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const Sidebar = ({ sidebarOpen, toggleSidebar}) => {

    const [openSubmenu, setOpenSubmenu] = useState(null);

    const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
    };

    return(
    <div
    className={`${
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
    } fixed inset-0 z-50 transition-transform duration-500`}
    onClick={toggleSidebar} // Cierra el sidebar cuando se hace clic fuera de él
  >
    <div
      className="w-64 h-full bg-indigo-700 text-white p-4"
      onClick={(e) => e.stopPropagation()} // Evita que el click cierre el sidebar
    >
      <h2 className="text-xl font-bold mb-4">DISTRIBUIDOR TIGER</h2>

      <ul>
        {/* Opción 1 con submenú */}
        <li className="py-2">
          <button
            className="flex items-center w-full text-left ml-2"
            onClick={() => toggleSubmenu(1)}
          >
            PEDIDOS <ChevronDownIcon className="w-5 h-5 ml-2" />
          </button>
          {openSubmenu === 1 && (
            <ul className="pl-4 mt-2">
              <li className="py-1">
                <Link to="/" className="block ml-2">GENARAR PEDIDO</Link>
              </li>
              <li className="py-1">
                <Link to="/Viaje_pedidos" className="block ml-2">VIAJE DE PEDIDOS</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Opción 2 con submenú */}
        <li className="py-2">
          <button
            className="flex items-center w-full text-left ml-2"
            onClick={() => toggleSubmenu(2)}
          >
            GESTION <ChevronDownIcon className="w-5 h-5 ml-2" />
          </button>
          {openSubmenu === 2 && (
            <ul className="pl-4 mt-2">
              <li className="py-1">
                <Link to="/Clientes" className="block ml-2">CLIENTES</Link>
              </li>
              <li className="py-1">
                <Link to="/Productos" className="block ml-2">PRODUCTOS</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Opción 3 con submenú */}
        <li className="py-2">
          <button
            className="flex items-center w-full text-left ml-2"
            onClick={() => toggleSubmenu(3)}
          >
            VENTAS <ChevronDownIcon className="w-5 h-5 ml-2" />
          </button>
          {openSubmenu === 3 && (
            <ul className="pl-4 mt-2">
              <li className="py-1">
                <Link to="/Consultar_ventas" className="block ml-2">CONSULTAR VENTAS</Link>
              </li>
              <li className="py-1">
                <a href="/Prueba" className="block ml-2">---</a>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  </div>
    )
}

export default Sidebar;