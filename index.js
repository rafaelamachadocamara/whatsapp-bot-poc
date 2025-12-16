const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// CONFIGURAÇÕES
// preencha com seus dados do Meta for Developers
const WHATSAPP_TOKEN = "SEU_TOKEN_DE_ACESSO_AQUI"; // token do Meta for Developers
const PHONE_NUMBER_ID = "SEU_PHONE_NUMBER_ID_AQUI"; // id do número do WhatsApp Business
const VERIFY_TOKEN = "meu_token_secreto_123"; // token que você define (qualquer string)
const PORT = 3000;

// WEBHOOK VERIFICATION (GET)
// o Meta usa isso para verificar seu webhook
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verificado com sucesso!");
    res.status(200).send(challenge);
  } else {
    console.log("Falha na verificação do webhook");
    res.sendStatus(403);
  }
});

// RECEBER MENSAGENS (POST)
// quando alguém manda mensagem, o Meta envia para este endpoint
app.post("/webhook", async (req, res) => {
  try {
    const body = req.body;

    // verifica se é uma mensagem do whatsapp
    if (body.object === "whatsapp_business_account") {
      // processa cada entrada
      body.entry.forEach((entry) => {
        entry.changes.forEach((change) => {
          if (change.value.messages) {
            const message = change.value.messages[0];
            const from = message.from; // número de quem enviou
            const messageBody = message.text.body; // texto da mensagem
            const messageId = message.id;

            console.log(`Mensagem recebida de ${from}: ${messageBody}`);

            // responde automaticamente
            respondToMessage(from, messageBody);
          }

          // confirmação de leitura
          if (change.value.statuses) {
            console.log("Status atualizado:", change.value.statuses);
          }
        });
      });

      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Erro ao processar webhook:", error);
    res.sendStatus(500);
  }
});

// ENVIAR MENSAGEM
async function sendMessage(to, message) {
  try {
    const url = `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`;

    const data = {
      messaging_product: "whatsapp",
      to: to,
      type: "text",
      text: {
        body: message,
      },
    };

    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Mensagem enviada com sucesso!", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao enviar mensagem:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// LÓGICA DE RESPOSTA AUTOMÁTICA
async function respondToMessage(from, messageText) {
  let response = "";

  // lógica simples de resposta baseada na mensagem recebida
  const lowerText = messageText.toLowerCase();

  if (
    lowerText.includes("oi") ||
    lowerText.includes("olá") ||
    lowerText.includes("ola")
  ) {
    response = "Olá! Como posso ajudar você hoje?";
  } else if (lowerText.includes("ajuda") || lowerText.includes("help")) {
    response =
      "Sou um bot de teste. Você pode me enviar qualquer mensagem e eu vou responder!\n\nTente:\n- oi\n- preço\n- horário";
  } else if (
    lowerText.includes("preço") ||
    lowerText.includes("preco") ||
    lowerText.includes("valor")
  ) {
    response =
      "Nossos preços variam. Entre em contato com nossa equipe comercial!";
  } else if (lowerText.includes("horário") || lowerText.includes("horario")) {
    response = "Atendemos de segunda a sexta, das 9h às 18h.";
  } else {
    response = `Você disse: "${messageText}"\n\nEsta é uma resposta automática. Estou funcionando!`;
  }

  // envia a resposta
  await sendMessage(from, response);
}

// ENDPOINT DE TESTE PARA ENVIAR MENSAGEM MANUALMENTE
// use este endpoint para testar o envio de mensagens
// POST http://localhost:3000/send-message
// Body: { "to": "5511999999999", "message": "Olá!" }
app.post("/send-message", async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({
        error: 'Parâmetros "to" e "message" são obrigatórios',
      });
    }

    const result = await sendMessage(to, message);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
  console.log(`Webhook URL: http://localhost:${PORT}/webhook`);
  console.log("Use ngrok para expor publicamente: ngrok http", PORT);
});

// VERIFICAÇÃO
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "WhatsApp Business API POC está rodando!",
  });
});
