import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface ActualiteFormProps {
  id?: string;
  initialValues?: { titre: string; texte_long: string; resume: string; image: string };
  onSubmit: (data: FormData) => void;
}

interface FormDataFields {
  titre: string;
  texte_long: string;
  resume: string;
}

const ActualiteForm: React.FC<ActualiteFormProps> = ({ id, initialValues, onSubmit }) => {
  const { register, handleSubmit, setValue } = useForm<FormDataFields>();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialValues?.image || null);

  useEffect(() => {
    if (id && !initialValues) {
      setLoading(true);
      fetch(`${import.meta.env.VITE_API_URL}/actualites/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setValue('titre', data.titre);
          setValue('texte_long', data.texte_long);
          setValue('resume', data.resume);
          setImagePreview(data.image);
          setLoading(false);
        });
    }
  }, [id, initialValues, setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Aperçu de l'image
    }
  };

  const handleFormSubmit: SubmitHandler<FormDataFields> = (data) => {
    const formData = new FormData();
    formData.append('titre', data.titre);
    formData.append('texte_long', data.texte_long);
    formData.append('resume', data.resume);
    if (image) {
      formData.append('image', image);
    }
    onSubmit(formData);
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
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {imagePreview && <img src={imagePreview} alt="Aperçu" style={{ width: '150px', marginTop: '10px' }} />}
      </div>
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default ActualiteForm;
