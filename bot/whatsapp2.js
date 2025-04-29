// bot/whatsapp.js
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

let client;
let botStatus = { isReady: false };

const startBot = (io) => {
  if (client) return; // Prevent re-init

  client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true },
  });

  client.on("qr", (qr) => {
    console.log("🔄 Scan QR Code:");
    qrcode.generate(qr, { small: true });
    io.emit("log", "🔄 QR Code muncul. Scan di WhatsApp.");
  });

  client.on("ready", () => {
    console.log("✅ Bot Ready");
    botStatus.isReady = true;
    io.emit("log", "✅ Bot WhatsApp Siap!");
  });

  client.on("message", async (msg) => {
    const logMsg = `📩 [${msg.from}]: ${msg.body}`;
    console.log(logMsg);
    io.emit("log", logMsg);

    if (msg.body.toLowerCase() === "bro") {
      msg.reply("oi");
    }
  });

  client.initialize();
};

const getStatus = () => botStatus;

module.exports = { startBot, getStatus };
