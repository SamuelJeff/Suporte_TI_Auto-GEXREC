// controllers/sessionController.js
const { saveSession, loadSession, deleteSession } = require('../models/sessions');

// Função para salvar a sessão
const handleSaveSession = (id, session) => {
    saveSession(id, session);
};

// Função para carregar a sessão
const handleLoadSession = (id, callback) => {
    loadSession(id, callback);
};

// Função para excluir a sessão
const handleDeleteSession = (id) => {
    deleteSession(id);
};

module.exports = {
    handleSaveSession,
    handleLoadSession,
    handleDeleteSession
};
