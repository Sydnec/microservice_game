import express from 'express';
const app = express();
const PORT = 5001;

app.get('/', (req, res) => {
  res.send('Hello from Héros service!');
});

app.listen(PORT, () => {
  console.log(`Héros service running on port ${PORT}`);
});
