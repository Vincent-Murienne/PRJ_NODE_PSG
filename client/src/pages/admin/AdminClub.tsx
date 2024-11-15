import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form";

type ClubData = {
  presentation: string;
  histoire: string;
};

const AdminPage: React.FC = () => {
  const [clubData, setClubData] = useState<ClubData | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ClubData>();

  // Charger les données initiales
  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clubs`);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des données");
        }
        const data: ClubData = await response.json();
        setClubData(data);
        reset(data); // Remplir le formulaire avec les données existantes
      } catch (error) {
        console.error(error);
      }
    };

    fetchClubData();
  }, [reset]);

  // Soumettre les nouvelles données
  const onSubmit = async (data: ClubData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/clubs/1`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour des données");
      }
      const updatedData: ClubData = await response.json();
      setClubData(updatedData);
      alert("Mise à jour réussie !");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>Administration du Club</h1>
      
      {/* Affichage des données */}
      {clubData ? (
        <div>
          <h2>Présentation actuelle :</h2>
          <p>{clubData.presentation}</p>
          <h2>Histoire actuelle :</h2>
          <p>{clubData.histoire}</p>
        </div>
      ) : (
        <p>Chargement des données...</p>
      )}

      {/* Formulaire */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "20px" }}>
        <div>
          <label htmlFor="presentation">Présentation</label>
          <textarea
            id="presentation"
            {...register("presentation", { required: "La présentation est obligatoire" })}
            style={{ width: "100%", height: "100px", margin: "10px 0" }}
          />
          {errors.presentation && <p style={{ color: "red" }}>{errors.presentation.message}</p>}
        </div>

        <div>
          <label htmlFor="histoire">Histoire</label>
          <textarea
            id="histoire"
            {...register("histoire", { required: "L'histoire est obligatoire" })}
            style={{ width: "100%", height: "100px", margin: "10px 0" }}
          />
          {errors.histoire && <p style={{ color: "red" }}>{errors.histoire.message}</p>}
        </div>

        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}>
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
