
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/message/message.db' 
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    }
  }
};

