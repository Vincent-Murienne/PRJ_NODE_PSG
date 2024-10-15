import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import clubRoutes from './routes/clubRoutes';
import partenaireRoutes from './routes/partenaireRoutes';
import actualiteRoutes from './routes/actualiteRoutes';
import adversaireRoutes from './routes/adversaireRoutes';
import duelRoutes from './routes/duelRoutes';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Définir une route de base
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Routes
app.use('/api/', clubRoutes);
app.use('/api/', partenaireRoutes);
app.use('/api/', actualiteRoutes);
app.use('/api/', adversaireRoutes);
app.use('/api/', duelRoutes);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});

export default app;
