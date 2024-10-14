import express from 'express';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Définir une route de base
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
