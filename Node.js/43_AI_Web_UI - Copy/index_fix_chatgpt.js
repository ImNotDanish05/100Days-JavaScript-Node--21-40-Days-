const express = require('express');
const app = express();
const { exec } = require('child_process');

// New
// import OpenAI from 'openai';
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.CHATAI_API // This is also the default, can be omitted
});


app.get('/askai', async function(req,res){
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": "Halo, namaku Danish"}],
      });
      console.log(chatCompletion.choices[0].message);
})


app.listen(2001, function(req,res){
    console.log("Web Nyala");
})

/*

THE CHATGPT AI IS ACTUALLY PREMIUM NOW
D:\Documents\Github\100Days\100Days-JavaScript-Node--21-40-Days-\Node.js\43_AI_Web_UI\node_modules\openai\error.js:63
            return new RateLimitError(status, error, message, headers);
                   ^

RateLimitError: 429 You exceeded your current quota, please check your plan and billing details. For more information on this error, read the docs: https://platform.openai.com/docs/guides/error-codes/api-errors.
    at APIError.generate (D:\Documents\Github\100Days\100Days-JavaScript-Node--21-40-Days-\Node.js\43_AI_Web_UI\node_modules\openai\error.js:63:20)
    at OpenAI.makeStatusError (D:\Documents\Github\100Days\100Days-JavaScript-Node--21-40-Days-\Node.js\43_AI_Web_UI\node_modules\openai\core.js:293:33)
    at OpenAI.makeRequest (D:\Documents\Github\100Days\100Days-JavaScript-Node--21-40-Days-\Node.js\43_AI_Web_UI\node_modules\openai\core.js:337:30)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async D:\Documents\Github\100Days\100Days-JavaScript-Node--21-40-Days-\Node.js\43_AI_Web_UI\index.js:15:28 {
  status: 429,
  headers: {
    'alt-svc': 'h3=":443"; ma=86400',
    'cf-cache-status': 'DYNAMIC',
    'cf-ray': '8d57fda209216d18-CGK',
    connection: 'keep-alive',
    'content-length': '337',
    'content-type': 'application/json; charset=utf-8',
    date: 'Sun, 20 Oct 2024 09:30:43 GMT',
    server: 'cloudflare',
    'set-cookie': '__cf_bm=6jVpgpXh0gPN.MYNuIK_VhNKAU8rqeaNGSQjJAFCxqo-1729416643-1.0.1.1-s2MlPxi0M75z8fZ.ir0efzQUaMMBnTzHxCA_t0PlFO4iwuO0HYQW35HlKKBrZ2_xfobWmG1q_VqPC476OYiupg; path=/; expires=Sun, 20-Oct-24 10:00:43 GMT; domain=.api.openai.com; HttpOnly; Secure; SameSite=None, _cfuvid=SnSBT8i593bYTcLD01I0HkLKGDWzWCrzvYoQSX31vK0-1729416643151-0.0.1.1-604800000; path=/; domain=.api.openai.com; HttpOnly; Secure; SameSite=None',
    'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
    vary: 'Origin',
    'x-content-type-options': 'nosniff',
    'x-request-id': 'req_3f6081a1eb8556148605385375dbc42a'
  },
  request_id: 'req_3f6081a1eb8556148605385375dbc42a',
  error: {
    message: 'You exceeded your current quota, please check your plan and billing details. For more information on this error, read the docs: https://platform.openai.com/docs/guides/error-codes/api-errors.',
    type: 'insufficient_quota',
    param: null,
    code: 'insufficient_quota'
  },
  code: 'insufficient_quota',
  param: null,
  type: 'insufficient_quota'
}

*/