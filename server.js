const express = require("express");
const app = express();
const PORT = 3000;
const cors = require('cors')
const {startBot} = require('./main')
const {getAllMessages, getMessagesByUser, getMessagesByType, getMessagesByDay, updateMessageSituation} = require('./models/message')

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

app.get('/messages/numero/:number', async (req, res) => {
  const { number } = req.params;
  console.log("numero recebido", number)
  if (!number) {
    return res.status(400).json({ error: 'O parâmetro "number" é obrigatório.' });
}
  try {
      const messages = await getMessagesByUser(number);
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

app.get('/messages/tipo/:type', async (req, res) => {
  const { type } = req.params; // Use req.query para obter parâmetros de consulta
  console.log("Tipo recebido:", type); // Log para verificar o tipo recebido

  if (!type) {
      return res.status(400).json({ error: 'O parâmetro "type" é obrigatório.' });
  }

  try {
      const messages = await getMessagesByType(type); // Chama a função para obter mensagens por tipo
      res.json(messages);
  } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
      res.status(500).json({ error: 'Erro ao buscar mensagens' });
  }
});

app.get('/messages/hoje', async (req,res) =>{
try{
  const messages = await getMessagesByDay()
  res.json(messages)
}catch(error){
  console.error("Erro ao buscar mensagens:", error);
  res.status(500).json({ error: 'Erro ao buscar mensagens' });
}
});

app.put('/messages/situation/:id', async (req, res) => {
  const { id } = req.params; // Captura o ID da rota
  const newSituation = 'solved'; // O valor que você quer definir

  try {
      // Chama a função do modelo para atualizar a situação
      await updateMessageSituation(id, newSituation);
      res.status(200).json({ message: 'Situação atualizada para resolved.' });
  } catch (error) {
      console.error("Erro ao atualizar a situação:", error);
      res.status(500).json({ error: 'Erro ao atualizar a situação.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
