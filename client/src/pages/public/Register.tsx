import React, { useState } from 'react';
import '../../assets/css/loginRegister/login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [fullName, setFullName] = useState<string>('')
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    if (!email || !password) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    alert(`Connecté avec l'email : ${email}`);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Inscription</h2>
      <input
        type="fullName"
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
      <button className="login-button" onClick={handleLogin}>
        S'inscrire
      </button>
    </div>
  );
};

export default Login;
