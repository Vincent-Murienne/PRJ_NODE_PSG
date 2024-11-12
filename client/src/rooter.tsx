import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Accueil from './pages/Accueil';
import PresentationClub from './pages/PresentationClub';
import MasculineJunior from './pages/MasculineJunior';
import MasculineSenior from './pages/MasculineSenior';
import FeminineJunior from './pages/FeminineJunior';
import FeminineSenior from './pages/FeminineSenior';
import Actualites from './pages/Actualites';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import MentionsLegales from './pages/MentionsLegales';

// Pages privées (Espace d'administration)
import AdminAccueil from './pages/admin/AdminAccueil';
import AdminPresentationClub from './pages/admin/AdminPresentationClub';
import AdminActualites from './pages/admin/AdminActualites';
import AdminPartenaires from './pages/admin/AdminPartenaires';
import AdminMatchs from './pages/admin/AdminMatchs';
import AdminActivationCompte from './pages/admin/AdminActivationCompte';

// Fonction de vérification d'authentification
const isAuthenticated = () => {
  // Logique pour vérifier si l'utilisateur est connecté et autorisé
  return Boolean(localStorage.getItem('token'));
};

// Composant pour protéger les routes privées
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/connexion" />;
};

/* Si on a le time : Faire une page 'NotFund' */

// Configuration du routeur
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Accueil />} />
        <Route path="/presentation-club" element={<PresentationClub />} />
        <Route path="/section-masculine-junior" element={<MasculineJunior />} />
        <Route path="/section-masculine-senior" element={<MasculineSenior />} />
        <Route path="/section-feminine-junior" element={<FeminineJunior />} />
        <Route path="/section-feminine-senior" element={<FeminineSenior />} />
        <Route path="/actualites" element={<Actualites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />

        {/* Routes privées (protégées) */}
        <Route path="/admin" element={<PrivateRoute><AdminAccueil /></PrivateRoute>} />
        <Route path="/admin/presentation-club" element={<PrivateRoute><AdminPresentationClub /></PrivateRoute>} />
        <Route path="/admin/actualites" element={<PrivateRoute><AdminActualites /></PrivateRoute>} />
        <Route path="/admin/partenaires" element={<PrivateRoute><AdminPartenaires /></PrivateRoute>} />
        <Route path="/admin/matchs" element={<PrivateRoute><AdminMatchs /></PrivateRoute>} />
        <Route path="/admin/activation-compte" element={<PrivateRoute><AdminActivationCompte /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
