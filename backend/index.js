const express = require('express');
const app = express();
const port = 3000;

const adminRoutes = require('./adminRoutes');

app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${port}`);
});
