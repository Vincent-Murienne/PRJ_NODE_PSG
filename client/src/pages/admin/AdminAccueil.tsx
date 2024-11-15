import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/adminAccueil.css'; // Assurez-vous que le chemin du fichier est correct

const AdminPage: React.FC = () => {
  const role = localStorage.getItem('role'); // Récupère le rôle de l'utilisateur depuis localStorage
  const parsedRole = role ? parseInt(role, 10) : null;

  return (
    <div className="admin-page">
      <h1>Page d'administration</h1>
      <div className="admin-links-container">
        {parsedRole === 1 && (
          <>
            <Link to="/admin/club">
              <button className="admin-button">Gestion du Club</button>
            </Link>
            <Link to="/admin/activation-compte">
              <button className="admin-button">Gestion des Utilisateurs</button>
            </Link>
          </>
        )}
        <Link to="/admin/actualite">
          <button className="admin-button">Gestion des Actualités</button>
        </Link>
        <Link to="/admin/partenaire">
          <button className="admin-button">Gestion des Partenaires</button>
        </Link>
        <Link to="/admin/match">
          <button className="admin-button">Gestion des Matchs</button>
        </Link>
      </div>
      <br />
    </div>
  );
};

export default AdminPage;
