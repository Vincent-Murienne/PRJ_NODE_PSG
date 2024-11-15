import React, { useState } from 'react';
import '../../assets/css/contact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // Gestion de l'état de la modale

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Form Submitted:', formData);

    // Afficher la modale
    setIsModalOpen(true);

    // Fermer la modale après 3 secondes
    setTimeout(() => {
      setIsModalOpen(false);
    }, 3000);

    // Réinitialiser le formulaire
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contactez-nous</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="contact-input"
          placeholder="Nom"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="contact-input"
          placeholder="Email"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="contact-textarea"
          placeholder="Votre message"
          required
        />
        <button type="submit" className="contact-button">
          Envoyer
        </button>
      </form>
      <div className="contact-footer">
        <p>
          Vous pouvez aussi nous contacter via{' '}
          <a href="mailto:support@contact.com">psg_support@contact.com</a>
        </p>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Votre message a bien été envoyé !</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;