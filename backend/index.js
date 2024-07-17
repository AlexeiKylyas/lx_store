const express = require('express');
const app = express();
const port = 3000;

const adminRoutes = require('./adminRoutes');
const authRoutes = require('./authRoutes');

app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${port}`);
});
