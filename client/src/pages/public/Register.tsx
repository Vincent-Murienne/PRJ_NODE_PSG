import React, { useState } from 'react';
import '../../assets/css/loginRegister.css';
import LoginRegister from '../../components/loginRegister/RegisterForm';

interface IFormInputs {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false); 
  const apiURL = import.meta.env.VITE_API_URL;

  const onSubmit = async (data: IFormInputs) => {
    setMessage('');
    
    try {
      const response = await fetch(`${apiURL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: data.fullName,
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        setMessage('Inscription réussie. Vous pouvez maintenant vous connecter.');
        setShowModal(true); 
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Erreur lors de l\'inscription.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('Erreur lors de l\'inscription.');
    }
  };

  const closeModal = () => {
    setShowModal(false);  
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Créer un compte</h2>
      <LoginRegister onSubmit={onSubmit} />
      <p className="message">{message}</p>

      {/* Modale de confirmation */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Inscription réussie</h3>
            <p>Votre compte a été créé. Pour vous-y connecter, un administrateur l'activera bientôt. Veuillez patienter.</p>
            <button onClick={closeModal} className="modal-close-button">Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
