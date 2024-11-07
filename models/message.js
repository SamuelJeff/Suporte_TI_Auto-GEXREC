const knex = require('knex')(require('../knexfile').development);

// Função para salvar uma mensagem
async function saveMessage(called) {
  return await knex('messages').insert({
    number: called.number,
    firstMessage: called.first,
    nameMessage: called.name,
    unitMessage: called.unit,
    typeMessage: called.type,
    optionMessage: called.option,
    detailMessage: called.detail
  });
}

// Função para buscar mensagens por usuário
async function getMessagesByUser(number) {
  return await knex('messages').where({ number }).select('*');
}

module.exports = {
  saveMessage,
  getMessagesByUser
};
