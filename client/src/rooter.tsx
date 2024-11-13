import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Accueil from './pages/public/Accueil';
import PresentationClub from './pages/public/PresentationClub';
import MasculineJunior from './pages/public/MasculineJunior';
import MasculineSenior from './pages/public/MasculineSenior';
import FeminineJunior from './pages/public/FeminineJunior';
import FeminineSenior from './pages/public/FeminineSenior';
import Actualites from './pages/public/Actualites';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Contact from './pages/public/Contact';
import MentionsLegales from './pages/public/MentionsLegales';

// Pages privées (Espace d'administration)
import AdminAccueil from './pages/admin/AdminAccueil';
import AdminPresentationClub from './pages/admin/AdminClub';
import AdminActualites from './pages/admin/AdminActualites';
import AdminPartenaires from './pages/admin/AdminPartenaires';
import AdminMatchs from './pages/admin/AdminMatchs';
import AdminActivationCompte from './pages/admin/AdminActivationCompte';
import BaseLayout from './layout/BaseLayout';

// Fonction de vérification d'authentification
const isAuthenticated = () => {
  // Logique pour vérifier si l'utilisateur est connecté et autorisé
  return Boolean(localStorage.getItem('token'));
};

// Composant pour protéger les routes privées
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  //return isAuthenticated() ? children : <Navigate to="/connexion" />;
  return <> { children }</>
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
        <Route path="/admin/" element={<PrivateRoute><BaseLayout /></PrivateRoute>}>
          <Route path="" element={<AdminAccueil />}/>
          <Route path="club" element={<AdminPresentationClub />}/>
          <Route path="actualite" element={<AdminActualites />}/>
          <Route path="partenaire" element={<AdminPartenaires />}/>
          <Route path="match" element={<AdminMatchs />}/>
          <Route path="activation-compte" element={<AdminActivationCompte />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
