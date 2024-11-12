// src/components/Match.tsx
import React from 'react';

interface MatchProps {
  date: string;
  lieu: string;
  adversaire: string;
}

const Match: React.FC<MatchProps> = ({ date, lieu, adversaire }) => {
  return (
    <div className="match">
      <p>{date}</p>
      <p>{lieu}</p>
      <p>{adversaire}</p>
    </div>
  );
};

export default Match;
