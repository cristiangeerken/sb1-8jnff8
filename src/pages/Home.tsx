import React from 'react';
import { Sparkles, Star } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-pink-800 mb-6">Bienvenida a Ann Beauty</h1>
      <p className="text-xl text-pink-600 mb-8">
        <Sparkles className="inline-block mr-2" />
        Uñas | Pestañas | Cejas | Micropigmentación | Cursos
      </p>
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-pink-700 mb-4">Nuestros Servicios Destacados</h2>
        <ul className="space-y-2">
          <li className="flex items-center"><Star className="text-yellow-400 mr-2" /> Uñas de gel y acrílico</li>
          <li className="flex items-center"><Star className="text-yellow-400 mr-2" /> Extensión de pestañas</li>
          <li className="flex items-center"><Star className="text-yellow-400 mr-2" /> Diseño y perfilado de cejas</li>
          <li className="flex items-center"><Star className="text-yellow-400 mr-2" /> Micropigmentación facial</li>
          <li className="flex items-center"><Star className="text-yellow-400 mr-2" /> Cursos de formación profesional</li>
        </ul>
      </div>
      <div className="bg-pink-100 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-pink-800 mb-2">¿Por qué elegir Ann Beauty?</h3>
        <p className="text-pink-700">
          Somos especialistas certificados por UBA, con años de experiencia en el rubro de la belleza.
          Nuestro compromiso es realzar tu belleza natural con técnicas innovadoras y productos de alta calidad.
        </p>
      </div>
    </div>
  );
};

export default Home;