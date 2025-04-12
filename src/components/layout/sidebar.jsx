import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon,ClipboardDocumentListIcon,WrenchScrewdriverIcon,TruckIcon,UserGroupIcon,ChartBarIcon,CubeIcon,PlusCircleIcon,BanknotesIcon,CalendarDaysIcon  } from "@heroicons/react/24/solid";



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
            className="w-64 h-full bg-yellow-700 text-white p-4"
            onClick={(e) => e.stopPropagation()} // Evita que el click cierre el sidebar
            >
                <button onClick={toggleSidebar}><h2 className="text-xl font-bold mb-4">DISTRIBUIDOR TIGER</h2></button>

                <ul>
                    {/* Opción 1 con submenú */}
                    <li className="py-2 mb-3">
                        <button
                            className="flex items-center w-full text-left ml-2"
                            onClick={() => toggleSubmenu(1)}
                        >
                            <ClipboardDocumentListIcon className="h-6 w-6 text-white" /><strong>PEDIDOS</strong><ChevronDownIcon className="w-5 h-5 ml-2" />
                            {
                                openSubmenu === null && (
                                    <></>
                                )
                            }
                        </button>
                        {openSubmenu === 1 && (
                        <ul className="pl-4 mt-2">
                            <li className="py-1 flex items-center">
                            <PlusCircleIcon className="h-6 w-6 text-white" /><Link to="/" className="block ml-2"><strong>GENARAR PEDIDO</strong></Link>
                            </li>
                            <li className="py-1 flex items-center">
                            <TruckIcon className="h-6 w-6 text-white" /><Link to="/Viaje_pedidos" className="block ml-2"><strong>VIAJE DE PEDIDOS</strong></Link>
                            </li>
                        </ul>
                    )}
                    </li>

                    {/* Opción 2 con submenú */}
                    <li className="py-2 mb-3">
                        <button
                            className="flex items-center w-full text-left ml-2"
                            onClick={() => toggleSubmenu(2)}
                        >
                            <WrenchScrewdriverIcon className="h-6 w-6 text-white" /><strong>GESTION</strong> <ChevronDownIcon className="w-5 h-5 ml-2" />
                        </button>
                        {openSubmenu === 2 && (
                            <ul className="pl-4 mt-2">
                                <li className="py-1 flex items-center">
                                <UserGroupIcon className="h-6 w-6 text-white" /><Link to="/Clientes" className="block ml-2"><strong>CLIENTES</strong></Link>
                                </li>
                                <li className="py-1 flex items-center">
                                <CubeIcon className="h-6 w-6 text-white" /><Link to="/Productos" className="block ml-2"><strong>PRODUCTOS</strong></Link>
                                </li>
                                <li className="py-1 flex items-center">
                                <CalendarDaysIcon className="w-6 h-6 text-white" /><Link to="/Eventos" className="block ml-2"><strong>EVENTOS</strong></Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Opción 3 con submenú */}
                    <li className="py-2 mb-3">
                        <button
                            className="flex items-center w-full text-left ml-2"
                            onClick={() => toggleSubmenu(3)}
                        >
                            <ChartBarIcon className="h-6 w-6 text-white" /><strong>VENTAS</strong> <ChevronDownIcon className="w-5 h-5 ml-2" />
                        </button>
                        {openSubmenu === 3 && (
                            <ul className="pl-4 mt-2">
                                <li className="py-1 flex items-center">
                                <BanknotesIcon className="h-6 w-6 text-white"/><Link to="/Consultar_ventas" className="block ml-2"><strong>CONSULTAR VENTAS</strong></Link>
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