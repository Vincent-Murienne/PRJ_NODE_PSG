import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../../assets/css/loginRegister.css';
import LoginForm from '../../components/loginRegister/LoginForm';

interface ILoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const apiURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const onSubmit = async (data: ILoginFormInputs) => {
    setMessage('');

    try {
      const response = await fetch(`${apiURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        const responseData = await response.json();

        if (response.ok) {
          setMessage('Connexion réussie.');
          console.log('Token JWT:', responseData.token);
          // Sauvegarder le token dans le localStorage si nécessaire
          localStorage.setItem('token', responseData.token);
          navigate('/');
        } else {
          setMessage(responseData.message || 'Erreur lors de la connexion.');
        }
      } else {
        setMessage('Erreur inattendue : réponse non JSON.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('Erreur lors de la connexion.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Connexion</h2>
      <LoginForm onSubmit={onSubmit} />
      <p className="message">{message}</p>
    </div>
  );
};

export default Login;
