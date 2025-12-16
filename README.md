# 💬 WhatsApp Business API - POC

Prova de Conceito (POC) para integração com a API oficial do WhatsApp Business, permitindo comunicação direta (1:1) entre o sistema e usuários finais via WhatsApp.

## 📋 Sobre o Projeto

Este projeto demonstra como:
- ✅ Conectar com a API do WhatsApp Business
- ✅ Receber mensagens de usuários
- ✅ Enviar respostas automáticas
- ✅ Configurar webhooks para comunicação em tempo real

## 🚀 Tecnologias Utilizadas

- Node.js
- Express.js
- Axios
- WhatsApp Business API (Meta)

## 📦 Pré-requisitos

Antes de começar, você precisa ter:

- Node.js instalado (v14 ou superior)
- Uma conta no [Meta Business](https://business.facebook.com)
- Uma conta no [Meta for Developers](https://developers.facebook.com)
- Um número de telefone dedicado para o WhatsApp Business
- [ngrok](https://ngrok.com) (para testes locais)

## 🔧 Configuração Inicial

### 1. Criar App no Meta for Developers

1. Acesse [Meta for Developers](https://developers.facebook.com)
2. Clique em **"Meus Apps"** → **"Criar App"**
3. Escolha o tipo **"Empresa"**
4. Preencha os dados do app
5. Adicione o produto **"WhatsApp"** ao seu app

### 2. Obter Credenciais

No painel do seu app, você vai precisar de:

- **Token de Acesso (Access Token)**: Navegue até WhatsApp → Começar → Token de acesso
- **Phone Number ID**: Encontrado na mesma página, abaixo do número de teste
- **Verify Token**: Uma string secreta que você mesmo define (ex: `meu_token_123`)

### 3. Configurar Número de Telefone

Para testes iniciais, você pode usar o número de teste fornecido pelo Meta. Para produção, você precisará adicionar um número real.

## ⚙️ Instalação

1. Clone este repositório:
```bash
git clone https://github.com/rafaelamachadocamara/whatsapp-business-poc.git
cd whatsapp-business-poc
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis no arquivo `index.js`:

```javascript
const WHATSAPP_TOKEN = 'SEU_TOKEN_DE_ACESSO_AQUI';
const PHONE_NUMBER_ID = 'SEU_PHONE_NUMBER_ID_AQUI';
const VERIFY_TOKEN = 'meu_token_secreto_123';
```

## 🌐 Expondo o Servidor Localmente

Para que o Meta consiga enviar mensagens para seu servidor local, você precisa expô-lo publicamente:

1. Instale o ngrok: https://ngrok.com/download

2. Execute o ngrok:
```bash
ngrok http 3000
```

3. Copie a URL fornecida (ex: `https://abc123.ngrok.io`)

## 🔗 Configurar Webhook no Meta

1. No painel do seu app, vá em **WhatsApp** → **Configuração**
2. Na seção **Webhook**, clique em **Configurar**
3. Preencha:
   - **URL de Callback**: `https://sua-url-ngrok.ngrok.io/webhook`
   - **Token de Verificação**: O mesmo que você definiu no código (ex: `meu_token_secreto_123`)
4. Marque o campo **messages** em **Campos do Webhook**
5. Clique em **Verificar e salvar**

## ▶️ Como Usar

1. Inicie o servidor:
```bash
node index.js
```

2. Você verá a mensagem:
```
🚀 Servidor rodando na porta 3000
📡 Webhook URL: http://localhost:3000/webhook
```

3. Envie uma mensagem para o número do WhatsApp Business configurado

4. O bot responderá automaticamente! 🎉

## 📱 Testando o Bot

O bot responde aos seguintes comandos:

- **"oi"** ou **"olá"** → Mensagem de boas-vindas
- **"ajuda"** → Lista de comandos disponíveis
- **"preço"** → Informações sobre preços
- **"horário"** → Horário de atendimento
- Qualquer outra mensagem → Eco da mensagem recebida

## 🧪 Teste Manual via API

Você também pode enviar mensagens programaticamente:

```bash
curl -X POST http://localhost:3000/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "to": "5511999999999",
    "message": "Olá! Teste de mensagem"
  }'
```

Ou usando uma ferramenta como Postman/Insomnia:
- **Method**: POST
- **URL**: `http://localhost:3000/send-message`
- **Body (JSON)**:
```json
{
  "to": "5511999999999",
  "message": "Sua mensagem aqui"
}
```

## 📊 Estrutura do Projeto

```
.
├── index.js          # Arquivo principal com toda a lógica
├── package.json      # Dependências do projeto
└── README.md         # Este arquivo
```

## 💰 Custos

A API do WhatsApp Business tem o seguinte modelo de preços:

- **Gratuito**: Primeiras 1.000 conversas por mês
- **Após 1.000 conversas**: ~R$ 0,30 a R$ 0,50 por conversa (varia por país)
- **Conversa**: Janela de 24 horas desde a última mensagem do cliente

> ⚠️ **Importante**: Você precisa de um número de telefone dedicado. Não pode ser o mesmo número de um WhatsApp pessoal.

## 🔍 Como Funciona

### Recebendo Mensagens

1. Usuário envia mensagem para o número do WhatsApp Business
2. Meta envia um POST para seu webhook (`/webhook`)
3. Seu servidor processa a mensagem
4. Você pode responder automaticamente

### Enviando Mensagens

1. Seu código faz uma requisição POST para a API do Meta
2. Endpoint: `https://graph.facebook.com/v21.0/{phone-number-id}/messages`
3. Inclui o token de autenticação no header
4. Mensagem é enviada para o usuário

## 📚 Documentação Oficial

- [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)
- [Primeiros Passos](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started)
- [Enviar Mensagens](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages)
- [Webhooks](https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components)
  

## 📄 Licença

Este projeto é uma POC (Prova de Conceito) para fins de teste.

---

**Desenvolvido como POC para demonstrar integração com WhatsApp Business API** 🚀
