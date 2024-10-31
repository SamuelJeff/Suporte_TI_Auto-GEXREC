// main.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { handleSaveSession, handleLoadSession, handleDeleteSession } = require('./controllers/sessionController');
const { handleUserMessage } = require('./controllers/messageController');

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

client.on('qr', (qr) => {
    console.log('QR code recebido, escaneie com o WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente pronto!');
});

client.on('message', (message) => {handleUserMessage(client, message)
    console.log(message.body)
});



client.initialize();
