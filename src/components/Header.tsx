import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-pink-200 shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Heart className="text-pink-600" size={32} />
          <span className="text-2xl font-bold text-pink-800">Ann Beauty</span>
        </Link>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li><Link to="/" className="text-pink-800 hover:text-pink-600">Inicio</Link></li>
            <li><Link to="/services" className="text-pink-800 hover:text-pink-600">Servicios</Link></li>
            <li><Link to="/contact" className="text-pink-800 hover:text-pink-600">Contacto</Link></li>
            {user ? (
              <>
                <li><Link to="/admin" className="text-pink-800 hover:text-pink-600">Admin</Link></li>
                <li>
                  <button onClick={logout} className="flex items-center text-pink-800 hover:text-pink-600">
                    <LogOut size={18} className="mr-1" /> Salir
                  </button>
                </li>
              </>
            ) : (
              <li><Link to="/login" className="text-pink-800 hover:text-pink-600">Iniciar Sesión</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;