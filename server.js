const express = require("express");
const app = express();
const PORT = 3000;
const cors = require('cors')
const {startBot} = require('./main')
const {getAllMessages, getMessagesByUser} = require('./models/message')

app.use(express.static("public"));
app.use(cors())
app.use(
    express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

startBot();

app.get("/", (req, res) => {
  res.send(`hello world!`);
});

app.get('/messages/:number', async (req, res) => {
  const { number } = req.params;
  try {
      const messages = await getMessagesByUser (number);
      res.json(messages); 
  } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
      res.status(500).json({ error: 'Erro ao buscar mensagens' });
  }
});

app.get('/messages', async (req, res) => {
  try {
      const messages = await getAllMessages();
      res.json(messages); 
  } catch (error) {
      console.error("Erro ao buscar todas as mensagens:", error);
      res.status(500).json({ error: 'Erro ao buscar todas as mensagens' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
