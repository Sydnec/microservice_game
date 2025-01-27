import express from 'express';
const app = express();
const PORT = 5003;

app.get('/', (req, res) => {
  res.send('Hello from Fight service!');
});

app.listen(PORT, () => {
  console.log(`Fight service running on port ${PORT}`);
});
