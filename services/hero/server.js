import express from 'express';
import cors from 'cors';
import { sequelize } from './models/index.js';
import heroRoutes from './routes/heroRoutes.js';
import { connectRabbitMQ, consumeMessage } from './utils/rabbitmq.js';
import Hero from './models/Hero.js'; // Modèle Hero

const app = express();
const PORT = 5001;

app.use(express.json());

// 1. Activer cors globalement
app.use(cors({
  origin: '*'
}));

// 2. Consommer les messages liés aux combats
const startCombatConsumer = async () => {
  await consumeMessage('combat-events', async (message) => {
    if (message.type === 'ATTACK') {
      const hero = await Hero.findByPk(message.defenderId);
      if (hero) {
        hero.hp = Math.max(hero.hp - message.damage, 0);
        await hero.save();
        console.log(`Hero ${message.defenderId} took ${message.damage} damage. Remaining HP: ${hero.hp}`);
      }
    } else if (message.type === 'REWARD') {
      const hero = await Hero.findByPk(message.heroId);
      if (hero) {
        hero.xp += message.xp;
        hero.gold += message.gold;
        await hero.save();
        console.log(`Hero ${message.heroId} received ${message.xp} XP and ${message.gold} gold.`);
      }
    }
  });
};

// 3. Synchroniser la base et démarrer RabbitMQ
sequelize.sync().then(async () => {
  await connectRabbitMQ();
  await startCombatConsumer();

  app.use('/', heroRoutes);

  app.listen(PORT, () => {
    console.log(`Service Héros tourne sur http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Erreur synchronisation DB:', err);
});
