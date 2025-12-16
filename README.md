# 💬 WhatsApp Business API - POC

Prova de Conceito (POC) para integração com a API oficial do WhatsApp Business (Cloud API), permitindo comunicação direta (1:1) entre o sistema e usuários finais via WhatsApp.

---

## ⚠️ Aviso Importante sobre o Ambiente de Testes (Meta)

> **Este projeto funciona corretamente em ambiente de testes**, porém existem **limitações impostas pela Meta** que podem gerar confusão durante a validação inicial.

### 🧪 Ambiente de Teste

Quando você utiliza o **número de teste fornecido pela Meta**, o comportamento é o seguinte:

* ✅ As requisições para envio de mensagens retornam **200 OK**
* ✅ Um **ID de mensagem (`wamid`)** é gerado
* ✅ O webhook pode ser verificado com sucesso
* ❌ **A mensagem NÃO aparece no WhatsApp real**
* ❌ Não existe inbox real para o número de teste

📌 Ou seja: **a API aceita a mensagem, mas não realiza a entrega real**.

Isso é um comportamento **esperado** e **documentado implicitamente** pela Meta.

### 📱 Ambiente de Produção (Número Real)

Para que as mensagens **cheguem de fato ao WhatsApp**, é obrigatório:

* Ter uma **WhatsApp Business Account (WABA) real**
* Adicionar um **número de telefone real** (chip válido)
* Realizar a **verificação do número (SMS ou ligação)**
* Vincular o número ao app
* Ativar **billing (cobrança)** na conta Meta

🔔 **Sem um número real configurado, nenhuma mensagem será entregue ao WhatsApp**, mesmo que a API retorne sucesso.

---

## 📋 Sobre o Projeto

Este projeto demonstra como:

* ✅ Conectar com a API do WhatsApp Business
* ✅ Enviar mensagens via Cloud API
* ✅ Receber mensagens de usuários via Webhook
* ✅ Responder automaticamente mensagens recebidas

---

## 🚀 Tecnologias Utilizadas

* Node.js
* Express.js
* Axios
* WhatsApp Business API (Meta)

---

## 📦 Pré-requisitos

Antes de começar, você precisa ter:

* Node.js instalado (v14 ou superior)
* Uma conta no [Meta Business](https://business.facebook.com)
* Uma conta no [Meta for Developers](https://developers.facebook.com)
* (Produção) Um **número de telefone dedicado** para WhatsApp Business
* [ngrok](https://ngrok.com) (para testes locais)

---

## 🔧 Configuração Inicial

### 1. Criar App no Meta for Developers

1. Acesse [Meta for Developers](https://developers.facebook.com)
2. Clique em **"Meus Apps"** → **"Criar App"**
3. Escolha o tipo **"Empresa"**
4. Preencha os dados do app
5. Adicione o produto **"WhatsApp"** ao seu app

---

### 2. Obter Credenciais

No painel do seu app, você vai precisar de:

* **Token de Acesso (Access Token)**
* **Phone Number ID** (do número de teste ou número real)
* **Verify Token** (string definida por você)

---

### 3. Configuração de Número

* 🔹 **Testes iniciais**: Utilize o **número de teste da Meta**
* 🔹 **Produção**: Adicione e verifique um **número real**

⚠️ Apenas o número real recebe mensagens no WhatsApp.

---

## ⚙️ Instalação

```bash
git clone https://github.com/rafaelamachadocamara/whatsapp-business-poc.git
cd whatsapp-business-poc
npm install
```

Configure as variáveis no `index.js`:

```js
const WHATSAPP_TOKEN = 'SEU_TOKEN_DE_ACESSO';
const PHONE_NUMBER_ID = 'SEU_PHONE_NUMBER_ID';
const VERIFY_TOKEN = 'meu_token_secreto_123';
```

---

## 🌐 Expondo o Servidor Localmente

```bash
ngrok http 3000
```

Copie a URL HTTPS gerada e use no webhook.

---

## 🔗 Configuração do Webhook (Meta)

1. Vá em **WhatsApp → Configuration**
2. Configure:

   * **Callback URL**: `https://SEU-NGROK/webhook`
   * **Verify Token**: igual ao do código
3. Clique em **Verify and Save**
4. Marque o evento **messages**

---

## ▶️ Executando o Projeto

```bash
node index.js
```

---

## 🧪 Teste Manual de Envio (API)

```bash
curl -X POST http://localhost:3000/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "to": "5511999999999",
    "message": "Olá! Teste de mensagem"
  }'
```

⚠️ No ambiente de teste, a mensagem **não aparecerá no WhatsApp**, mesmo retornando sucesso.

---

## 📊 Estrutura do Projeto

```
.
├── index.js
├── package.json
└── README.md
```

---

## 💰 Custos (Produção)

* 1.000 conversas/mês gratuitas
* Após isso: cobrança por conversa (varia por país)

---

## 📚 Documentação Oficial

* [https://developers.facebook.com/docs/whatsapp](https://developers.facebook.com/docs/whatsapp)
* [https://developers.facebook.com/docs/whatsapp/cloud-api](https://developers.facebook.com/docs/whatsapp/cloud-api)

---

**Importante:** Se a API retorna `200 OK`, seu código está correto. A entrega real depende exclusivamente de um **número WhatsApp Business válido em produção** 
