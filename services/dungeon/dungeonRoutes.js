import { Router } from 'express';
const router = Router();

const MAX_LEVEL = 15;
const MIN_LEVEL = 5;
const CHANCE_MONSTER_ENCOUNTER = 5;
let donjon = {
    nombre_niveaux: 0,
    progression: 0,
    boss_final: {},
    monstre: {}
}

// ========================
// 1. POST /start (Créer un nouveau donjon)
// ========================
router.post('/start', async (req, res) => {
  try {
    const hero = await req.body;
    donjon.nombre_niveaux = Math.floor(Math.random() * (MAX_LEVEL - MIN_LEVEL + 1)) + MIN_LEVEL;
    const hp_max = 100 + Math.floor(hero.hp_max / 2) + hero.level;
    let temp_attack = hero.attack + (Math.floor(Math.random() * (7 + 10 + 1)) - 10);
    const defense = hero.defense;
    let temp_speed = hero.speed + (Math.floor(Math.random() * (7 + 10 + 1)) - 10)
    donjon.boss_final = {
        hp_max: hp_max,
        hp: hp_max,
        attack: temp_attack <= 0 ? 0 : temp_attack,
        defense: defense,
        speed: temp_speed <= 0 ? 0 : temp_speed,
        xp_drop: (Math.floor(Math.random() * (75 - 25 + 1)) + 25) * (5/hero.level)
    }
    temp_attack = hero.attack - (8 * (Math.floor(Math.random() * 4) + 1));
    let temp_defense = defense - (8 * (Math.floor(Math.random() * 4) + 1));
    temp_speed = hero.speed - (8 * (Math.floor(Math.random() * 4) + 1));
    donjon.monstre = {
        hp_max: hero.hp_max-20,
        hp: hero.hp_max-20,
        attack: temp_attack <= 0 ? 0 : temp_attack,
        defense: temp_defense <= 0 ? 0 : temp_defense,
        speed: temp_speed <= 0 ? 0 : temp_speed,
        xp_drop: 10 + (10 * (5/hero.level))
    }
    res.status(201).json({
        nombre_niveaux: donjon.nombre_niveaux,
        progression: donjon.progression,
        boss_final: donjon.boss_final,
    });
  } catch (error) {
    console.error('Erreur création donjon :', error);
    res.status(500).json({ error: 'Impossible de créer le donjon' });
  }
});

router.put('/move', async (req, res) => {
    try {
        const flag_encounter = Math.floor(Math.random() * CHANCE_MONSTER_ENCOUNTER);
        const random_number = Math.floor(Math.random() * CHANCE_MONSTER_ENCOUNTER);
        if(donjon.progression == donjon.nombre_niveaux) {
            res.status(201).json({
                message: "Combat avec le boss",
                boss: donjon.boss
            });
            return;
        }
        donjon.progression++;
        if(random_number != flag_encounter) {
            res.status(201).json({
                message: "Case vide",
                position: donjon.niveau_actuel
            });
        } else {
            res.status(201).json({
                message: "Combat avec un monstre",
                position: donjon.monstre
            });
        }
    } catch (error) {
        console.error('Erreur déplacement :', error);
        res.status(500).json({ error: 'Impossible de se déplacer' });
    }
})

router.get('/status', async (req, res) => {
    try {
        res.status(200).json({
            nombre_niveaux: donjon.nombre_niveaux,
            progression: donjon.progression,
            boss_final: donjon.boss_final,
        });
    } catch(error) {
        console.error('Erreur récupération des données du donjon :', error);
        res.status(500).json({ error: 'Impossible de récupérer les données du donjon' });
    }
})

export default router;
