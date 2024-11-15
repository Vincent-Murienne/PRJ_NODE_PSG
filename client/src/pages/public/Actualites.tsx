// import React from 'react';
// import  { useEffect, useState } from 'react';

// //import Slider from 'react-slick';
// //import 'slick-carousel/slick/slick.css';
// //import 'slick-carousel/slick/slick-theme.css';
// //import '../../assets/css/Actualites/Actualites.css';
// import axios from 'axios';

// const Actualites = () => {
//   // const settings = {
//   //   dots: true,
//   //   infinite: true,
//   //   speed: 500,
//   //   slidesToShow: 2.5,
//   //   slidesToScroll: 2,
//   //   responsive: [
//   //     {
//   //       breakpoint: 768,
//   //       settings: {
//   //         slidesToShow: 2,
//   //       },
//   //     },
//   //   ],
//   // };

// interface Actualite {
//   id_actualite: number;
//   titre: string;
//   date: string;
//   texte_long: string;
//   resume: string;
//   image: string;
// }

// //   return (
// //     <div className="actualites-container">
// //       <h1 className="actualites-title">Actualités</h1>
// //       <Slider {...settings}>
// //         <div className="actualites-item">
// //           <h3 className="actualites-subTitle">Actualité une</h3>
// //           <p className="actualites-paragraph">Celle-ci est une première actualité</p>
// //         </div>
// //         <div className="actualites-item">
// //           <h3 className="actualites-subTitle">Actualité deux</h3>
// //           <p className="actualites-paragraph">Celle-ci est une deuxième actualité</p>
// //         </div>
// //         <div className="actualites-item">
// //           <h3 className="actualites-subTitle">Actualité trois</h3>
// //           <p className="actualites-paragraph">Celle-ci est une troisième actualité</p>
// //         </div>
// //         <div className="actualites-item">
// //           <h3 className="actualites-subTitle">Actualité quatre</h3>
// //           <p className="actualites-paragraph">Celle-ci est une quatrième actualité</p>
// //         </div>
// //         <div className="actualites-item">
// //           <h3 className="actualites-subTitle">Actualité cinq</h3>
// //           <p className="actualites-paragraph">Celle-ci est une cinquième actualité</p>
// //         </div>
// //       </Slider>
// //     </div>
// //   );
// // };

// // export default Actualites;
// //const Actualites: React.FC = () => {
//   const [actualites, setActualites] = useState<Actualite[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchActualites = async () => {
//       try {
//         const response = await axios.get('/api/actualites'); 
//         console.log(response.data);
//         setActualites(response.data);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des actualités :", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchActualites();
//   }, []);

//   if (loading) {
//     return <div>Chargement des actualités...</div>;
//   }
//   fetch(`http://localhost:8080/api/actualites`)
//       .then(res => res.json())
//       .then(data => setActualites(data))
//       .catch(error => console.error('Erreur lors de la récupération des actualités:', error));

//   return (
//     <div className="actualites-container">
//       <h1>Actualités</h1>
//       {actualites.map((actualite) => (
//         <div key={actualite.id_actualite} className="actualite-item">
//           <h2>{actualite.titre}</h2>
//           <p>{actualite.resume}</p>
//           {actualite.image && <img src={actualite.image} alt={actualite.titre} />}
//           <p>{actualite.texte_long}</p>
//           <small>{new Date(actualite.date).toLocaleDateString()}</small>
//         </div>
//       ))}
//     </div>
//   );
// };
// //}

// export default Actualites;
import React, { useEffect, useState } from 'react';
import "../../assets/css/Actualites/Actualites.css"

// Définition de l'interface pour les données d'actualité
interface Actualite {
  id_actualite: number;
  titre: string;
  date: string;
  texte_long: string;
  resume: string;
  image: string;
}

const Actualites: React.FC = () => {
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchActualites = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/actualites');
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Vérifiez si c'est bien un tableau d'actualités

        setActualites(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erreur lors de la récupération des actualités :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActualites();
  }, []);

  if (loading) {
    return <div>Chargement des actualités...</div>;
  }

  return (
   
  
    <div>
      <div className="actualites-title">Toutes les Actualités</div>
      <div className="actualites-container">
      {actualites.length > 0 ? (
        actualites.map((actualite) => (
          <div key={actualite.id_actualite} className="actualite-item">
            <h2 className="actualites-subTitle">{actualite.titre}</h2>
            <small>{new Date(actualite.date).toLocaleDateString()}</small>
            <p className="actualites-paragraph">{actualite.resume}</p>
            {actualite.image && <img src={actualite.image} alt={actualite.titre} />}
            <p>{actualite.texte_long}</p>
          </div>
        ))
      ) : (
        <p>Aucune actualité disponible.</p>
      )}
    </div>
    </div>
  );
};

export default Actualites;