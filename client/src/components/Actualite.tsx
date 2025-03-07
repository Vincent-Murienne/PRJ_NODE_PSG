import React from 'react';

const apiURL = import.meta.env.VITE_API_URL;

interface ActualiteProps {
  titre: string;
  image: string;
  texte_long: string;
  date: Date;
  resume: string;
}

const Actualite: React.FC<ActualiteProps> = ({ titre, image, texte_long, date, resume }) => {
  const imageUrl = image.startsWith("http") 
    ? image 
    : image.startsWith("/api/uploads") 
      ? image 
      : `/api/uploads/${image.split('/').pop()}`;
      
  return (
    <div className="actualite">
      <img src={imageUrl} alt={titre} className="actualite-image" />
      <div className="actualite-contenu">
        <h3>{titre}</h3>
        <p>{new Date(date).toLocaleDateString()}</p>
        <p>{texte_long}</p>
      </div>
    </div>
  );
};

export default Actualite;
