// import React, { Component,CSSProperties } from 'react';

// export default class MentionsLegales extends Component {
//   render() {
//     // Styles en ligne
//     const styles:  { [key: string]: CSSProperties }= {
      

//       container: {
//         padding: '20px',
//         fontFamily: 'Arial, sans-serif',
//         color: '#333',
//         lineHeight: '1.6',
//         //backgroundColor:"purple",
//         //backgroundImage:'url("https://www.tsa-algerie.com/wp-content/uploads/2024/04/foot-dz-Par-vectorfusionart-min.jpg")',
//        //backgroundImage:'url("https://png.pngtree.com/png-vector/20240109/ourlarge/pngtree-foootball-player-png-image_11430670.png")',
//         backgroundSize:'50%',
//         backgroundPosition:"center",
//         backgroundRepeat:"no-repeat",

//       },
//       title: {
//         fontSize: '24px',
//         color: '#004080',
//         marginBottom: '20px',
//         textAlign:"center",
        
//       },
//       sectionTitle: {
//         fontSize: '18px',
//         color: '#0066cc',
//         marginTop: '15px',
      
//       },
//       paragraph: {
//         marginBottom: '10px',
//       },
//       contactInfo: {
//         fontWeight: 'bold',
//         color: '#555',
//       },
//     };

//     return (
//       <div style={styles.container}>
//         <h1 style={styles.title}>Mentions Légales</h1>

//         <h2 style={styles.sectionTitle}>Nom du Club</h2>
//         <p style={styles.paragraph}>Notre Association Sport</p>

//         <h2 style={styles.sectionTitle}>Adresse du Siège Social</h2>
//         <p style={styles.paragraph}>10 avenue de Paris, Levallois-Perret</p>

//         <h2 style={styles.sectionTitle}>Directeur de la Publication</h2>
//         <p style={styles.paragraph}>Vincent Murienne</p>

//         <h2 style={styles.sectionTitle}>Contact</h2>
//         <p style={styles.contactInfo}>Téléphone : +33785463219</p>
//         <p style={styles.contactInfo}>Email : sportassoc@mail.com</p>

//         <h2 style={styles.sectionTitle}>Propriété Intellectuelle</h2>
//         <p style={styles.paragraph}>
//           L'ensemble des contenus, textes, images, vidéos, logos et éléments graphiques
//           présentés sur le site sont la propriété de Notre Association Sport ou sont utilisés
//           avec l'autorisation de leurs propriétaires respectifs.
//         </p>

//         <h2 style={styles.sectionTitle}>Protection des Données Personnelles</h2>
//         <p style={styles.paragraph}>
//           Notre Association Sport respecte la confidentialité des informations personnelles et
//           s'engage à protéger les données de ses utilisateurs.
//         </p>

//         <h2 style={styles.sectionTitle}>Cookies</h2>
//         <p style={styles.paragraph}>
//           Le site utilise des cookies pour améliorer l'expérience utilisateur et analyser la fréquentation.
//         </p>

//         <h2 style={styles.sectionTitle}>Responsabilité</h2>
//         <p style={styles.paragraph}>
//           Notre Association Sport s’efforce de fournir des informations exactes et mises à jour sur son site.
//         </p>

//         <h2 style={styles.sectionTitle}>Loi Applicable</h2>
//         <p style={styles.paragraph}>
//           Ces mentions légales sont soumises à la législation française. Tout litige sera soumis aux tribunaux compétents français.
//         </p>

//         <p style={styles.paragraph}>Date de Mise à Jour des Mentions Légales : 12/11/2024</p>
//       </div>
//     );
//   }
// } 
import React, { Component } from 'react';
import "../../assets/css/MentionsLegales/MentionsLegales.css";

export default class MentionsLegales extends Component {
  render() {
    return (
      <div className="mentions-container">
        <h1 className="mentions-title">Mentions Légales</h1>

        <h2 className="mentions-section-title">Nom du Club</h2>
        <p className="mentions-paragraph">Notre Association Sport</p>

        <h2 className="mentions-section-title">Adresse du Siège Social</h2>
        <p className="mentions-paragraph">10 avenue de Paris, Levallois-Perret</p>

        <h2 className="mentions-section-title">Directeur de la Publication</h2>
        <p className="mentions-paragraph">Vincent Murienne</p>

        <h2 className="mentions-section-title">Contact</h2>
        <p className="mentions-contact-info">Téléphone : +33785463219</p>
        <p className="mentions-contact-info">Email : sportassoc@mail.com</p>

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

        <div className="mentions-footer">
          <p>&copy; 2024 Notre Association Sport. Tous droits réservés.</p>
        </div>
      </div>
    );
  }
}