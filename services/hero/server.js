// services/hero/server.js
import express from 'express';
import cors from 'cors';
import { sequelize } from './models/index.js';
import heroRoutes from './routes/heroRoutes.js';

const app = express();
const PORT = 5001;

app.use(express.json());

// 1. Activer cors globalement
app.use(cors({
  origin: '*'  // Autorise cette origine
}));

// 2. Synchroniser la base, puis démarrer
sequelize.sync().then(() => {
  app.use('/', heroRoutes);

  app.listen(PORT, () => {
    console.log(`Service Héros tourne sur http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Erreur synchronisation DB:', err);
});