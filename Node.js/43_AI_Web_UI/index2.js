const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const port = 2001;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const api = process.env.CHATAI_API;


// Halaman utama
app.get('/', (req, res) => {
    res.render('index', { response: null, prompt: null });
});

app.get('/models', async (req, res) => {
    try {
        const apiResponse = await axios.get('https://api.openai.com/v1/models', {
            headers: {
                'Authorization': `Bearer ${api}`,
                'Content-Type': 'application/json',
            }
        });

        res.json(apiResponse.data);
    } catch (error) {
        console.error("Error fetching models:", error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching models');
    }
});


// Route untuk meng-handle input dan mengirim ke API ChatGPT
app.post('/ask', async (req, res) => {
    const userInput = req.body.prompt;

    try {

        const apiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userInput }],
        }, {
            headers: {
                'Authorization': `Bearer ${api}`, // Ganti dengan API Key-mu
                'Content-Type': 'application/json',
            }
        });

        const responseContent = apiResponse.data.choices[0].message.content;
        res.render('index', { response: responseContent, prompt: userInput });
    } catch (error) {
        console.error("Error connecting to ChatGPT API:", error);
        res.render('index', { response: 'Error connecting to API', prompt: userInput });
    }
});

// Mulai server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
