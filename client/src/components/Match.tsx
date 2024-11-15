import React from 'react';

interface MatchProps {
  date_match: string;
  lieu_match: string;
  nom_adversaire: string;
  nom_section: string;
  type_match: string;
}

const Match: React.FC<MatchProps> = ({ date_match, lieu_match, nom_adversaire, type_match}) => {
  return (
    <div className="match">
      <div className="match-contenu">
        <p>Date : {new Date(date_match).toLocaleDateString()}</p>
        <p>Lieu : {lieu_match}</p>
        <p>Adversaire : {nom_adversaire}</p>
        <p>
          Statut : {type_match == 'passe' ? 'Match déjà joué' : 'Match à venir'}
        </p>
      </div>
    </div>
  );
};

export default Match;
