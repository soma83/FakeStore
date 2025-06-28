import {Link} from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-96 text-center">
    <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
      Página no encontrada
    </h2>
    <p className="text-gray-600 mb-8 max-w-md">
      ¡Ups! Parece que no tenemos contabilizada la página que buscas. Verifica bien lo que has entrado.
    </p>
    <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
      Volver al inicio
    </Link>
  </div>
);

export default NotFound;
