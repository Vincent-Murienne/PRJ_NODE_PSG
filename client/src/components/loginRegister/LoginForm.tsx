import React from 'react';
import { useForm } from 'react-hook-form';

interface ILoginFormInputs {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: ILoginFormInputs) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>();

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="form-group">
      <input
        type="email"
        placeholder="Email"
        className="login-input"
        {...register('email', { required: 'Email requis' })}
      />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Mot de passe"
        className="login-input"
        {...register('password', {
          required: 'Mot de passe requis',
          minLength: { value: 6, message: '6 caractères minimum' },
        })}
      />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <button type="submit" className="login-button">
        Se connecter
      </button>
    </form>
    <br />
    </>
  );

};

export default LoginForm;
