import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface ActualiteFormProps {
  id?: string;
  initialValues?: { titre: string; texte_long: string; resume: string; image: string };
  onSubmit: (data: { titre: string; texte_long: string; resume: string; image: string }) => void;
}

interface FormData {
  titre: string;
  texte_long: string;
  resume: string;
  image: string;
}

const ActualiteForm: React.FC<ActualiteFormProps> = ({
  id,
  initialValues,
  onSubmit,
}) => {
  const { register, handleSubmit, setValue } = useForm<FormData>(); // Utilisation de FormData comme type générique
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && !initialValues) {
      setLoading(true);
      fetch(`${import.meta.env.VITE_API_URL}/actualites/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setValue('titre', data.titre);
          setValue('texte_long', data.texte_long);
          setValue('resume', data.resume);
          setValue('image', data.image);
          setLoading(false);
        });
    }
  }, [id, initialValues, setValue]);

  const handleFormSubmit: SubmitHandler<FormData> = (data) => {
    onSubmit(data);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label>Titre</label>
        <input {...register('titre')} required />
      </div>
      <div>
        <label>Texte Long</label>
        <textarea {...register('texte_long')} required />
      </div>
      <div>
        <label>Résumé</label>
        <textarea {...register('resume')} required />
      </div>
      <div>
        <label>Image</label>
        <input {...register('image')} required />
      </div>
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default ActualiteForm;
