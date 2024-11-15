import React, { useEffect, useState } from 'react';
import Club from '../../components/Club';
import '../../assets/css/presentationClub.css';

const PresentationClub: React.FC = () => {
  const [clubData, setClubData] = useState<any>(null);
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiURL}/clubs`)
      .then(res => res.json())
      .then(data => {
        console.log('Données récupérées:', data); // Vérifiez que vous recevez bien les données
        setClubData(data); // Mettez les données dans le state
      })
      .catch(error => console.error('Erreur lors de la récupération des partenaires:', error));
  }, [apiURL]);

  // Log pour vérifier la structure de clubData
  console.log('ClubData dans le render:', clubData);

  return (
    <div className="presentation-club">
      <h1>Présentation du Club</h1>
      <img 
        src='https://upload.wikimedia.org/wikipedia/fr/thumb/f/ff/Logo_Paris_Saint-Germain_2024.svg/langfr-195px-Logo_Paris_Saint-Germain_2024.svg.png' 
        alt='psg' 
        className='img-psg-presentation' 
      />
      
      {/* Vérifiez si clubData existe et a les propriétés presentation et histoire */}
      {clubData && clubData.presentation && clubData.histoire && (
        <Club
          presentation={clubData.presentation}  // Accéder directement à presentation et histoire
          histoire={clubData.histoire}
        />
      )}
    </div>
  );  
};

export default PresentationClub;
