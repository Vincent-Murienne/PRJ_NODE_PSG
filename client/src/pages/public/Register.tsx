import React, { useState } from 'react';
import '../../assets/css/loginRegister/login.css';

const Register: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const apiURL = import.meta.env.VITE_API_URL;

  const handleRegister = async () => {
    setMessage('');

    if (!fullName || !email || !password || !confirmPassword) {
      setMessage('Tous les champs sont requis.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await fetch(`${apiURL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        setMessage('Inscription réussie. Vous pouvez maintenant vous connecter.');
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Erreur lors de l\'inscription.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('Erreur lors de l\'inscription.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Créer un compte</h2>
      <input
        type="text"
        placeholder="Nom complet"
        className="login-input"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
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
      <input
        type="password"
        placeholder="Confirmer le mot de passe"
        className="login-input"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleRegister}>
        S'inscrire
      </button>    
      <p className="message">{message}</p>
      <br />
    </div>
  );
};

export default Register;
