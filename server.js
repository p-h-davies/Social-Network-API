const express = require('express');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.once('open', () => {
    db.collection('users').deleteMany({});
    db.collection('thoughts').deleteMany({});
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
