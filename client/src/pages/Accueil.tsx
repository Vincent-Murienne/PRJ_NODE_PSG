// src/pages/Accueil.tsx
import React, { useEffect, useState } from 'react';
import Actualite from '../components/Actualite';
import Match from '../components/Match';
import BandeauPartenaires from '../components/BandeauPartenaires';

const Accueil: React.FC = () => {
  const [derniereActualite, setDerniereActualite] = useState<any>(null);
  const [actualites, setActualites] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [partenaires, setPartenaires] = useState<any[]>([]);

  const apiURL = import.meta.env.VITE_API_URL;
  

  useEffect(() => {
    // Récupération des données
    fetch(`${apiURL}/actualites/2`)
      .then(res => res.json())
      .then(data => setDerniereActualite(data));

    fetch('/api/actualite?limit=2')
      .then(res => res.json())
      .then(data => setActualites(data));

    fetch('/api/duels') // 3 passés, 3 à venir
      .then(res => res.json())
      .then(data => setMatches(data));

    fetch('/api/partenaires')
      .then(res => res.json())
      .then(data => setPartenaires(data));
  }, []);

  return (
    <div className="accueil">
      {/* Dernière actualité en plein écran */}
      {derniereActualite && (
        <section className="derniere-actualite">
          <Actualite
            titre={derniereActualite.titre}
            image={derniereActualite.image}
            texte_long={derniereActualite.texte_long}
          />
        </section>
      )}

      {/* Calendrier des matchs */}
      <section className="calendrier-matches">
        <h2>Calendrier</h2>
        <div className="matches">
          {matches.slice(0, 3).map((match, index) => (
            <Match
              key={index}
              date={match.date}
              lieu={match.lieu}
              adversaire={match.adversaire}
            />
          ))}
          {matches.slice(3).map((match, index) => (
            <Match
              key={index}
              date={match.date}
              lieu={match.lieu}
              adversaire={match.adversaire}
            />
          ))}
        </div>
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
            />
          ))}
        </div>
      </section>

      {/* Bandeau des partenaires */}
      <section className="bandeau-partenaires">
        <h2>Nos Partenaires</h2>
        <BandeauPartenaires partenaires={partenaires} />
      </section>
    </div>
  );
};

export default Accueil;
