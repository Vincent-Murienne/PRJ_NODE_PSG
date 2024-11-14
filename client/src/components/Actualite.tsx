import React from 'react';

interface ActualiteProps {
  titre: string;
  image: string;
  texte_long: string;
  date: Date;
  resume: string;
}

const Actualite: React.FC<ActualiteProps> = ({ titre, image, texte_long, date, resume }) => {
  return (
    <div className="actualite">
      <img src={image} alt={titre} className="actualite-image" />
      <div className="actualite-contenu">
        <h3>{titre}</h3>
        <p>{new Date(date).toLocaleDateString()}</p>
        <p>{texte_long}</p>
      </div>
    </div>
  );
};

export default Actualite;
