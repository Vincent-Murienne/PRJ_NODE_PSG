import React, { useEffect, useState } from 'react';
import Actualite from '../../components/Actualite';
import Match from '../../components/Match';
import Partenaire from '../../components/BandeauPartenaires';
import '../../assets/css/accueil.css';

const Accueil: React.FC = () => {
  const [derniereActualite, setDerniereActualite] = useState<any>(null);
  const [actualites, setActualites] = useState<any[]>([]);
  const [sectionMatches, setSectionMatches] = useState<Record<string, any[]>>({
    '1': [],
    '2': [],
    '3': [],
    '4': [],
  });
  const [partenaires, setPartenaires] = useState<any[]>([]);

  
  const sectionNames = {
    1: 'Masculine Junior',
    2: 'Masculine Senior',
    3: 'Féminine Junior',
    4: 'Féminine Senior',
  };

  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    console.log('API URL:', apiURL);

    // Récupération de la dernière actualité
    fetch(`${apiURL}/last-actualites`)
      .then(res => res.json())
      .then(data => {
        console.log('Dernière actualité:', data);
        if (Array.isArray(data) && data.length > 0) {
          setDerniereActualite(data[0]);
        } else {
          setDerniereActualite(null);
        }
      })
      .catch(error => console.error('Erreur lors de la récupération de la dernière actualité:', error));

    // Récupération des trois dernières actualités
    fetch(`${apiURL}/three-last-actualites`)
      .then(res => res.json())
      .then(data => setActualites(data))
      .catch(error => console.error('Erreur lors de la récupération des actualités:', error));

    // Fonction pour récupérer les matchs par section
    const fetchMatchesForSection = (sectionId: string) => {
      fetch(`${apiURL}/duels/${sectionId}/calendrier`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setSectionMatches(prevState => ({
              ...prevState,
              [sectionId]: data,
            }));
          }
        })
        .catch(error => console.error(`Erreur lors de la récupération des matches pour la section ${sectionId}:`, error));
    };

    // Récupération des matchs pour chaque section
    ['1', '2', '3', '4'].forEach(sectionId => fetchMatchesForSection(sectionId));

    // Récupération des partenaires
    fetch(`${apiURL}/partenaires`)
      .then(res => res.json())
      .then(data => setPartenaires(data))
      .catch(error => console.error('Erreur lors de la récupération des partenaires:', error));
  }, [apiURL]);

  return (
    <div className="accueil">
      {/* Dernière actualité en plein écran */}
      {derniereActualite && (
        <section className="derniere-actualite">
          <Actualite
            titre={derniereActualite.titre}
            image={derniereActualite.image}
            resume={derniereActualite.resume}
            texte_long={derniereActualite.texte_long}
            date={derniereActualite.date}
          />
        </section>
      )}


      {/* Calendrier des matchs par section */}
      <section className="calendrier-matches">
        <h2>Calendrier</h2>
        {['1', '2', '3', '4'].map(sectionId => (
          <div key={sectionId}>
            <h3>{sectionNames[sectionId]}</h3>
            <div className="matches">
              {Array.isArray(sectionMatches[sectionId]) &&
                sectionMatches[sectionId].map((match, index) => (
                  <Match
                    key={index}
                    date_match={match.date_match}
                    lieu_match={match.lieu_match}
                    nom_adversaire={match.nom_adversaire}
                    type_match={match.type_match}
                  />
                ))}
            </div>
          </div>
        ))}
      </section>

      {/* Dernières actualités */}
      <section className="dernieres-actualites">
        <h2>Dernières Actualités</h2>
        <div className="actualites">
          {actualites.map((actualite, index) => (
            <Actualite
              key={index}
              titre={actualite.titre}
              image={actualite.image}
              texte_long={actualite.texte_long}
              resume={actualite.resume}
              date={actualite.date}
            />
          ))}
        </div>
      </section>

      <section className="bandeau-partenaires">
        <h2>Nos Partenaires</h2>
        <div className="partenaire">
          {partenaires.map((partenaire, index) => (
            <Partenaire
              key={index}
              logo={partenaire.logo}
              url={partenaire.url}
            />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Accueil;
