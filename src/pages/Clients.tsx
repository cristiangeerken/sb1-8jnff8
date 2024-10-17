import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, Timestamp, query, orderBy } from 'firebase/firestore';
import { useFirebase } from '../context/FirebaseContext';
import { UserPlus, Users } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: Timestamp;
}

const Clients: React.FC = () => {
  const { db } = useFirebase();
  const [clients, setClients] = useState<Client[]>([]);
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', service: '' });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const clientsCollection = collection(db, 'clients');
    const clientsQuery = query(clientsCollection, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(clientsQuery);
    const clientList: Client[] = [];
    querySnapshot.forEach((doc) => {
      clientList.push({ id: doc.id, ...doc.data() } as Client);
    });
    setClients(clientList);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'clients'), {
        ...newClient,
        date: Timestamp.now(),
      });
      setNewClient({ name: '', email: '', phone: '', service: '' });
      fetchClients();
    } catch (error) {
      console.error('Error adding client: ', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-pink-800 mb-6 text-center">Gestión de Clientes</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-pink-700 mb-4 flex items-center">
          <UserPlus className="mr-2" /> Agregar Nuevo Cliente
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form inputs remain the same */}
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-pink-700 mb-4 flex items-center">
          <Users className="mr-2" /> Lista de Clientes
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Table header and body remain the same */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Clients;