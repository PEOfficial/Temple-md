const express = require("express");
const cors = require("cors");
const { createSession, getPairingCode, sessions } = require("./bot");

const app = express();
app.use(cors());
app.use(express.json());

// create session
app.post("/session/create", async (req, res) => {
  const { id } = req.body;

  await createSession(id);

  res.json({ status: "session created", id });
});

// generate pairing code
app.post("/session/pair", async (req, res) => {
  const { id, number } = req.body;

  const session = sessions.get(id);

  if (!session) {
    return res.json({ error: "Session not found" });
  }

  const code = await getPairingCode(session.sock, number);

  res.json({ code });
});

// status
app.get("/session/status/:id", (req, res) => {
  const session = sessions.get(req.params.id);

  res.json({
    status: session?.connection || "offline"
  });
});

app.listen(3000, () => console.log("Backend running"));