import { consumeMessage } from '../utils/rabbitmq';
import { findByPk } from '../models/Hero'; // Importer le modèle Hero

const handleAttackEvent = async ({ defenderId, damage }) => {
  const hero = await findByPk(defenderId);
  if (!hero) return;

  // Réduire les PV du héros
  hero.hp = Math.max(hero.hp - damage, 0);
  await hero.save();
  console.log(`Hero ${defenderId} took ${damage} damage. Remaining HP: ${hero.hp}`);
};

const startCombatConsumer = async () => {
  await consumeMessage('combat-events', async (message) => {
    if (message.type === 'ATTACK') {
      await handleAttackEvent(message);
    }
  });
};

export default { startCombatConsumer };
