// knexfile.js
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/message/message.db' // Caminho para o seu banco de dados SQLite
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    }
  }
};
