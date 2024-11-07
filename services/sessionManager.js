// sessionManager.js
const userSessions = {};

function getUserSession(from) {
    if (!userSessions[from]) {
        userSessions[from] = {
            step: 'start',
            queue: [],
            isProcessing: false
        };
    }
    return userSessions[from];
}

async function processQueue(client, from) {
    const session = getUserSession(from);

    if (session.isProcessing) return;  // Já está processando, sair

    session.isProcessing = true;

    while (session.queue.length > 0) {
        const task = session.queue.shift();
        await task();  // Processa a próxima tarefa da fila
    }

    session.isProcessing = false;
}

async function addTaskToQueue(client, from, task) {
    // Adiciona a tarefa na fila
    queue.push({ client, from, task });
    processQueue();
}

async function processQueue() {
    if (queue.length > 0) {
        const { client, from, task } = queue.shift();
        try {
            await task();  // Executa a tarefa
        } catch (error) {
            console.error('Erro ao processar a tarefa:', error);
        }
        processQueue();  // Continua processando a fila
    }
}


module.exports = { getUserSession, addTaskToQueue };
