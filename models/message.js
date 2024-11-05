const connectDB = require('../db/db');

const db = connectDB(); // Obtenha a instância do banco de dados

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            number TEXT,
            firstMessage TEXT,
            nameMessage TEXT,
            unitMessage TEXT,
            typeMessage TEXT,
            optionMessage TEXT,
            detailMessage TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar a tabela messages:', err.message);
        } else {
            console.log('Tabela messages criada com sucesso.');
        }
    });
});

// Funções CRUD para a model de mensagens
function saveMessage(called) {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO messages (number, firstMessage, nameMessage, unitMessage, typeMessage, optionMessage, detailMessage) VALUES (?, ?, ?, ?,?, ?, ?)`,
            [called.number, called.first, called.name, called.unit, called.type,called.option, called.detail],
            function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
}


function getMessagesByUser(number) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM messages WHERE sender = ?`, [number], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

module.exports = {
    saveMessage,
    getMessagesByUser
};