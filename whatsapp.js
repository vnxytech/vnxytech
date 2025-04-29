const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const Message = require("./models/Message");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true },
});

// Ganti ini dengan nomor kamu (format: nomor@c.us)
const ADMIN_NUMBER = "6285857292852@c.us"; // contoh format untuk Indonesia

const initWhatsApp = () => {
  client.on("qr", (qr) => {
    console.log("🔄 Scan QR Code:");
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", async () => {
    console.log("✅ Bot is ready!");

    // Kirim pesan otomatis ke admin saat bot aktif
    try {
      await client.sendMessage(
        ADMIN_NUMBER,
        "Halo! Bot sudah aktif dan siap digunakan."
      );
      console.log("📤 Pesan otomatis berhasil dikirim ke admin.");
    } catch (err) {
      console.error("❌ Gagal mengirim pesan otomatis:", err);
    }
  });

  //  pesan isi query

  client.on("message", async (msg) => {
    console.log(`📩 Message from ${msg.from}: ${msg.body}`);

    if (msg.body.toLowerCase() === "bro") {
      msg.reply("oi");
    }

    if (msg.body.toLowerCase() === "signal") {
      msg.reply("On Proses Kak");
    }
    if (msg.body.toLowerCase() === "infovnxy") {
      msg.reply(`📋 Menu:
      1. Ketik *signal* untuk info sinyal
      2. Ketik *status* untuk status bot
      3. Ketik *admin* untuk kontak admin`);
    }

    // last pesan insi query

    // Simpan pesan ke database
    try {
      await Message.create({
        from: msg.from,
        body: msg.body,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("❌ Gagal menyimpan pesan ke database:", error);
    }
  });

  client.initialize();
};

// 🔍 Tambahkan fungsi testing
const testResponder = async () => {
  const testMessages = [
    { from: "6285857292852@c.us", body: "bro" },
    { from: "6285857292852@c.us", body: "signal" },
    { from: "6285857292852@c.us", body: "!menu" },
    { from: "6285857292852@c.us", body: "status" },
    { from: "6285857292852@c.us", body: "status" }, // bukan admin
    { from: "6285857292852@c.us", body: "halo bosku" },
    { from: "6285857292852@c.us", body: "tidak dikenal" },
  ];

  for (const msg of testMessages) {
    console.log(`\n📩 [Test Message] From: ${msg.from}, Body: "${msg.body}"`);
    await handleMessage(msg);
  }
};

module.exports = { initWhatsApp, client };
