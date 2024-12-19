const express = require("express");
const app = express();
const PORT = 3000;
const cors = require('cors')
const {startBot} = require('./main')
const {getAllMessages, getMessagesByUser, getMessagesByType, getMessagesByDay, updateMessageSituation, deleteMessageById} = require('./models/message')

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
//endpoint para filtrar por números
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
//endpoint para enviar todos as mensagens
app.get('/messages', async (req, res) => {
  try {
      const messages = await getAllMessages();
      res.json(messages); 
  } catch (error) {
      console.error("Erro ao buscar todas as mensagens:", error);
      res.status(500).json({ error: 'Erro ao buscar todas as mensagens' });
  }
});
//endpoint para filtrar por tipo
app.get('/messages/tipo/:type', async (req, res) => {
  const { type } = req.params; 
  console.log("Tipo recebido:", type); 
  if (!type) {
      return res.status(400).json({ error: 'O parâmetro "type" é obrigatório.' });
  }

  try {
      const messages = await getMessagesByType(type);
      res.json(messages);
  } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
      res.status(500).json({ error: 'Erro ao buscar mensagens' });
  }
});
//endpoint para filtrar os chamdos do dia atual
app.get('/messages/hoje', async (req,res) =>{
try{
  const messages = await getMessagesByDay()
  res.json(messages)
}catch(error){
  console.error("Erro ao buscar mensagens:", error);
  res.status(500).json({ error: 'Erro ao buscar mensagens' });
}
});
//endpoint para atualizar a situação de uma mensagem
app.put('/situation', async (req, res) => {
  const { id } = req.query; // Aqui usa req.query para parâmetros de query
 
  if (!id) {
    return res.status(400).json({ error: 'O parâmetro "id" é obrigatório.' });
  }
  try {
    await updateMessageSituation(id );
    res.status(200).json({ message: 'Situação atualizada para resolved.' });
  } catch (error) {
    console.error('Erro ao atualizar a situação:', error);
    res.status(500).json({ error: 'Erro ao atualizar a situação.' });
  }
});
//endpoint para deletar o chamado
app.delete('/messages/delete/:id', async (req, res) => {
  const { id } = req.params;
  console.log("Id recebido:", id);
  if (!id) {
    return res.status(400).json({ error: 'O parâmetro "id" é obrigadorio.'});
  }
  try{
    await deleteMessageById(id)
    res.status(200).json({message: 'Chamado deletado.'})
  }catch(error){
    res.status(500).json({error: 'Erro ao deletar chamado.'})
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});