const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();
const openai = require('openai');
const port = 2001;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const api = process.env.CHATAI_API;

// const openai = new OpenAIApi(new Configuration({
//     apiKey: api
// }))


// Halaman utama
app.get('/', async function (req, res) {
    res.render('index', { response: null, prompt: null });
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: "Write a haiku about recursion in programming.",
            },
        ],
    });
    
    console.log(completion.choices[0].message);
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
        const apiResponse = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',  // Model yang ingin kamu gunakan
            messages: [{ role: 'user', content: userInput }],
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
