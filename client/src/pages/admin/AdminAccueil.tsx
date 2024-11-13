import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Page d'administration</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
        <Link to="/admin/club">
          <button style={buttonStyle}>Gestion du Club</button>
        </Link>
        <Link to="/admin/actualite">
          <button style={buttonStyle}>Gestion des Actualités</button>
        </Link>
        <Link to="/admin/partenaire">
          <button style={buttonStyle}>Gestion des Partenaires</button>
        </Link>
        <Link to="/admin/match">
          <button style={buttonStyle}>Gestion des Matchs</button>
        </Link>
        <Link to="/admin/utilisateur">
          <button style={buttonStyle}>Gestion des Utilisateurs</button>
        </Link>
      </div>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
};

export default AdminPage;
