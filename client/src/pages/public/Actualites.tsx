import React, { useEffect, useState } from 'react';
import "../../assets/css/actualites.css"

interface Actualite {
  id_actualite: number;
  titre: string;
  date: string;
  texte_long: string;
  resume: string;
  image: string;
}

const Actualites: React.FC = () => {
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchActualites = async () => {
      try {
        const response = await fetch(`${apiURL}/actualites`);
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json();
    
        const formattedData = data.map((actualite: Actualite) => ({
          ...actualite,
          image: actualite.image.startsWith("http") 
          ? actualite.image 
          : `/api/uploads/${actualite.image.split('/').pop()}`
        }));
    
        setActualites(formattedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des actualités :", error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchActualites();
  }, []);

  if (loading) {
    return <div>Chargement des actualités...</div>;
  }

  return (
   
  
    <div>
      <div className="actualites-title">Toutes les Actualités</div>
      <div className="actualites-container">
      {actualites.length > 0 ? (
        actualites.map((actualite) => (
          <div key={actualite.id_actualite} className="actualite-item">
            <h2 className="actualites-subTitle">{actualite.titre}</h2>
            <small>{new Date(actualite.date).toLocaleDateString()}</small>
            <p className="actualites-paragraph">{actualite.resume}</p>
            {actualite.image && <img src={actualite.image} alt={actualite.titre} />}
            <p>{actualite.texte_long}</p>
          </div>
        ))
      ) : (
        <p>Aucune actualité disponible.</p>
      )}
    </div>
    </div>
  );
};

export default Actualites;