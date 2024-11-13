import React, { useState } from 'react';
import '../../assets/css/loginRegister/login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const apiURL = import.meta.env.VITE_API_URL; 

  const handleLogin = async () => {
    setMessage(''); 
    if (!email || !password) {
      setMessage('Tous les champs sont requis.');
      return;
    }

    try {
      const response = await fetch(`${apiURL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), 
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Connexion réussie. Vous êtes maintenant connecté.');
        console.log('JWT:', data.token); 
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Erreur lors de la connexion.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('Erreur lors de la connexion.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Connexion</h2>
      <input
        type="email"
        placeholder="Email"
        className="login-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        Se connecter
      </button>
      <p className="message">{message}</p>
      {/* <p className="forgot-password">Mot de passe oublié ?</p> */}
    </div>
  );
};

export default Login;
