import React from 'react';
import { useForm } from 'react-hook-form';

interface IFormInputs {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginRegisterProps {
  onSubmit: (data: IFormInputs) => void;
}

const LoginRegister: React.FC<LoginRegisterProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-group">
      <input
        type="text"
        placeholder="Nom complet"
        className="login-input"
        {...register('fullName', { required: 'Nom complet requis' })}
      />
      {errors.fullName && <p>{errors.fullName.message}</p>}

      <input
        type="email"
        placeholder="Email"
        className="login-input"
        {...register('email', { required: 'Email requis' })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Mot de passe"
        className="login-input"
        {...register('password', {
          required: 'Mot de passe requis',
          minLength: { value: 6, message: '6 caractères minimum' },
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <input
        type="password"
        placeholder="Confirmer le mot de passe"
        className="login-input"
        {...register('confirmPassword', {
          validate: (value) => value === watch('password') || 'Les mots de passe doivent correspondre',
        })}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <button type="submit" className="login-button">
        S'inscrire
      </button>
    </form>
  );
};

export default LoginRegister;
