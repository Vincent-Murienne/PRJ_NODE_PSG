import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import '../../assets/css/adminPartenaires.css';

type Partenaire = {
  id_partenaire: number;
  logo: string;
  url: string;
};
const token = localStorage.getItem('token');
const AdminPartenaires: React.FC = () => {
  const [partenaires, setPartenaires] = useState<Partenaire[]>([]);
  const [selectedPartenaire, setSelectedPartenaire] = useState<Partenaire | null>(null);
  const [formType, setFormType] = useState<"add" | "edit" | "delete" | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Partenaire>();

  // Charger la liste des partenaires
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/partenaires`)
      .then((response) => response.json())
      .then((data) => setPartenaires(data))
      .catch((error) => console.error("Erreur lors du chargement des partenaires:", error));
  }, []);

  // Soumettre le formulaire
  const onSubmit: SubmitHandler<Partenaire> = (data) => {
    let url = `${import.meta.env.VITE_API_URL}/partenaires`;
    let method: "POST" | "PUT" | "DELETE" = "POST";
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };
  
    // Ajouter l'en-tête Authorization uniquement pour PUT et DELETE
    if (formType === "edit" || formType === "delete") {
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
  
    if (formType === "edit") {
      url += `/${selectedPartenaire?.id_partenaire}`;
      method = "PUT";
    } else if (formType === "delete") {
      url += `/${selectedPartenaire?.id_partenaire}`;
      method = "DELETE";
    }
  
    fetch(url, {
      method,
      headers,
      body: formType !== "delete" ? JSON.stringify(data) : undefined,
    })
      .then((response) => response.json())
      .then(() => {
        reset();
        setFormType(null);
        setSelectedPartenaire(null);
        // Recharger la liste des partenaires
        fetch(`${import.meta.env.VITE_API_URL}/partenaires`)
          .then((response) => response.json())
          .then((data) => {
            // Mettre à jour localement les partenaires
            setPartenaires((prevPartenaires) => {
              if (formType === "add") {
                return [...prevPartenaires, data];
              } else if (formType === "edit") {
                return prevPartenaires.map((partenaire) =>
                  partenaire.id_partenaire === data.id_partenaire ? data : partenaire
                );
              } else if (formType === "delete") {
                return prevPartenaires.filter((partenaire) => partenaire.id_partenaire !== data.id_partenaire);
              }
              return prevPartenaires;
            });
          });
      })
      .catch((error) => console.error("Erreur lors de la soumission:", error));
  };
  

  // Ouvrir un formulaire avec des valeurs par défaut
  const handleEdit = (partenaire: Partenaire) => {
    setFormType("edit");
    setSelectedPartenaire(partenaire);
    setValue("logo", partenaire.logo);
    setValue("url", partenaire.url);
  };

  const handleDelete = (partenaire: Partenaire) => {
    setFormType("delete");
    setSelectedPartenaire(partenaire);
  };
  
  return (
    <div className="admin-partenaires-container">
      <h1>Gestion des Partenaires</h1>

      <div className="partenaires-list">
        <h2>Liste des Partenaires</h2>
        <ul>
          {partenaires.map((partenaire) => (
            <li key={partenaire.id_partenaire} className="partenaire-item">
              <span className="partenaire-id">ID: {partenaire.id_partenaire}</span>
              <img className="partenaire-logo" src={partenaire.logo} alt="Logo" width={50} />
              <button className="edit-btn" onClick={() => handleEdit(partenaire)}>Modifier</button>
              <button className="delete-btn" onClick={() => handleDelete(partenaire)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>

      {formType && (
        <div className="form-container">
          <h2>
            {formType === "add"
              ? "Ajouter un Partenaire"
              : formType === "edit"
              ? "Modifier le Partenaire"
              : "Supprimer le Partenaire"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="partenaire-form">
            {formType !== "delete" && (
              <>
                <div className="input-group">
                  <label htmlFor="logo">Logo</label>
                  <input
                    type="text"
                    id="logo"
                    {...register("logo", { required: "Le logo est requis" })}
                  />
                  {errors.logo && <span className="error-message">{errors.logo.message}</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="url">URL</label>
                  <input
                    type="text"
                    id="url"
                    {...register("url", { required: "L'URL est requise" })}
                  />
                  {errors.url && <span className="error-message">{errors.url.message}</span>}
                </div>
              </>
            )}
            <button type="submit" className="submit-btn">
              {formType === "add"
                ? "Ajouter"
                : formType === "edit"
                ? "Modifier"
                : "Supprimer"}
            </button>
            <button type="button" className="cancel-btn" onClick={() => setFormType(null)}>
              Annuler
            </button>
          </form>
        </div>
      )}

      <button className="add-partenaire-btn" onClick={() => setFormType("add")}>
        Ajouter un Partenaire
      </button>
      <br/>
    </div>
  );
};

export default AdminPartenaires;
