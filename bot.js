const {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const sessions = new Map();

/**
 * CREATE WHATSAPP SESSION
 */
async function createSession(id) {
  const { state, saveCreds } = await useMultiFileAuthState(`./sessions/${id}`);

  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    auth: state,
    version,
    printQRInTerminal: false
  });

  sessions.set(id, { sock });

  // save session
  sock.ev.on("creds.update", saveCreds);

  // connection handler
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

      if (shouldReconnect) {
        createSession(id);
      }
    }
  });

  // MESSAGE HANDLER (COMMANDS)
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const from = msg.key.remoteJid;

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    const cmd = text.toLowerCase().split(" ")[0];

    // MENU
    if (cmd === ".menu") {
      await sock.sendMessage(from, {
        text: `🤖 *BOT MENU*

📌 .menu - Show menu
⚡ .ping - Speed test
🟢 .alive - Check bot status`
      });
    }

    // PING
    if (cmd === ".ping") {
      const start = Date.now();

      await sock.sendMessage(from, { text: "Pinging..." });

      const end = Date.now();

      await sock.sendMessage(from, {
        text: `🏓 Pong!\nSpeed: ${end - start}ms`
      });
    }

    // ALIVE
    if (cmd === ".alive") {
      await sock.sendMessage(from, {
        text: "🟢 Bot is alive and running!"
      });
    }
  });

  return sock;
}

/**
 * GET PAIRING CODE
 */
async function getPairingCode(id, number) {
  const session = sessions.get(id);

  if (!session) {
    throw new Error("Session not found");
  }

  const code = await session.sock.requestPairingCode(number);

  return code;
}

/**
 * SESSION STATUS
 */
function getStatus(id) {
  const session = sessions.get(id);

  if (!session) return "offline";

  return "online";
}

module.exports = {
  createSession,
  getPairingCode,
  getStatus,
  sessions
};const {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const sessions = new Map();

/**
 * CREATE WHATSAPP SESSION
 */
async function createSession(id) {
  const { state, saveCreds } = await useMultiFileAuthState(`./sessions/${id}`);

  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    auth: state,
    version,
    printQRInTerminal: false
  });

  sessions.set(id, { sock });

  // save session
  sock.ev.on("creds.update", saveCreds);

  // connection handler
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

      if (shouldReconnect) {
        createSession(id);
      }
    }
  });

  // MESSAGE HANDLER (COMMANDS)
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const from = msg.key.remoteJid;

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    const cmd = text.toLowerCase().split(" ")[0];

    // MENU
    if (cmd === ".menu") {
      await sock.sendMessage(from, {
        text: `🤖 *BOT MENU*

📌 .menu - Show menu
⚡ .ping - Speed test
🟢 .alive - Check bot status`
      });
    }

    // PING
    if (cmd === ".ping") {
      const start = Date.now();

      await sock.sendMessage(from, { text: "Pinging..." });

      const end = Date.now();

      await sock.sendMessage(from, {
        text: `🏓 Pong!\nSpeed: ${end - start}ms`
      });
    }

    // ALIVE
    if (cmd === ".alive") {
      await sock.sendMessage(from, {
        text: "🟢 Bot is alive and running!"
      });
    }
  });

  return sock;
}

/**
 * GET PAIRING CODE
 */
async function getPairingCode(id, number) {
  const session = sessions.get(id);

  if (!session) {
    throw new Error("Session not found");
  }

  const code = await session.sock.requestPairingCode(number);

  return code;
}

/**
 * SESSION STATUS
 */
function getStatus(id) {
  const session = sessions.get(id);

  if (!session) return "offline";

  return "online";
}

module.exports = {
  createSession,
  getPairingCode,
  getStatus,
  sessions
};const {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const sessions = new Map();

/**
 * CREATE WHATSAPP SESSION
 */
async function createSession(id) {
  const { state, saveCreds } = await useMultiFileAuthState(`./sessions/${id}`);

  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    auth: state,
    version,
    printQRInTerminal: false
  });

  sessions.set(id, { sock });

  // save session
  sock.ev.on("creds.update", saveCreds);

  // connection handler
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

      if (shouldReconnect) {
        createSession(id);
      }
    }
  });

  // MESSAGE HANDLER (COMMANDS)
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const from = msg.key.remoteJid;

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    const cmd = text.toLowerCase().split(" ")[0];

    // MENU
    if (cmd === ".menu") {
      await sock.sendMessage(from, {
        text: `🤖 *BOT MENU*

📌 .menu - Show menu
⚡ .ping - Speed test
🟢 .alive - Check bot status`
      });
    }

    // PING
    if (cmd === ".ping") {
      const start = Date.now();

      await sock.sendMessage(from, { text: "Pinging..." });

      const end = Date.now();

      await sock.sendMessage(from, {
        text: `🏓 Pong!\nSpeed: ${end - start}ms`
      });
    }

    // ALIVE
    if (cmd === ".alive") {
      await sock.sendMessage(from, {
        text: "🟢 Bot is alive and running!"
      });
    }
  });

  return sock;
}

/**
 * GET PAIRING CODE
 */
async function getPairingCode(id, number) {
  const session = sessions.get(id);

  if (!session) {
    throw new Error("Session not found");
  }

  const code = await session.sock.requestPairingCode(number);

  return code;
}

/**
 * SESSION STATUS
 */
function getStatus(id) {
  const session = sessions.get(id);

  if (!session) return "offline";

  return "online";
}

module.exports = {
  createSession,
  getPairingCode,
  getStatus,
  sessions
};