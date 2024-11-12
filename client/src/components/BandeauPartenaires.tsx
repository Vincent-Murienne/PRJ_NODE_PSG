// src/components/BandeauPartenaires.tsx
import React from 'react';

interface Partenaire {
  id: number;
  photo: string;
  url: string;
}

interface BandeauPartenairesProps {
  partenaires: Partenaire[];
}

const BandeauPartenaires: React.FC<BandeauPartenairesProps> = ({ partenaires }) => {
  return (
    <div className="bandeau-partenaires">
      {partenaires.map((partenaire) => (
        <a key={partenaire.id} href={partenaire.url} target="_blank" rel="noopener noreferrer">
          <img src={partenaire.photo} alt={`Partenaire ${partenaire.id}`} />
        </a>
      ))}
    </div>
  );
};

export default BandeauPartenaires;
