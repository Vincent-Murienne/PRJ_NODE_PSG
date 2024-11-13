import React, { useState,CSSProperties } from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const validate = () => {
    let valid = true;
    const errors = {
      name: '',
      email: '',
      message: '',
    };

    if (!name) {
      errors.name = 'Le nom est requis';
      valid = false;
    }

    if (!email) {
      errors.email = 'L\'email est requis';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'L\'email n\'est pas valide';
      valid = false;
    }

    if (!message) {
      errors.message = 'Le message est requis';
      valid = false;
    }

    setErrors(errors);  // Mise à jour de l'état des erreurs
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert('Formulaire soumis');
    }
  };
  

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contactez-nous</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nom :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          {errors.name && <span style={styles.error}>{errors.name}</span>} {/* Affichage de l'erreur */}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          {errors.email && <span style={styles.error}>{errors.email}</span>} {/* Affichage de l'erreur */}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Message :</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.textarea}
          />
          {errors.message && <span style={styles.error}>{errors.message}</span>} {/* Affichage de l'erreur */}
        </div>

        <button type="submit" style={styles.button}>Envoyer</button>
      </form>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
    height: '100px',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
};

export default ContactForm;