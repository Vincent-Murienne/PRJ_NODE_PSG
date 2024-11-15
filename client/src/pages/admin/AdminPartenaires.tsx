import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Partenaire = {
  id_partenaire: number;
  logo: string;
  url: string;
};

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

    if (formType === "edit") {
      url += `/${selectedPartenaire?.id_partenaire}`;
      method = "PUT";
    } else if (formType === "delete") {
      url += `/${selectedPartenaire?.id_partenaire}`;
      method = "DELETE";
    }

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
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
          .then((data) => setPartenaires(data));
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
    <div>
      <h1>Gestion des Partenaires</h1>

      <div>
        <h2>Liste des Partenaires</h2>
        <ul>
          {partenaires.map((partenaire) => (
            <li key={partenaire.id_partenaire}>
              <span>ID: {partenaire.id_partenaire}</span>
              <img src={partenaire.logo} alt="Logo" width={50} />
              <button onClick={() => handleEdit(partenaire)}>Modifier</button>
              <button onClick={() => handleDelete(partenaire)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>

      {formType && (
        <div>
          <h2>
            {formType === "add"
              ? "Ajouter un Partenaire"
              : formType === "edit"
              ? "Modifier le Partenaire"
              : "Supprimer le Partenaire"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {formType !== "delete" && (
              <>
                <div>
                  <label>Logo</label>
                  <input
                    type="text"
                    {...register("logo", { required: "Le logo est requis" })}
                  />
                  {errors.logo && <span>{errors.logo.message}</span>}
                </div>

                <div>
                  <label>URL</label>
                  <input
                    type="text"
                    {...register("url", { required: "L'URL est requise" })}
                  />
                  {errors.url && <span>{errors.url.message}</span>}
                </div>
              </>
            )}
            <button type="submit">
              {formType === "add"
                ? "Ajouter"
                : formType === "edit"
                ? "Modifier"
                : "Supprimer"}
            </button>
            <button type="button" onClick={() => setFormType(null)}>
              Annuler
            </button>
          </form>
        </div>
      )}

      <button onClick={() => setFormType("add")}>Ajouter un Partenaire</button>
    </div>
  );
};

export default AdminPartenaires;
