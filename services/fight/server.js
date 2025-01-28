import express from 'express';
import { connectRabbitMQ, sendMessage } from './utils/rabbitmq.js';

const app = express();
const PORT = 5003;

app.use(express.json());

// Connexion à RabbitMQ
connectRabbitMQ().then(() => {
  console.log('Connected to RabbitMQ from Fight service');
});

// Endpoint pour une attaque
app.post('/attack', async (req, res) => {
  const { attackerId, defenderId, damage } = req.body;

  try {
    // Publier un message d'attaque
    await sendMessage('combat-events', {
      type: 'ATTACK',
      attackerId,
      defenderId,
      damage,
    });

    res.status(200).json({ message: 'Attack event sent' });
  } catch (error) {
    console.error('Error sending attack event:', error);
    res.status(500).json({ error: 'Failed to send attack event' });
  }
});

// Endpoint pour une récompense
app.post('/reward', async (req, res) => {
  const { heroId, xp, gold } = req.body;

  try {
    // Publier un message de récompense
    await sendMessage('combat-events', {
      type: 'REWARD',
      heroId,
      xp,
      gold,
    });

    res.status(200).json({ message: 'Reward event sent' });
  } catch (error) {
    console.error('Error sending reward event:', error);
    res.status(500).json({ error: 'Failed to send reward event' });
  }
});

app.listen(PORT, () => {
  console.log(`Fight service running on port ${PORT}`);
});
