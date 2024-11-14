import React, { useEffect, useState } from 'react';
import MasculineJunior from '../../components/section/MasculineJunior';

const MasculineJuniorPage: React.FC = () => {
  const sectionId = '1';
  const nom_section = 'Masculine Junior';
  const [matchesWithScores, setMatchesWithScores] = useState<any[]>([]);
  const [nextMatches, setNextMatches] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const apiURL = import.meta.env.VITE_API_URL;

  // Récupérer les matchs précédents et les 3 prochains matchs
  const fetchMatches = async () => {
    try {
      const response = await fetch(`${apiURL}/duels/${sectionId}/calendrier`);
      const data = await response.json();

      if (response.ok) {
        const now = new Date();
        const pastMatches = data.filter((match: any) => new Date(match.date_match) < now);
        const futureMatches = data
          .filter((match: any) => new Date(match.date_match) >= now)
          .slice(0, 3); 

        setMatchesWithScores(pastMatches);
        setNextMatches(futureMatches);
      } else {
        setError(data.message || 'Erreur lors de la récupération des matchs.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des matchs:', error);
      setError('Erreur de connexion avec le serveur.');
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [sectionId]);

  return (
    <div>
      <MasculineJunior
        nom_section={nom_section}
        matchesWithScores={matchesWithScores}
        nextMatches={nextMatches}
        error={error}
      />
    </div>
  );
};

export default MasculineJuniorPage;
