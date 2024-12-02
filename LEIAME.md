
---

# Suporte de TI - Chatbot de Atendimento

Este projeto é um chatbot de suporte de TI que realiza atendimento automático para usuários, com registro de chamados em diferentes categorias, como suporte, troca de senha, manutenção, entre outros.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Endpoints da API](#endpoints-da-api)
  - [GET /messages](#get-messages)
  - [GET /messages?type={tipo}](#get-messages-type)
  - [POST /messages](#post-messages)
- [Estrutura do Projeto](#estrutura-do-projeto)

## Pré-requisitos

Certifique-se de ter os seguintes requisitos instalados em sua máquina:

- [Node.js](https://nodejs.org/) (versão 12 ou superior)
- [npm](https://www.npmjs.com/get-npm) ou [yarn](https://yarnpkg.com/)

## Instalação

1. Clone o repositório para sua máquina:

   ```bash
   git clone https://github.com/SamuelJeff/reHub.git
   ```

2. Navegue para o diretório do projeto:

   ```bash
   cd suporte-ti-chatbot
   ```

3. Instale as dependências do projeto:

   ```bash
   npm install
   ```

## Configuração

1. **Banco de Dados**: O projeto utiliza SQLite, então você precisa configurar o banco de dados criando o arquivo `knexfile.js` para definir o ambiente de desenvolvimento.

   Exemplo de configuração (`knexfile.js`):

   ```js
   module.exports = {
     development: {
       client: 'sqlite3',
       connection: {
         filename: './dev.sqlite3'
       },
       useNullAsDefault: true
     }
   };
   ```

2. **Migrações**: Execute as migrações para criar a tabela de `messages`:

   ```bash
   npx knex migrate:latest
   ```

## Execução

Para iniciar o servidor:

```bash
node server.js
```

O servidor estará disponível em `http://localhost:3000`.

## Endpoints da API

### **GET /messages**

Retorna todas as mensagens registradas.

**Resposta:**

```json
[
  {
    "number": "12345",
    "firstMessage": "Primeira mensagem",
    "nameMessage": "Nome do Usuário",
    "unitMessage": "Unidade do Usuário",
    "typeMessage": "Tipo de Chamado",
    "optionMessage": "Opção Escolhida",
    "detailMessage": "Detalhes do Chamado"
  }
]
```

### **GET /messages?type={tipo}**

Retorna todas as mensagens filtradas pelo tipo de chamado (ex: `Manutenção`, `Troca de Senha`).

**Parâmetros de Query:**

- `type` - Tipo do chamado, exemplo: `Manutenção`

**Exemplo de Uso:**

```http
GET /messages?type=Manutenção
```

**Resposta:**

```json
[
  {
    "number": "67890",
    "firstMessage": "Chamado sobre Manutenção",
    "nameMessage": "Nome do Usuário",
    "unitMessage": "Unidade do Usuário",
    "typeMessage": "Manutenção",
    "optionMessage": "Opção Escolhida",
    "detailMessage": "Detalhes do Chamado"
  }
]
```

### **POST /messages**

Cria um novo registro de mensagem no sistema.

**Parâmetros de Body:**

- `number`: Número de telefone do usuário (string)
- `firstMessage`: Primeira mensagem do usuário (string)
- `nameMessage`: Nome do usuário (string)
- `unitMessage`: Unidade/Setor do usuário (string)
- `typeMessage`: Tipo de chamado (string)
- `optionMessage`: Opção escolhida pelo usuário (string)
- `detailMessage`: Descrição detalhada do problema (string)

**Exemplo de Body:**

```json
{
  "number": "67890",
  "firstMessage": "Preciso de ajuda com manutenção",
  "nameMessage": "João",
  "unitMessage": "TI",
  "typeMessage": "Manutenção",
  "optionMessage": "Hardware",
  "detailMessage": "Problemas com o HD"
}
```

**Resposta de Sucesso:**

```json
{
  "message": "Mensagem salva com sucesso!"
}
```

## Estrutura do Projeto

O projeto segue a seguinte estrutura de diretórios:

```
suporte-ti-chatbot/
├── controllers/         # Funções principais do bot
├── models/              # Modelo e interação com o banco de dados (SQLite)
├── public/              # Arquivos estáticos (HTML, CSS, JS frontend)
├── server.js            # Configuração principal do servidor Express
├── main.js              # Arquivo principal do bot
└── README.md            # Documentação do projeto
```

## Contribuições

Se quiser contribuir, por favor, faça um fork do repositório, crie uma nova branch e envie um pull request com a sua proposta de melhoria.

---