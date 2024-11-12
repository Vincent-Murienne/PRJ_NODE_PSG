import './App.css'

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        {/* Ajoutez d'autres routes ici si nécessaire */}
      </Routes>
    </Router>
  );
};

export default App;
