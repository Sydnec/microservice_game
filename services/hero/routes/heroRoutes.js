// services/hero/routes/heroRoutes.js
import { Router } from 'express';
const router = Router();

// On importe les fonctions "create" et "findByPk" du fichier Hero.js
import { create, findByPk, findAll } from '../models/Hero.js';

// ========================
// 1. POST /heroes (Créer un nouveau héros)
// ========================
router.post('/heroes', async (req, res) => {
  try {
    const { name } = req.body;
    const newHero = await create({ name });
    res.status(201).json(newHero);
  } catch (error) {
    console.error('Erreur création héros :', error);
    res.status(500).json({ error: 'Impossible de créer le héros' });
  }
});

// ========================
// 2. GET /heroes/:id (Récupérer un héros)
// ========================
router.get('/heroes/:id', async (req, res) => {
  try {
    const heroId = parseInt(req.params.id, 10);
    const hero = await findByPk(heroId);

    if (!hero) {
      return res.status(404).json({ error: 'Héros introuvable' });
    }
    res.json(hero);
  } catch (error) {
    console.error('Erreur récupération héros :', error);
    res.status(500).json({ error: 'Impossible de récupérer le héros' });
  }
});

// ========================
// 3. PUT /heroes/:id/xp (Augmenter l’XP)
// ========================
router.put('/heroes/:id/xp', async (req, res) => {
  try {
    const heroId = parseInt(req.params.id, 10);
    const { xp } = req.body; // ex: { xp: 50 }
    const hero = await findByPk(heroId);

    if (!hero) {
      return res.status(404).json({ error: 'Héros introuvable' });
    }

    hero.xp += xp;
    await hero.save();
    res.json(hero);
  } catch (error) {
    console.error('Erreur ajout XP :', error);
    res.status(500).json({ error: 'Impossible d’ajouter l’XP au héros' });
  }
});

// ========================
// 4. PUT /heroes/:id/addgold (Ajouter de l’or)
// ========================
router.put('/heroes/:id/addgold', async (req, res) => {
  try {
    const heroId = parseInt(req.params.id, 10);
    const { gold } = req.body;
    const hero = await findByPk(heroId);

    if (!hero) {
      return res.status(404).json({ error: 'Héros introuvable' });
    }

    hero.gold += gold;
    await hero.save();
    res.json(hero);
  } catch (error) {
    console.error('Erreur ajout or :', error);
    res.status(500).json({ error: 'Impossible d’ajouter de l’or au héros' });
  }
});

// ========================
// 5. PUT /heroes/:id/spendgold (Dépenser l’or pour améliorer les stats)
// ========================
router.put('/heroes/:id/spendgold', async (req, res) => {
  try {
    const heroId = parseInt(req.params.id, 10);
    const { gold = 0, attack = 0, defense = 0, hp = 0 } = req.body;
    const hero = await findByPk(heroId);

    if (!hero) {
      return res.status(404).json({ error: 'Héros introuvable' });
    }

    if (hero.gold < gold) {
      return res.status(400).json({ error: 'Pas assez d’or pour ces améliorations' });
    }

    hero.gold -= gold;
    hero.attack += attack;
    hero.defense += defense;
    hero.hp += hp;

    await hero.save();
    res.json(hero);
  } catch (error) {
    console.error('Erreur dépense or :', error);
    res.status(500).json({ error: 'Impossible de dépenser de l’or pour améliorer les stats' });
  }
});

// ========================
// 6. GET /heroes (Récupérer tous les héros)
// ========================
router.get('/heroes', async (req, res) => {
  try {
    const heroes = await findAll(); 

    res.json(heroes);
  } catch (error) {
    console.error('Erreur récupération de tous les héros :', error);
    res.status(500).json({ error: 'Impossible de récupérer la liste des héros' });
  }
});

// ========================
// 7. DELETE /heroes/:id (Supprimer un héros)
// ========================
router.delete('/heroes/:id', async (req, res) => {
  try {
    const heroId = parseInt(req.params.id, 10);
    const hero = await findByPk(heroId);

    if (!hero) {
      return res.status(404).json({ error: 'Héros introuvable' });
    }

    await hero.destroy(); // Supprime le héros de la base
    res.json({ message: 'Héros supprimé avec succès' });
  } catch (error) {
    console.error('Erreur suppression héros :', error);
    res.status(500).json({ error: 'Impossible de supprimer le héros' });
  }
});

export default router;
