const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const { seedDB } = require('./utils/seed');

//Set up port
const PORT = process.env.PORT || 3001;

//Import Express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//Connect DB to the port & open port
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});


//Run seed function after DB is open
seedDB()