require('dotenv').config(); 
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const port = 3001;

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.ALLOWED_CHAT_ID; 

app.use(express.json());
app.use(cors());

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 10, 
    message: { error: "Too many requests, please try again later." }
});

app.use('/api/send-notification', limiter);

const sendTelegramMessage = async (message) => {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    try {
        await axios.post(url, {
            chat_id: chatId,
            text: message,
        });
    } catch (error) {
        console.error(`Ошибка отправки в Telegram:`, error);
    }
};

app.post('/api/send-notification', async (req, res) => {
    const { name, phone, email, message } = req.body;
    const application = `
Новая заявка с сайта Devibe:

Имя: ${name}
Email: ${email}
Телефон: ${phone}
Комментарий: ${message}
    `;

    try {
        await sendTelegramMessage(application);
        res.status(200).json({ status: 'success' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed trying to send the request' });
    }
});

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
});
