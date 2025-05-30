import { useState } from "react";
import { useAuth } from "../firebase/AutoContext";

const UserMenu = () => {
    const { logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        
        <div className="relative">
            {/* Nombre de usuario con imagen */}
            <div className="bg-zinc-600 flex items-center cursor-pointer p-3" onClick={toggleMenu}>
                <img
                src="https://www.w3schools.com/w3images/avatar2.png" // Reemplaza con la imagen del usuario
                alt="Usuario"
                className="w-10 h-10 rounded-full mr-2"
                />
                <span className="text-white text-xl font-semibold mr-2">Distribuidor</span>
            </div>

            {/* Menú desplegable */}
            {menuOpen && (
                <div className="absolute right-5 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                    {/* Imagen del usuario en el menú */}
                    <img
                        src="https://www.w3schools.com/w3images/avatar2.png"
                        alt="Usuario"
                        className="w-20 h-20 rounded-full mb-3"
                    />
                    {/* Botones del menú */}
                    <button className="w-full py-2 text-center text-gray-700 hover:bg-gray-200 rounded-lg">
                        Perfil
                    </button>
                    <button
                    onClick={logout}
                    className="w-full py-2 text-red-600 hover:bg-red-100 rounded-lg">
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
