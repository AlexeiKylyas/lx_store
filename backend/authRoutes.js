const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const sequelize = require('./db');
const initModels = require('./models/init-models');
const models = initModels(sequelize);
const Admin = models.admin

// Вход
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').not().isEmpty(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        console.log('req.body =>',req.body);
        const errors = validationResult(req);
        console.log('errors =>',errors)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            // Поиск пользователя
            let user = await Admin.findOne({ where: { email } });

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            console.log('bcrypt pass =>', hashedPassword)
            if (!user) {
                console.log('4444444444444444444444444444444444444')
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                console.log('12311111112312312312321')
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            // Генерация токена
            const payload = {
                user: {
                    email: user.email
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
        check('email', 'Please include a valid email').not().isEmpty(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Проверка на существование пользователя
            let user = await Admin.findOne({ where: { email } });
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            // Хеширование пароля
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user = await Admin.create({
                email,
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
