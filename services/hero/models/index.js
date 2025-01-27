// services/hero/models/index.js
import { Sequelize } from 'sequelize';

// On crée et exporte une instance Sequelize
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});
