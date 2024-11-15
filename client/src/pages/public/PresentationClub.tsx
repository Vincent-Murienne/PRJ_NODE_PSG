import React, { useEffect, useState } from 'react';
import Club from '../../components/Club';
import '../../assets/css/presentationClub.css';

const PresentationClub: React.FC = () => {
  const [clubData, setClubData] = useState<any>(null);
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiURL}/clubs`)
      .then(res => res.json())
      .then(data => setClubData(data))   
      .catch(error => console.error('Erreur lors de la récupération des partenaires:', error));
  }, [apiURL]);
  
  return (
    <div className="presentation-club">
      <h1>Présentation du Club</h1>
      <img 
        src='https://upload.wikimedia.org/wikipedia/fr/thumb/f/ff/Logo_Paris_Saint-Germain_2024.svg/langfr-195px-Logo_Paris_Saint-Germain_2024.svg.png' 
        alt='psg' 
        className='img-psg-presentation' 
      />
      {clubData && clubData.length > 0 && (
        <Club
          presentation={clubData[0].presentation}
          histoire={clubData[0].histoire}
        />
      )}
    </div>
  );  
};

export default PresentationClub;
