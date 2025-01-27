const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Back-end running!');
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
