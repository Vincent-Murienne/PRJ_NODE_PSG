import React, { Component } from 'react';
import "../../assets/css/MentionsLegales.css";

export default class MentionsLegales extends Component {
  render() {
    return (
      <div className="mentions-container">
        <h1 className="mentions-title">Mentions Légales</h1>

        <h2 className="mentions-section-title">Nom du Club</h2>
        <p className="mentions-paragraph">Paris Saint-Germain</p>

        <h2 className="mentions-section-title">Adresse du Siège Social</h2>
        <p className="mentions-paragraph">10 avenue de Paris, Levallois-Perret</p>

        <h2 className="mentions-section-title">Directeur de la Publication</h2>
        <p className="mentions-paragraph">Vincent Murienne</p>

        <h2 className="mentions-section-title">Contact</h2>
        <p className="mentions-contact-info">Téléphone : +33785463219</p>
        <p className="mentions-contact-info">Email : <a href= "email">psg_support@mail.com</a></p>

        <h2 className="mentions-section-title">Propriété Intellectuelle</h2>
        <p className="mentions-paragraph">
          L'ensemble des contenus, textes, images, vidéos, logos et éléments graphiques
          présentés sur le site sont la propriété de Notre Association Sport ou sont utilisés
          avec l'autorisation de leurs propriétaires respectifs.
        </p>

        <h2 className="mentions-section-title">Protection des Données Personnelles</h2>
        <p className="mentions-paragraph">
          Notre Association Sport respecte la confidentialité des informations personnelles et
          s'engage à protéger les données de ses utilisateurs.
        </p>

        <h2 className="mentions-section-title">Cookies</h2>
        <p className="mentions-paragraph">
          Le site utilise des cookies pour améliorer l'expérience utilisateur et analyser la fréquentation.
        </p>

        <h2 className="mentions-section-title">Responsabilité</h2>
        <p className="mentions-paragraph">
          Notre Association Sport s’efforce de fournir des informations exactes et mises à jour sur son site.
        </p>

        <h2 className="mentions-section-title">Loi Applicable</h2>
        <p className="mentions-paragraph">
          Ces mentions légales sont soumises à la législation française. Tout litige sera soumis aux tribunaux compétents français.
        </p>

        <p className="mentions-paragraph">Date de Mise à Jour des Mentions Légales : 12/11/2024</p>

        
      </div>
    );
  }
}