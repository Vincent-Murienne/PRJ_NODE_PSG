import React, { useState } from 'react';
import ActualitesList from '../../components/admin/ActualitesList';
import ActualiteForm from '../../components/admin/ActualiteForm';
import '../../assets/css/adminActualites.css';

const AdminActualites = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [actualiteId, setActualiteId] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  // Gérer l'ajout d'une nouvelle actualité
  const handleAddActualite = () => {
    setIsAdding(true);
    setIsEditing(false); // Réinitialiser le mode édition
    setActualiteId(null); // Réinitialiser l'ID
  };

  // Gérer la modification d'une actualité
  const handleEditActualite = () => {
    setIsAdding(false); // Réinitialiser le mode ajout
    setIsEditing(true); // Activer le mode édition
  };

  const handleSubmitForm = async (data: { titre: string; texte_long: string; resume: string; image: string }) => {
    console.log(actualiteId);
    if (isEditing && actualiteId) {
      // Mettre à jour une actualité
      const response = await fetch(`${import.meta.env.VITE_API_URL}/actualites/${actualiteId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        alert('Actualité mise à jour');
      } else {
        alert('Erreur lors de la mise à jour de l\'actualité');
      }
    } else if (isAdding) {
      // Créer une nouvelle actualité
      const response = await fetch(`${import.meta.env.VITE_API_URL}/actualites`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        alert('Actualité créée');
      } else {
        alert('Erreur lors de la création de l\'actualité');
      }
    }
  };

  return (
    <div className="admin-page">
      <h1>Page d'Administration</h1>
      <ActualitesList />
      <h1>Gestion des Actualités</h1>
      
      <div className="action-buttons">
        <button className="action-button" onClick={handleAddActualite}>Créer une nouvelle actualité</button>
        <button className="action-button" onClick={handleEditActualite}>Modifier une actualité</button>
      </div>
      
      {isAdding && (
        <div className="actualite-form-section">
          <h2>Ajouter une nouvelle actualité</h2>
          <ActualiteForm onSubmit={handleSubmitForm} />
        </div>
      )}
      
      {isEditing && (
        <div className="actualite-form-section">
          <h2>Modifier l'actualité</h2>
          <div>
            <label>
              ID de l'actualité :
              <input
                type="text"
                className="actualite-id-input"
                value={actualiteId || ''}
                onChange={(e) => setActualiteId(e.target.value)}
                placeholder="Entrez l'ID de l'actualité à modifier"
              />
            </label>
            {actualiteId && (
              <ActualiteForm id={actualiteId} onSubmit={handleSubmitForm} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminActualites;
