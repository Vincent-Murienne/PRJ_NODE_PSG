import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../assets/css/baseLayout.css';

const BaseLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour contrôler l'ouverture du menu
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('token'))); // Suivi de l'authentification
    const [role, setRole] = useState(localStorage.getItem('role')); // Suivi du rôle de l'utilisateur
    const navigate = useNavigate(); // Utilisation de useNavigate pour rediriger après la déconnexion
    const parsedRole = role ? parseInt(role, 10) : null;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Met à jour l'état d'authentification à chaque changement dans localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');
        console.log('Token récupéré:', token); // Log pour vérifier le token
        console.log('Rôle récupéré:', storedRole); // Log pour vérifier le rôle
        setIsAuthenticated(!!token);
        setRole(storedRole); // Met à jour le rôle dans l'état
    }, []);
    

    // Fonction de déconnexion
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role'); // Suppression du rôle du localStorage
        setIsAuthenticated(false); // Mise à jour de l'état immédiatement
        setRole(null); // Réinitialise le rôle
        navigate('/login'); // Redirection vers la page de connexion
    };

    return (
        <>
            <nav>
                <div className="navbar-container">
                    <button className="hamburger" onClick={toggleMenu}>
                        ☰
                    </button>
                    <ul id="menu" className={isMenuOpen ? "show" : ""}>
                        {/* Liens vers les pages publiques */}
                        <li><NavLink to="/" end>Accueil</NavLink></li>
                        <li><NavLink to="/presentation-club">Présentation du Club</NavLink></li>
                        <li><NavLink to="/sectionHome">Sections</NavLink></li>
                        <li><NavLink to="/actualites">Actualités</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/mentions-legales">Mentions Légales</NavLink></li>
                        
                        {/* Lien d'inscription uniquement si l'utilisateur n'est pas connecté */}
                        {!isAuthenticated && (
                            <li><NavLink to="/register">Inscription</NavLink></li>
                        )}

                        {/* Si l'utilisateur est connecté, afficher les liens d'administration */}
                        {isAuthenticated && (
                            <>
                                {parsedRole === 2 && (
                                    <li><NavLink to="/admin">Editeur Accueil</NavLink></li>
                                )}
                                {parsedRole === 1 && (
                                    <li><NavLink to="/admin/">Admin Accueil</NavLink></li>
                                )}
                            </>
                        )}

                        {/* Lien de connexion ou de déconnexion selon l'état d'authentification */}
                        <li>
                            {isAuthenticated ? (
                                <button onClick={handleLogout}>Déconnexion</button>
                            ) : (
                                <NavLink to="/login">Connexion</NavLink>
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
