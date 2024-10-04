// main.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { handleSaveSession, handleLoadSession, handleDeleteSession } = require('./controllers/sessionController');

// Configuração do cliente do WhatsApp com LocalAuth
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "suporte_ti_bot",
        dataPath: './sessions', // Diretório para armazenar temporariamente
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

client.on('message_create', async (message) => {
	
		const media = await message.downloadMedia();
		if (message.body === '!ping') {
			client.sendMessage(message.from, 'pong');
		
	}
})

// Iniciar o cliente
client.initialize();
