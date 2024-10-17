import React, { useState, useEffect } from 'react';
import { collection, getDocs, Timestamp, query, orderBy, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useFirebase } from '../context/FirebaseContext';
import { Users, UserPlus } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: Timestamp;
}

interface User {
  id: string;
  email: string;
  role: string;
}

const Admin: React.FC = () => {
  const { db } = useFirebase();
  const [clients, setClients] = useState<Client[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchClients();
    fetchUsers();
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

  const fetchUsers = async () => {
    const usersCollection = collection(db, 'users');
    const querySnapshot = await getDocs(usersCollection);
    const userList: User[] = [];
    querySnapshot.forEach((doc) => {
      userList.push({ id: doc.id, ...doc.data() } as User);
    });
    setUsers(userList);
  };

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
      const user = userCredential.user;

      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        email: user.email,
        role: newUser.role,
      });

      setNewUser({ email: '', password: '', role: 'user' });
      setSuccess('Usuario creado exitosamente');
      fetchUsers();
    } catch (error) {
      setError('Error al crear el usuario. Por favor, inténtalo de nuevo.');
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-pink-800 mb-6 text-center">Panel de Administración</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-pink-700 mb-4 flex items-center">
          <UserPlus className="mr-2" /> Crear Nuevo Usuario
        </h2>
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-pink-600 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newUser.email}
              onChange={handleNewUserChange}
              required
              className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-pink-600 mb-1">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={newUser.password}
              onChange={handleNewUserChange}
              required
              className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-pink-600 mb-1">Rol</label>
            <select
              id="role"
              name="role"
              value={newUser.role}
              onChange={handleNewUserChange}
              className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors">
            Crear Usuario
          </button>
        </form>
        {error && <p className="mt-2 text-red-500">{error}</p>}
        {success && <p className="mt-2 text-green-500">{success}</p>}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-pink-700 mb-4 flex items-center">
          <Users className="mr-2" /> Lista de Usuarios
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-pink-100">
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Rol</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-pink-50">
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-pink-700 mb-4 flex items-center">
          <Users className="mr-2" /> Lista de Clientes
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-pink-100">
                <th className="p-2 border">Nombre</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Teléfono</th>
                <th className="p-2 border">Servicio</th>
                <th className="p-2 border">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-pink-50">
                  <td className="p-2 border">{client.name}</td>
                  <td className="p-2 border">{client.email}</td>
                  <td className="p-2 border">{client.phone}</td>
                  <td className="p-2 border">{client.service}</td>
                  <td className="p-2 border">{client.date.toDate().toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;