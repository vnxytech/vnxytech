const Message = require('../models/Message');
const { client } = require('../whatsapp');

const getMessages = async (req, res) => {
    const messages = await Message.find().sort({ timestamp: -1 }).limit(50);
    res.json(messages);
};

const sendBroadcast = async (req, res) => {
    const { numbers, message } = req.body;

    if (!numbers || !message) return res.status(400).json({ error: 'Data tidak lengkap' });

    for (let number of numbers) {
        const waNumber = number.includes('@c.us') ? number : `${number}@c.us`;
        await client.sendMessage(waNumber, message);
    }

    res.json({ status: 'Pesan broadcast terkirim' });
};

module.exports = { getMessages, sendBroadcast };
