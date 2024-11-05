const {saveMessage } = require('../models/message');


const userSessions = {};

async function sendWelcomeMessage(client, from) {
    const welcomeQuestion = "Bem-vindo ao Suporte de TI!\n\n";
    await client.sendMessage(from, welcomeQuestion);
}

async function askForName(client, from) {
    const nameQuestion = "Para começar, qual o seu nome?";
    await client.sendMessage(from, nameQuestion);
}

async function askForAgency(client, from) {
    const unitMessage = "Por favor, informe a unidade/setor à qual você pertence.";
    await client.sendMessage(from, unitMessage);
}

async function sendWelcomeMenu(client, from) {
    const welcomeMenu =
        "Como podemos ajudá-lo hoje?\n\n" +
        "1️⃣ Abrir chamado para Suporte\n" +
        "2️⃣ Troca de senha\n" +
        "3️⃣ Manutenção\n" +
        "4️⃣ Instalação ou Atualização de Software\n\n" +
        "Por favor, responda com o número da opção desejada.";
    await client.sendMessage(from, welcomeMenu);
}

function formatNumber(number){
    return number.replace(/@[a-z]\.us/, ""); 
}

async function handleOptionSelection(client, from, option) {
    let responseMessage;

    switch (option) {
        case '1':
            responseMessage = "Você escolheu: Suporte. Por favor, descreva em detalhes o problema que você está enfrentando.";
            userSessions[from] = 'awaiting_detailed_description_support';
            break;
        case '2':
            responseMessage = "Você escolheu: Troca de senha. Qual serviço necessita da troca de senha (ex: e-mail, sistema interno, etc)?";
            userSessions[from] = 'awaiting_detailed_description_password';
            break;
        case '3':
            responseMessage = "Você escolheu: Manutenção. Que tipo de manutenção é necessária (ex: hardware, software)?";
            userSessions[from] = 'awaiting_maintenance_type';
            break;
        case '4':
            responseMessage = "Você escolheu: Instalação ou Atualização de Software. Por favor, informe o software a ser instalado ou atualizado.";
            userSessions[from] = 'awaiting_detailed_description_installation';
            break;
        default:
            responseMessage = "Opção inválida. Por favor, responda com o número correspondente.";
            await sendWelcomeMenu(client, from);
            break;
    }

    if (responseMessage) {
        await client.sendMessage(from, responseMessage);
    }
}

async function handleUserMessage(client, message) {
    const called = {};
    const from = message.from;
    const userMessage = message.body.trim();

     
    if (!userSessions[from]) {

        called.number = formatNumber(from)
        called.first = userMessage; // Armazena a primeira mensagem do usuário

        userSessions[from] = 'awaiting_name';
        await sendWelcomeMessage(client, from);
        await askForName(client, from);
    } else {
        const currentState = userSessions[from];

        if (currentState === 'awaiting_name') {
            await client.sendMessage(from, `Prazer em conhecê-lo, ${userMessage}!`);
            called.name = userMessage; // Armazena a mensagem de solicitação de nome
            userSessions[from] = 'awaiting_agency';
            await askForAgency(client, from);
        } 
        else if (currentState === 'awaiting_agency') {
            await client.sendMessage(from, `Agência registrada: ${userMessage}.`);
            called.unit = userMessage; // Armazena a mensagem de solicitação de agência
            userSessions[from] = 'awaiting_selection';
            await sendWelcomeMenu(client, from);
        }
         else if (currentState === 'awaiting_selection') {
            await handleOptionSelection(client, from, userMessage);
            called.type = userMessage; // Armazena a mensagem de do menu de opções
        }
         else if (currentState === 'awaiting_maintenance_type') {
            called.option = userMessage
            await client.sendMessage(from, "Obrigado. Por favor, descreva o problema detalhadamente(Descreve uma única mensagem).");
            userSessions[from] = 'awaiting_detailed_description';
        }
         else if (currentState.startsWith('awaiting_detailed_description')) {
            called.detail = userMessage;
            saveMessage(called)
            await client.sendMessage(from, `Chamado registrado: "${userMessage}". Nossa equipe entrará em contato em breve.`);
            delete userSessions[from];
        }
    }
}


module.exports = {
    handleUserMessage
};
