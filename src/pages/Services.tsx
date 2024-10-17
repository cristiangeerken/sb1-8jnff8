import React from 'react';
import { Sparkles, Scissors, Brush, GraduationCap } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    { name: 'Uñas', icon: <Scissors />, description: 'Manicura, pedicura, uñas de gel y acrílico.' },
    { name: 'Pestañas', icon: <Sparkles />, description: 'Extensión y lifting de pestañas.' },
    { name: 'Cejas', icon: <Brush />, description: 'Diseño, perfilado y tinte de cejas.' },
    { name: 'Micropigmentación', icon: <Brush />, description: 'Micropigmentación facial y corporal.' },
    { name: 'Cursos', icon: <GraduationCap />, description: 'Formación profesional en técnicas de belleza.' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-pink-800 mb-6 text-center">Nuestros Servicios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-pink-100 p-3 rounded-full mr-4 text-pink-600">
                {service.icon}
              </div>
              <h2 className="text-xl font-semibold text-pink-700">{service.name}</h2>
            </div>
            <p className="text-pink-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;