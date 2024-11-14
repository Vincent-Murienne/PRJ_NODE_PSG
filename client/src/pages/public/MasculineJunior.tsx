import React from 'react';
import MasculineJunior from '../../components/section/MasculineJunior'

const MasculineJuniorPage: React.FC = () => {
  const sectionId = '1';
  const nom_section = 'Masculine Junior';

  return (
    <div>
      <MasculineJunior sectionId={sectionId} nom_section={nom_section} />
    </div>
  );
};

export default MasculineJuniorPage;
