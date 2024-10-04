const connectDB = require('../db/db');

// Função para salvar a sessão no banco de dados
const saveSession = (id, session) => {
    const db = connectDB();
    db.run(`REPLACE INTO sessions (id, session) VALUES (?, ?)`, [id, session], (err) => {
        if (err) {
            console.error('Erro ao salvar sessão:', err.message);
        } else {
            console.log('Sessão salva com sucesso.');
        }
    });
    db.close();
};

// Função para carregar a sessão do banco de dados
const loadSession = (id, callback) => {
    const db = connectDB();
    db.get(`SELECT session FROM sessions WHERE id = ?`, [id], (err, row) => {
        if (err) {
            console.error('Erro ao carregar sessão:', err.message);
        }
        callback(row ? row.session : null);
    });
    db.close();
};

// Função para excluir a sessão do banco de dados
const deleteSession = (id) => {
    const db = connectDB();
    db.run(`DELETE FROM sessions WHERE id = ?`, [id], (err) => {
        if (err) {
            console.error('Erro ao excluir sessão:', err.message);
        } else {
            console.log('Sessão excluída com sucesso.');
        }
    });
    db.close();
};

module.exports = {
    saveSession,
    loadSession,
    deleteSession
};