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

  const handleSubmitForm = async (formData: FormData) => {
    const method = isEditing && actualiteId ? 'PUT' : 'POST';
    const url = isEditing && actualiteId
      ? `${import.meta.env.VITE_API_URL}/actualites/${actualiteId}`
      : `${import.meta.env.VITE_API_URL}/actualites`;
  
    const response = await fetch(url, {
      method,
      body: formData,
      headers: { 'Authorization': `Bearer ${token}` }, // Pas de 'Content-Type', FormData le gère
    });
  
    if (response.ok) {
      alert(isEditing ? 'Actualité mise à jour' : 'Actualité créée');
    } else {
      alert('Erreur lors de l\'envoi des données');
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
