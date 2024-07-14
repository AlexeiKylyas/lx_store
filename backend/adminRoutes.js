const express = require('express')
const router = express.Router()

// Пример маршрута для получения списка товаров
router.get('/products', (req, res) => {
    // Здесь можно выполнить запрос к базе данных для получения списка товаров
    res.json([{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }])
})

module.exports = router
