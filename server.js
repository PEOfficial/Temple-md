const express = require("express");
const cors = require("cors");
const { createSession, getPairingCode, getStatus } = require("./bot");

const app = express();

app.use(cors());
app.use(express.json());

// CREATE SESSION
app.post("/session/create", async (req, res) => {
  const { id } = req.body;

  await createSession(id);

  res.json({ success: true, id });
});

// GET PAIRING CODE
app.post("/session/pair", async (req, res) => {
  try {
    const { id, number } = req.body;

    const code = await getPairingCode(id, number);

    res.json({ code });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// STATUS
app.get("/session/status/:id", (req, res) => {
  const status = getStatus(req.params.id);

  res.json({ status });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Bot server running on port " + PORT);
});