import React, { useState } from 'react';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useFirebase } from '../context/FirebaseContext';

const Contact: React.FC = () => {
  const { db } = useFirebase();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'clients'), {
        ...formData,
        date: Timestamp.now(),
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error adding client: ', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-pink-800 mb-6 text-center">Contacto</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-pink-700 mb-4">Información de Contacto</h2>
        <ul className="space-y-4">
          <li className="flex items-center">
            <MapPin className="text-pink-600 mr-2" />
            <span>MORÓN CENTRO, Buenos Aires, Argentina</span>
          </li>
          <li className="flex items-center">
            <Phone className="text-pink-600 mr-2" />
            <span>+54 11 1234-5678</span>
          </li>
          <li className="flex items-center">
            <Mail className="text-pink-600 mr-2" />
            <span>info@annbeauty.com</span>
          </li>
          <li className="flex items-center">
            <Instagram className="text-pink-600 mr-2" />
            <span>@angelinasaucedo.academia</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-pink-700 mb-4">Envíanos un Mensaje</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-pink-600 mb-1">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-pink-600 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-pink-600 mb-1">Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-pink-600 mb-1">Mensaje</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              required
              className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors">
            Enviar Mensaje
          </button>
        </form>
        {submitStatus === 'success' && (
          <p className="mt-4 text-green-600">¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.</p>
        )}
        {submitStatus === 'error' && (
          <p className="mt-4 text-red-600">Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.</p>
        )}
      </div>
    </div>
  );
};

export default Contact;