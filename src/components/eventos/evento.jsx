// src/pages/Eventos.jsx

import { CalendarDaysIcon } from '@heroicons/react/24/outline';

const Eventos = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
        <CalendarDaysIcon className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-700 mb-2">Sección de Eventos</h1>
        <p className="text-gray-500">Esta página está en construcción. ¡Pronto podrás gestionar tus eventos aquí!</p>
      </div>
    </div>
  );
}

export default Eventos;