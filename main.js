const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { handleSaveSession, handleLoadSession, handleDeleteSession } = require('./controllers/sessionController');
const { handleMessage } = require('./controllers/messageController');

// Configuração do cliente do WhatsApp com LocalAuth
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "suporte_ti_bot",
        dataPath: './sessions',
        store: {
            set: (session, value) => handleSaveSession("suporte_ti_bot", value),
            get: (session, callback) => handleLoadSession("suporte_ti_bot", callback),
            remove: (session) => handleDeleteSession("suporte_ti_bot")
        }
    })
});

// Evento para exibir o QR Code
client.on('qr', (qr) => {
    console.log('QR code recebido, escaneie com o WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Evento para confirmar que o cliente está pronto
client.on('ready', () => {
    console.log('Cliente pronto!');
});

// Evento para lidar com mensagens
client.on('message', async (message) => {
    await handleMessage(client, message);
    
console.log(message.body)    
});



// Iniciar o cliente
client.initialize();