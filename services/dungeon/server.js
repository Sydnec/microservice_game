import express from 'express';
import dungeonRoutes from './dungeonRoutes.js'
const app = express();
const PORT = 5002;
// Middleware JSON
app.use(express.json());
app.use('/', dungeonRoutes);

app.listen(PORT, () => {
  console.log(`Dungeon service running on port ${PORT}`);
});
