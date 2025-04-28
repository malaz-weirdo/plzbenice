const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
require('dotenv').config();

console.log(process.env);

app.use(cors());
app.use(express.json());

// POST /chat
app.post('/chat', async (req, res) => {
    const { model, messages } = req.body;

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model, messages }),
        });

        const data = await response.json();
        if (!response.ok) {
            return res.status(500).json({ error: data });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🏠 NEW: GET / route (homepage)
app.get('/', (req, res) => {
  res.send('BeNiceAI Server is running! 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at port ${PORT}`);
});
