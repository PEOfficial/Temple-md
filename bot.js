const {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const sessions = new Map();

async function createSession(id) {
  const { state, saveCreds } = await useMultiFileAuthState(`./sessions/${id}`);

  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    auth: state,
    version,
    printQRInTerminal: false
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection } = update;
    sessions.set(id, { sock, connection });
  });

  return sock;
}

async function getPairingCode(sock, number) {
  const code = await sock.requestPairingCode(number);
  return code;
}

module.exports = { createSession, getPairingCode, sessions };