import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { clubRoutes } from './routes/club';
import { newsRoutes } from './routes/news';
import { partnerRoutes } from './routes/partner';
import { matchRoutes } from './routes/match';
import { userRoutes } from './routes/user';

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
app.use('/api/club', clubRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/users', userRoutes);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});

export default app;
