import React from 'react';
import '../assets/css/section.css'

interface Match {
  id_match: number;
  date_match: string;
  lieu_match: string;
  nom_adversaire: string;
  score_equipe?: number;
  score_adversaire?: number;
}

interface SectionProps {
  nom_section: string;
  matchesWithScores: Match[];
  nextMatches: Match[];
  error: string | null;
}

const Section: React.FC<SectionProps> = ({ nom_section, matchesWithScores, nextMatches, error }) => {
  return (
    <div className="masculine-junior">
        <br />
      <h2>Section {nom_section}</h2>
      <p>
        Bienvenue dans la section {nom_section} de notre club ! <br /> Suivez leurs performances lors des matchs et venez encourager l'équipe pour les prochaines rencontres !
      </p>

      <h3>Résultats de tous les matchs précédents</h3>
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

      <h3>Prochains matchs (3 prochains)</h3>
      <ul>
        {nextMatches.length > 0 ? (
          nextMatches.map((match) => (
            <li key={match.id_match}>
              {new Date(match.date_match).toLocaleDateString()} - {match.lieu_match} vs {match.nom_adversaire}
            </li>
          ))
        ) : (
          <p>Pas de prochains matchs disponibles.</p>
        )}
      </ul>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Section;
