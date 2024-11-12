const knex = require('knex')(require('../knexfile').development);


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

async function getAllMessages() {
  return await knex('messages').select('*');
}

async function getMessagesByUser(number) {
  return await knex('messages').where({ number: number }).select('*');
}

async function getMessagesByType(type) {
  return await knex('messages').where({ typeMessage: type }).select('*');
}

module.exports = {
  saveMessage,
  getMessagesByUser,
  getAllMessages,
  getMessagesByType
};
