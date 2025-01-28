import { Router } from 'express';
import { sendMessage } from '../utils/rabbitmq';
const router = Router();

router.post('/attack', async (req, res) => {
  const { attackerId, defenderId, damage } = req.body;

  try {
    // Publier un événement d'attaque
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

export default router;
