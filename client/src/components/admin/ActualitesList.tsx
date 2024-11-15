import React, { useState, useEffect } from 'react';

interface Actualite {
  id_actualite: string;
  titre: string;
  // Ajoute d'autres champs si nécessaire
}

const ActualitesList: React.FC = () => {
  const [actualites, setActualites] = useState<Actualite[]>([]);

  useEffect(() => {
    // Fetch des actualités
    fetch(`${import.meta.env.VITE_API_URL}/actualites`)
      .then((res) => res.json())
      .then((data) => setActualites(data))
      .catch((error) => console.error('Erreur lors de la récupération des actualités', error));
  }, []);

  return (
    <div>
      <h2>Liste des Actualités</h2>
      <ul>
        {actualites.map((actualite) => (
          <li key={actualite.id_actualite}>
            <strong>ID:</strong> {actualite.id_actualite} <br />
            <strong>Titre:</strong> {actualite.titre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActualitesList;
