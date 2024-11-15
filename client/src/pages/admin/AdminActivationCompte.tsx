import React, { useEffect, useState } from 'react';
import '../../assets/css/adminActivationCompte.css';

interface User {
  id_user: number;
  full_name: string;
  email: string;
  nom_role: string;
}

const AdminActivationCompte: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Récupération des utilisateurs non activés
    fetch(`${apiURL}/users-no-activate`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('Utilisateurs non activés:', data);
        setUsers(data);
      })
      .catch(error => console.error('Erreur lors de la récupération des utilisateurs non activés:', error));
  }, [apiURL]);

  // Fonction pour activer un utilisateur
  const activateUser = (userId: number) => {
    fetch(`${apiURL}/users/${userId}/activate`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Utilisateur activé avec succès.') {
          // Mise à jour de la liste des utilisateurs pour retirer celui qui vient d'être activé
          setUsers((prevUsers) => prevUsers.filter((user) => user.id_user !== userId));
          alert('Utilisateur activé avec succès.');
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        console.error('Erreur lors de l\'activation de l\'utilisateur:', error);
        alert('Erreur lors de l\'activation de l\'utilisateur.');
      });
  };

  return (
    <div className="admin-activation-compte">
      <h2>Activation des Comptes Utilisateurs</h2>
      <div className="users-list">
        {users.length === 0 ? (
          <p>Aucun utilisateur à activer pour le moment.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nom Complet</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id_user}>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                  <td>{user.nom_role}</td>
                  <td>
                    <button
                      className="activate-btn"
                      onClick={() => activateUser(user.id_user)}
                    >
                      Activer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminActivationCompte;
