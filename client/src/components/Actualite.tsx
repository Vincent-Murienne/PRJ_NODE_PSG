// src/components/Actualite.tsx
import React from 'react';

interface ActualiteProps {
  titre: string;
  image: string;
  texte_long: string;
}

const Actualite: React.FC<ActualiteProps> = ({ titre, image, texte_long }) => {
  return (
    <div className="actualite">
      <img src={image} alt={titre} className="actualite-image" />
      <h2>{titre}</h2>
      <p>{texte_long}</p>
    </div>
  );
};

export default Actualite;
