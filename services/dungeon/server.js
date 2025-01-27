import express from 'express';
const app = express();
const PORT = 5002;

app.get('/', (req, res) => {
  res.send('Hello from Dungeon service!');
});

app.listen(PORT, () => {
  console.log(`Dungeon service running on port ${PORT}`);
});
