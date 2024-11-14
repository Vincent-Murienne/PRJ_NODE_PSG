import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface Match {
  id_match: number;
  date_match: string;
  lieu_match: string;
  nom_adversaire: string;
  nom_section: string;
  score_equipe?: number;
  score_adversaire?: number;
  type_match?: 'passe' | 'futur';
}

interface MasculineJuniorProps {
  sectionId: string;
  nom_section: string;
}

const MasculineJunior: React.FC<MasculineJuniorProps> = ({ sectionId, nom_section }) => {
  const [matchesWithScores, setMatchesWithScores] = useState<Match[]>([]);
  const [calendarMatches, setCalendarMatches] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);
  const apiURL = import.meta.env.VITE_API_URL;
  useForm();

  // Récupérer les matchs avec score
  const fetchMatchesWithScores = async () => {
    try {
      const response = await fetch(`${apiURL}/duels/score/${sectionId}`);
      const data = await response.json();

      if (response.ok) {
        setMatchesWithScores(data);
      } else {
        setError(data.message || 'Erreur lors de la récupération des matchs avec scores.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des matchs avec scores:', error);
      setError('Erreur de connexion avec le serveur.');
    }
  };

  // Récupérer les 3 derniers et 3 prochains matchs
  const fetchCalendarMatches = async () => {
    try {
      const response = await fetch(`${apiURL}/duels/${sectionId}/calendrier`);
      const data = await response.json();

      if (response.ok) {
        setCalendarMatches(data);
      } else {
        setError(data.message || 'Erreur lors de la récupération des matchs de calendrier.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des matchs de calendrier:', error);
      setError('Erreur de connexion avec le serveur.');
    }
  };

  // Charger les données à l'initialisation
  useEffect(() => {
    fetchMatchesWithScores();
    fetchCalendarMatches();
  }, [sectionId]);

  return (
    <div className="masculine-junior">
      <h2>Section {nom_section}</h2>

      <h3>Résultats des matchs passés</h3>
      {matchesWithScores.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Lieu</th>
              <th>Adversaire</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {matchesWithScores.map((match) => (
              <tr key={match.id_match}>
                <td>{new Date(match.date_match).toLocaleDateString()}</td>
                <td>{match.lieu_match}</td>
                <td>{match.nom_adversaire}</td>
                <td>{match.score_equipe} - {match.score_adversaire}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun résultat disponible.</p>
      )}

      <h3>Prochains matchs</h3>
      <ul>
        {calendarMatches.filter(match => match.type_match === 'futur').map((match) => (
          <li key={match.id_match}>
            {new Date(match.date_match).toLocaleDateString()} - {match.lieu_match} vs {match.nom_adversaire}
          </li>
        ))}
      </ul>

      <h3>Derniers matchs</h3>
      <ul>
        {calendarMatches.filter(match => match.type_match === 'passe').map((match) => (
          <li key={match.id_match}>
            {new Date(match.date_match).toLocaleDateString()} - {match.lieu_match} vs {match.nom_adversaire}
          </li>
        ))}
      </ul>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default MasculineJunior;
