// responder.js

const ADMIN_NUMBER = "6285857292852@c.us"; // ganti ke nomor kamu

const handleMessage = async (msg, client = null) => {
  const text = msg.body.toLowerCase();
  const sender = msg.from;

  const reply = (response) => {
    console.log(`📤 [Bot Reply] ${response}`);
  };

  if (text === "bro") return reply("oi");
  if (text === "signal") return reply("On Proses Kak");
  if (text === "!menu") {
    return reply(
      `📋 Menu:\n1. Ketik *signal* untuk info sinyal\n2. Ketik *status* untuk status bot\n3. Ketik *admin* untuk kontak admin`
    );
  }
  if (sender === ADMIN_NUMBER && text === "status") {
    return reply("📡 Bot aktif dan berjalan normal.");
  }
  if (text.includes("halo") || text.includes("hai")) {
    return reply("Halo juga! Ada yang bisa saya bantu?");
  }

  reply("Perintah tidak dikenali. Ketik *!menu* untuk bantuan.");
};

// 🔍 Untuk testing manual
const testResponder = async () => {
  const testMessages = [
    { from: "6285857292852@c.us", body: "bro" },
    { from: "6285857292852@c.us", body: "signal" },
    { from: "6285857292852@c.us", body: "!menu" },
    { from: "6285857292852@c.us", body: "status" },
    { from: "6289999999999@c.us", body: "status" },
    { from: "6285857292852@c.us", body: "halo bang" },
    { from: "6285857292852@c.us", body: "apa ini?" },
  ];

  for (const msg of testMessages) {
    console.log(`\n📩 [Test Message] From: ${msg.from}, Body: "${msg.body}"`);
    await handleMessage(msg);
  }
};

module.exports = { handleMessage, testResponder };
