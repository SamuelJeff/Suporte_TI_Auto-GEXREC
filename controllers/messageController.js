// controllers/messageController.js

let userSessions = {};

function sendWelcomeMessage(client, from) {
    const welcomeMessage = 
        "Bem-vindo ao Suporte de TI!\n\n" +
        "Estamos aqui para ajudá-lo com seus chamados de suporte técnico.\n";
    client.sendMessage(from, welcomeMessage);
}

function askForName(client, from) {
    client.sendMessage(from, "Para começarmos, por favor, informe o seu nome.");
    userSessions[from] = 'awaiting_name';
}

function sendWelcomeMenu(client, from) {
    const welcomeMenu = 
        "Como podemos ajudá-lo hoje?\n\n" +
        "1️⃣ Abrir chamado para Suporte\n" +
        "2️⃣ Troca de senha\n" +
        "3️⃣ Manutenção\n" +
        "4️⃣ Instalação ou Atualização de Software\n\n" +
        "Por favor, responda com o número da opção desejada.";
    client.sendMessage(from, welcomeMenu);
    userSessions[from] = 'awaiting_selection';
}

function handleOptionSelection(client, from, option) {
    switch (option) {
        case '1':
            client.sendMessage(from, "Você escolheu: Suporte. Descreva o problema que você está enfrentando.");
            userSessions[from] = 'suporte';
            break;
        case '2':
            client.sendMessage(from, "Você escolheu: Troca de senha. Qual serviço necessita da troca de senha (ex: e-mail, sistema interno, etc)?");
            userSessions[from] = 'troca_senha';
            break;
        case '3':
            client.sendMessage(from, "Você escolheu: Manutenção. Que tipo de manutenção é necessária (ex: hardware, software)?");
            userSessions[from] = 'manutencao';
            break;
        case '4':
            client.sendMessage(from, "Você escolheu: Instalação ou Atualização de Software. Por favor, informe o software a ser instalado ou atualizado.");
            userSessions[from] = 'instalacao_software';
            break;
        default:
            client.sendMessage(from, "Opção inválida. Por favor, responda com o número correspondente.");
            sendWelcomeMenu(client, from);
            break;
    }
}

function askForAgency(client, from) {
    client.sendMessage(from, "Por favor, informe a sua unidade.");
    userSessions[from] = 'awaiting_agency';
}

function handleMessage(client, message) {
    const from = message.from;
    const userMessage = message.body.trim();

    if (!userSessions[from]) {
        sendWelcomeMessage(client, from);
        setTimeout(() => {
            askForName(client, from);
        }, 1000);
    } else {
        const currentState = userSessions[from];

        if (currentState === 'awaiting_name') {
            client.sendMessage(from, `Prazer em conhecê-lo, ${userMessage}!`);
            userSessions[from] = { name: userMessage };
            askForAgency(client, from);
        } else if (currentState === 'awaiting_agency') {
            client.sendMessage(from, `Agência registrada: ${userMessage}.`);
            userSessions[from].agency = userMessage;
            setTimeout(() => {
                sendWelcomeMenu(client, from);
            }, 1000);
        } else if (currentState === 'awaiting_selection') {
            handleOptionSelection(client, from, userMessage);
        } else if (currentState === 'suporte') {
            client.sendMessage(from, `Chamado de Suporte registrado: "${userMessage}". Nossa equipe entrará em contato em breve.`);
            delete userSessions[from];
        } else if (currentState === 'troca_senha') {
            client.sendMessage(from, `Pedido de troca de senha para o serviço "${userMessage}" registrado. Nossa equipe vai processar sua solicitação.`);
            delete userSessions[from];
        } else if (currentState === 'manutencao') {
            client.sendMessage(from, `Pedido de manutenção registrado para "${userMessage}". Nossa equipe está a caminho.`);
            delete userSessions[from];
        } else if (currentState === 'instalacao_software') {
            client.sendMessage(from, `Instalação/atualização do software "${userMessage}" registrada. Vamos providenciar o necessário.`);
            delete userSessions[from];
        }
    }
}



module.exports = {
    sendWelcomeMessage,
    askForName,
    sendWelcomeMenu,
    handleOptionSelection,
    askForAgency,
    handleMessage,
};