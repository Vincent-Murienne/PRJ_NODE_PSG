import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; // Importation de useState et useEffect
import '../assets/css/baseLayout.css';

const BaseLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour contrôler l'ouverture du menu
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('token'))); // Suivi de l'authentification
    const navigate = useNavigate(); // Utilisation de useNavigate pour rediriger après la déconnexion

    // Fonction pour basculer l'état du menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Met à jour l'état d'authentification à chaque changement dans localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []); // Le tableau vide garantit que l'effet ne se produit qu'une seule fois

    // Fonction de déconnexion
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false); // Mise à jour de l'état immédiatement
        navigate('/login'); // Redirection vers la page de connexion
    };

    return (
        <>
            <nav>
                <div className="navbar-container">
                    {/* Bouton hamburger */}
                    <button className="hamburger" onClick={toggleMenu}>
                        ☰
                    </button>
                    <ul id="menu" className={isMenuOpen ? "show" : ""}>
                        {/* Liens vers les pages publiques */}
                        <li><NavLink to="/" end>Accueil</NavLink></li>
                        <li><NavLink to="/presentation-club">Présentation du Club</NavLink></li>
                        <li><NavLink to="/sections">Sections</NavLink></li>
                        <li><NavLink to="/actualites">Actualités</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/mentions-legales">Mentions Légales</NavLink></li>

                        {/* Si l'utilisateur est connecté, afficher les liens d'administration */}
                        {isAuthenticated && (
                            <>
                                <li><NavLink to="/admin/">Admin Accueil</NavLink></li>
                                <li><NavLink to="/admin/club">Gestion du Club</NavLink></li>
                                <li><NavLink to="/admin/actualite">Gestion des Actualités</NavLink></li>
                                <li><NavLink to="/admin/partenaire">Gestion des Partenaires</NavLink></li>
                                <li><NavLink to="/admin/match">Gestion des Matchs</NavLink></li>
                                <li><NavLink to="/admin/activation-compte">Activation des Comptes</NavLink></li>
                            </>
                        )}

                        {/* Lien de connexion ou de déconnexion selon l'état d'authentification */}
                        <li>
                            {isAuthenticated ? (
                                <button className="nav-button" onClick={handleLogout}>Déconnexion</button>
                            ) : (
                                <>
                                    <NavLink to="/login" className="nav-button">Connexion</NavLink>
                                    <NavLink to="/register" className="nav-button">Inscription</NavLink>
                                </>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>

            <footer>
                <div className="footer-content">
                    <div className="footer-section about">
                        <h3>À propos du Club</h3>
                        <p>
                            Nous sommes un club passionné par le sport, accueillant des membres de tous âges et de tous niveaux.
                            Rejoignez-nous pour partager votre passion !
                        </p>
                    </div>
                    <div className="footer-section social">
                        <h3>Suivez-nous</h3>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    &copy; 2024 Paris-Saint-Germain | Tous droits réservés
                </div>
            </footer>
        </>
    );
};

export default BaseLayout;
