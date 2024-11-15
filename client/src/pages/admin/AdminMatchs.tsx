import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Match {
  id_match: number;
  nom_adversaire: string;
  nom_section: string;
  date_match: string;
  lieu_match: string;
  score_equipe: number;
  score_adversaire: number;
}


interface MatchForm {
  id_match: number;
  date_match: string;
  lieu_match: string;
  id_adversaire: number;
  id_section: number;
  score_equipe: number;
  score_adversaire: number;
}

const AdminMatchPage: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<MatchForm | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit' | null>(null);
  const token = localStorage.getItem('token');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MatchForm>();

  // Récupération des données des matchs
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/duels/score`);
        const data: Match[] = await response.json();
        setMatches(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des matchs:', error);
      }
    };
    fetchMatches();
  }, []);

  // Soumission du formulaire
  const onSubmit = async (data: MatchForm) => {
    try {
      const url = formMode === 'edit'
        ? `${import.meta.env.VITE_API_URL}/duels/${data.id_match}`
        : `${import.meta.env.VITE_API_URL}/duels`;
  
      const method = formMode === 'edit' ? 'PUT' : 'POST';
  
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data),
      });
  
      alert('Opération réussie !'); // S'assurer qu'il n'y a qu'un seul alert ici.
  
      // Réinitialiser le formulaire et recharger les données
      setFormMode(null);
      reset();
      setSelectedMatch(null);
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}/duels/score`);
      const updatedMatches: Match[] = await response.json();
      setMatches(updatedMatches);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    }
  };
  
  

  return (
    <div>
      <h1>Gestion des matchs</h1>

      {/* Liste des matchs */}
      <table>
        <thead>
          <tr>
            <th>ID Match</th>
            <th>Nom Adversaire</th>
            <th>Nom Section</th>
            <th>Date du Match</th>
            <th>Lieu du Match</th>
            <th>Score Équipe</th>
            <th>Score Adversaire</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id_match}>
              <td>{match.id_match}</td>
              <td>{match.nom_adversaire}</td>
              <td>{match.nom_section}</td>
              <td>{new Date(match.date_match).toLocaleDateString('fr-FR')}</td>
              <td>{match.lieu_match}</td>
              <td>{match.score_equipe}</td>
              <td>{match.score_adversaire}</td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Boutons pour ajouter ou modifier */}
      <div>
        <button
          onClick={() => {
            setFormMode('add');
            reset();
          }}
        >
          Ajouter un match
        </button>
        <button
          onClick={() => {
            setFormMode('edit');
            reset(selectedMatch || {});
          }}
        >
          Modifier un match
        </button>
      </div>

      {/* Formulaire */}
      {formMode && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Champ pour l'ID du match */}
          {formMode === 'edit' && (
            <div>
              <label>ID Match :</label>
              <input
                type="number"
                {...register('id_match', { required: 'ID du match obligatoire' })}
                defaultValue={selectedMatch?.id_match || ''}
              />
              {errors.id_match && <span>{errors.id_match.message}</span>}
            </div>
          )}
        
          <div>
            <label>Date du match :</label>
            <input
              type="date"
              {...register('date_match', { required: 'Date obligatoire' })}
              defaultValue={selectedMatch?.date_match || ''}
            />
            {errors.date_match && <span>{errors.date_match.message}</span>}
          </div>
          <div>
            <label>Lieu du match :</label>
            <input
              type="text"
              {...register('lieu_match', { required: 'Lieu obligatoire' })}
              defaultValue={selectedMatch?.lieu_match || ''}
            />
            {errors.lieu_match && <span>{errors.lieu_match.message}</span>}
          </div>
          <div>
            <label>ID Adversaire :</label>
            <input
              type="number"
              {...register('id_adversaire', { required: 'ID obligatoire' })}
              defaultValue={selectedMatch?.id_adversaire || ''}
            />
            {errors.id_adversaire && <span>{errors.id_adversaire.message}</span>}
          </div>
          <div>
            <label>ID Section :</label>
            <input
              type="number"
              {...register('id_section', { required: 'ID obligatoire' })}
              defaultValue={selectedMatch?.id_section || ''}
            />
            {errors.id_section && <span>{errors.id_section.message}</span>}
          </div>
          <div>
            <label>Score Équipe :</label>
            <input
              type="number"
              {...register('score_equipe', { required: 'Score obligatoire' })}
              defaultValue={selectedMatch?.score_equipe || ''}
            />
            {errors.score_equipe && <span>{errors.score_equipe.message}</span>}
          </div>
          <div>
            <label>Score Adversaire :</label>
            <input
              type="number"
              {...register('score_adversaire', { required: 'Score obligatoire' })}
              defaultValue={selectedMatch?.score_adversaire || ''}
            />
            {errors.score_adversaire && <span>{errors.score_adversaire.message}</span>}
          </div>
          <button type="submit">{formMode === 'edit' ? 'Modifier' : 'Ajouter'}</button>
        </form>      
      )}
    </div>
  );
};

export default AdminMatchPage;
