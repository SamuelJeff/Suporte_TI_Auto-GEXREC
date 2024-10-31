// controllers/messageController.js

var userSessions = {};
var optionRegister = 0

async function sendWelcomeMessage(client, from) {
    const welcomeMessage = "Bem-vindo ao Suporte de TI!\n\n";
    await client.sendMessage(from, welcomeMessage);
}

async function askForName(client, from) {
    const nameMessage = "Para começar, qual o seu nome?";
    await client.sendMessage(from, nameMessage);
}

async function askForAgency(client, from) {
    const agencyMessage = "Por favor, informe a unidade/setor à qual você pertence.";
    await client.sendMessage(from, agencyMessage);
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

async function handleOptionSelection(client, from, option) {
    switch (option) {
        case '1':
            await client.sendMessage(from, "Você escolheu: Suporte. Por favor, descreva em detalhes o problema que você está enfrentando.");
            userSessions[from] = 'awaiting_detailed_description_support';
            optionRegister = "Suporte"
            break;
        case '2':
            await client.sendMessage(from, "Você escolheu: Troca de senha. Qual serviço necessita da troca de senha (ex: e-mail, sistema interno, etc)?");
            userSessions[from] = 'awaiting_detailed_description_password';
            optionRegister = "Troca de senha"
            break;
        case '3':
            await client.sendMessage(from, "Você escolheu: Manutenção. Que tipo de manutenção é necessária (ex: hardware, software)?");
            userSessions[from] = 'awaiting_maintenance_type';
            optionRegister = "Manutenção"
            break;
        case '4':
            await client.sendMessage(from, "Você escolheu: Instalação ou Atualização de Software. Por favor, informe o software a ser instalado ou atualizado.");
            userSessions[from] = 'awaiting_detailed_description_installation';
            optionRegister = "Instalação ou Atualização de Software"
            break;
        default:
            await client.sendMessage(from, "Opção inválida. Por favor, responda com o número correspondente.");
            await sendWelcomeMenu(client, from);
            break;
    }
}

async function handleUserMessage(client, message) {
    const from = message.from;
    const userMessage = message.body.trim();

    // Verifica o estado atual do usuário e realiza a ação correspondente
    if (!userSessions[from]) {
        userSessions[from] = 'awaiting_name';
        await sendWelcomeMessage(client, from);
        await askForName(client, from);
    } else {
        const currentState = userSessions[from];

        if (currentState === 'awaiting_name') {
            await client.sendMessage(from, `Prazer em conhecê-lo, ${userMessage}!`);
            userSessions[from] = 'awaiting_agency';
            await askForAgency(client, from);
        } else if (currentState === 'awaiting_agency') {
            await client.sendMessage(from, `Agência registrada: ${userMessage}.`);
            userSessions[from] = 'awaiting_selection';
            await sendWelcomeMenu(client, from);
        } else if (currentState === 'awaiting_selection') {
            await handleOptionSelection(client, from, userMessage);
        } else if (currentState === 'awaiting_maintenance_type') {
            await client.sendMessage(from, "Por favor, descreva em uma mensagem qual o problema a ser solucionado.");
            userSessions[from] = 'awaiting_detailed_description_maintenance';

        } else if (currentState.startsWith('awaiting_detailed_description')) {
            await client.sendMessage(from, `Chamado registrado: "${optionRegister}". Nossa equipe entrará em contato em breve.`);
            delete userSessions[from]; // Reseta o estado do usuário após o chamado ser registrado
        }
    }
}

async function Savemessage(params) {
    
}

module.exports = {
    handleUserMessage
};
