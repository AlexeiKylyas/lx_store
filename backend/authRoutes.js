const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Admin = require('./models/Admin');

// Вход
router.post(
    '/login',
    [
        check('username', 'Please include a valid username').not().isEmpty(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        console.log('555555555555555555555555555555555555555555555555');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            // Поиск пользователя
            let user = await Admin.findOne({ where: { username } });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            // Генерация токена
            const payload = {
                user: {
                    username: user.username
                }
            };

            jwt.sign(
                payload,
                'yourSecretKey', // замените на более надежный секретный ключ
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// Добавление нового пользователя (только для админа)
router.post(
    '/add-user',
    [
        check('username', 'Please include a valid username').not().isEmpty(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            // Проверка на существование пользователя
            let user = await Admin.findOne({ where: { username } });
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            // Хеширование пароля
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user = await Admin.create({
                username,
                password: hashedPassword
            });

            res.status(201).json({ msg: 'User added successfully' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
