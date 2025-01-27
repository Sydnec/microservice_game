// services/hero/models/Hero.js
import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

// On définit le modèle Hero
const HeroModel = sequelize.define(
  'Hero',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    level: { type: DataTypes.INTEGER, defaultValue: 1 },
    xp: { type: DataTypes.INTEGER, defaultValue: 0 },
    hp: { type: DataTypes.INTEGER, defaultValue: 100 },
    hp_max: { type: DataTypes.INTEGER, defaultValue: 100 },
    attack: { type: DataTypes.INTEGER, defaultValue: 0 },
    defense: { type: DataTypes.INTEGER, defaultValue: 0 },
    speed: { type: DataTypes.INTEGER, defaultValue: 0 },
    gold: { type: DataTypes.INTEGER, defaultValue: 20 },
    inventory: { type: DataTypes.JSON, defaultValue: {} },
  },
  {
    tableName: 'Heroes',
    timestamps: true,
  }
);

// Fonctions utilitaires pour être compatibles avec "import { create, findByPk, findAll } ..."

// Créer un héros
export function create(data) {
  return HeroModel.create(data);
}

// Récupérer un héros par son ID
export function findByPk(id) {
  return HeroModel.findByPk(id);
}

// Récupérer tous les héros
export function findAll() {
  return HeroModel.findAll();
}

// Export par défaut du modèle complet
export default HeroModel;
