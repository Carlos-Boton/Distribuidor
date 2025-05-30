import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/data";  // Asegúrate de que el path esté correcto
import error from "../img/error.png";
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";


export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorSesion, setErrorSesion] = useState(false);

    const iniciarSesion = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            
        })
        .catch((error) => {
            console.error("Error al iniciar sesión:", error.message);
            setErrorSesion(true);
        });
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-300">
                <form
                onSubmit={iniciarSesion}
                className="p-6 w-full min-h-screen max-w-md"
                >
                    <div className="flex items-center justify-center mt-10">
                        <div className="inline-grid">
                            <UserCircleIcon className="h-40 w-40 text-gray-800" />
                            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
                        </div>
                    </div>

                    <div className="relative w-full max-w-sm mx-auto mt-4 mb-10">
                        {/* Input container */}
                        <div className="relative">
                            {/* Label flotante */}
                            <label
                            className={`absolute left-3 rounded-xl text-gray-500 text-sm transition-all duration-200 ${
                            email ? "-top-8 text-xl text-black" : "top-2"
                            }`}
                            >
                                Correo
                            </label>

                            {/* Input */}
                            <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>

                    <div className="relative w-full max-w-sm mx-auto mb-8">
                        {/* Input container */}
                        <div className="relative">
                            {/* Label flotante */}
                            <label
                            className={`absolute left-3 text-gray-500 text-sm transition-all duration-200 ${
                                password ? "-top-8 text-xl text-black" : "top-2"
                            }`}
                            >
                            Contraseña
                            </label>

                            {/* Input */}
                            <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            {/* Icono ojo */}
                            <div
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                            >
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                            </div>
                        </div>
                    </div>

                    <button
                    type="submit"
                    className="w-full bg-gray-600 text-white font-semibold py-2 rounded-xl hover:bg-gray-700 transition duration-200"
                    >
                    Iniciar sesión
                    </button>
                </form>
            </div>

            {errorSesion && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-[90%] max-h-80 text-center">
                        <h2 className="text-3xl font-semibold mb-4 text-gray-800">¡¡Error!!</h2>
                        <div className="flex items-center justify-center">
                            <img src={error} alt="Advertencia" className="w-28 mb-2" />
                        </div>
                        <p className="text-gray-600 mb-6">El correo o la contraseña es incorrecto</p>
                        <button
                            onClick={() => setErrorSesion(false)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            )}
        
        </>
    );
}
