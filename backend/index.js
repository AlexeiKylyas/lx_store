// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');

// Инициализация Express приложения
const app = express();
const port = 3000;

// Middleware для обработки данных JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Подключение маршрутов
const adminRoutes = require('./adminRoutes');
const authRoutes = require('./authRoutes');

app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Запуск сервера и подключение к базе данных
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
