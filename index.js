const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/send-data', async (req, res) => {
    try {
        const flaskResponse = await axios.post('http://127.0.0.1:5000/process', req.body);
        res.json({
            status: 'success',
            flaskResponse: flaskResponse.data
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.listen(3000, () => {
    console.log('Node.js server is running on port 3000');
});