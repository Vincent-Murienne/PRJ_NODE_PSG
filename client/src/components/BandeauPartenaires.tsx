import React from 'react';

interface PartenaireProps {
  logo: string;
  url: string;
}

const Partenaire: React.FC<PartenaireProps> = ({ logo, url }) => {
  return (
    <div className="partenaire">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={logo} alt="Logo du partenaire" className="partenaire-logo" />
      </a>
    </div>
  );
};

export default Partenaire;
