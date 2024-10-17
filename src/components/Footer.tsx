import React from 'react';
import { Instagram, Facebook, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-pink-200 text-pink-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Ann Beauty</h3>
            <p className="flex items-center">
              <MapPin size={18} className="mr-2" />
              MORÓN CENTRO, Buenos Aires, Argentina
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-pink-600"><Instagram size={24} /></a>
              <a href="#" className="hover:text-pink-600"><Facebook size={24} /></a>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <p>&copy; 2024 Ann Beauty. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;