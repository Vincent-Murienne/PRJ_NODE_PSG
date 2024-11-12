import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Accueil from './pages/Accueil';
/*import PresentationClub from './pages/PresentationClub';
import MasculineJunior from './pages/MasculineJunior';
import MasculineSenior from './pages/MasculineSenior';
import FeminineJunior from './pages/FeminineJunior';
import FeminineSenior from './pages/FeminineSenior';
import Actualites from './pages/Actualites';
import Connexion from './pages/Connexion';
import CreationCompte from './pages/CreationCompte';
import Contact from './pages/Contact';
import MentionsLegales from './pages/MentionsLegales';

// Pages privées (Espace d'administration)
import AdminAccueil from './admin/AdminAccueil';
import AdminPresentationClub from './admin/AdminPresentationClub';
import AdminActualites from './admin/AdminActualites';
import AdminPartenaires from './admin/AdminPartenaires';
import AdminMatchs from './admin/AdminMatchs';
import AdminActivationCompte from './admin/AdminActivationCompte';*/

// Fonction de vérification d'authentification
const isAuthenticated = () => {
  // Logique pour vérifier si l'utilisateur est connecté et autorisé
  return Boolean(localStorage.getItem('token'));
};

// Composant pour protéger les routes privées
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/connexion" />;
};

// Configuration du routeur
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Accueil />} />
        {/*<Route path="/presentation-club" element={<PresentationClub />} />
        <Route path="/section-masculine-junior" element={<MasculineJunior />} />
        <Route path="/section-masculine-senior" element={<MasculineSenior />} />
        <Route path="/section-feminine-junior" element={<FeminineJunior />} />
        <Route path="/section-feminine-senior" element={<FeminineSenior />} />
        <Route path="/actualites" element={<Actualites />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/creation-compte" element={<CreationCompte />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />*/}

        {/* Routes privées (protégées) */}
        {/*<Route path="/admin" element={<PrivateRoute><AdminAccueil /></PrivateRoute>} />
        <Route path="/admin/presentation-club" element={<PrivateRoute><AdminPresentationClub /></PrivateRoute>} />
        <Route path="/admin/actualites" element={<PrivateRoute><AdminActualites /></PrivateRoute>} />
        <Route path="/admin/partenaires" element={<PrivateRoute><AdminPartenaires /></PrivateRoute>} />
        <Route path="/admin/matchs" element={<PrivateRoute><AdminMatchs /></PrivateRoute>} />
        <Route path="/admin/activation-compte" element={<PrivateRoute><AdminActivationCompte /></PrivateRoute>} />*/}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
