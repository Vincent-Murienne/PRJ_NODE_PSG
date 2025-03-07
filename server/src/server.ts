import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import clubRoutes from './routes/clubRoutes';
import partenaireRoutes from './routes/partenaireRoutes';
import actualiteRoutes from './routes/actualiteRoutes';
import adversaireRoutes from './routes/adversaireRoutes';
import duelRoutes from './routes/duelRoutes';
import userRoutes from './routes/userRoute';
import authRoutes from './routes/authRoutes';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors({
    origin: '*',
}));

app.use(helmet());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../public')));

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
app.use('/api/', userRoutes);
app.use('/api/', authRoutes);
app.use('/api/uploads', express.static(path.join(__dirname, '../public/img')));

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});

export default app;
