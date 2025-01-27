// services/hero/server.js
import express from 'express';
import { sequelize } from './models/index.js';   // Export named "sequelize"
import heroRoutes from './routes/heroRoutes.js';

const app = express();
const PORT = 5001;

// Middleware JSON
app.use(express.json());

// On synchronise d’abord la base
sequelize.sync()
  .then(() => {
    console.log('Base de données synchronisée pour le service Héros');

    // Attach routes
    // => Les endpoints sont accessibles à partir de "/"
    // => Ex: POST /heroes
    app.use('/', heroRoutes);

    // On lance l’écoute
    app.listen(PORT, () => {
      console.log(`Service Héros démarré sur http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Impossible de synchroniser la BDD', err);
  });
