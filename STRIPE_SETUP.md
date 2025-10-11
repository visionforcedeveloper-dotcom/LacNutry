# Configuração do Stripe para Pagamento In-App

## ✅ O que foi implementado

O app agora abre o checkout do Stripe dentro de um WebView (modal), sem sair do aplicativo. Quando o pagamento é aprovado, o usuário é automaticamente redirecionado para a tela de autenticação.

## 🔧 Configuração Necessária no Stripe

### 1. Configurar URLs de Sucesso/Cancelamento nos Payment Links

Você precisa editar seus Payment Links no Stripe Dashboard:

#### Para o Plano Mensal (R$ 27)
Link atual: `https://buy.stripe.com/dRm14p1v85Vu6wQ2Iw97G0a`

1. Acesse: Stripe Dashboard → Products → Payment Links
2. Encontre o link do plano mensal
3. Clique em "Edit"
4. Configure:
   - **Success URL**: `https://seu-dominio.com/payment-success`
   - **Cancel URL**: `https://seu-dominio.com/paywall`

#### Para o Plano Anual (R$ 97)
Link atual: `https://buy.stripe.com/cNi4gBa1Ees07AUfvi97G0b`

1. Repita o mesmo processo acima
2. Configure as mesmas URLs

### 2. Criar Página de Sucesso (Opcional mas Recomendado)

Crie uma página web simples em `https://seu-dominio.com/payment-success` que:
- Mostra mensagem de sucesso
- Redireciona automaticamente após 2 segundos
- Ou apenas mostra "Pagamento aprovado! Retorne ao app."

Exemplo HTML:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Pagamento Aprovado</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 20px;
        }
        .container {
            max-width: 400px;
        }
        h1 { font-size: 48px; margin: 0 0 20px 0; }
        p { font-size: 18px; opacity: 0.9; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉</h1>
        <h2>Pagamento Aprovado!</h2>
        <p>Sua assinatura foi ativada com sucesso.</p>
        <p>Retorne ao aplicativo para continuar.</p>
    </div>
</body>
</html>
```

### 3. Configurar Webhook (Para Validação Backend - Futuro)

Quando você quiser validar pagamentos no backend:

1. Acesse: Stripe Dashboard → Developers → Webhooks
2. Clique em "Add endpoint"
3. Configure:
   - **Endpoint URL**: `https://seu-backend.com/api/stripe/webhook`
   - **Events to send**:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`

4. Copie o **Signing Secret** (começa com `whsec_...`)
5. Adicione ao seu `.env`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_seu_secret_aqui
   ```

## 🔄 Como Funciona Atualmente

1. **Usuário clica em "Começar 3 dias grátis"**
   - Abre modal com WebView do Stripe

2. **Usuário preenche dados de pagamento**
   - Tudo acontece dentro do app
   - Stripe processa o pagamento

3. **Pagamento aprovado**
   - Stripe redireciona para `/success`
   - App detecta a URL de sucesso
   - Mostra alerta de confirmação
   - Redireciona para tela de autenticação

4. **Pagamento cancelado**
   - Stripe redireciona para `/cancel`
   - App fecha o modal
   - Usuário volta para tela de planos

## 📱 Detecção de Sucesso

O app detecta sucesso quando a URL contém:
- `/success`
- `/payment-success`
- `/checkout/success`

Você pode personalizar isso editando a função `handleWebViewNavigationStateChange` em `app/paywall.tsx`.

## 🚀 Próximos Passos (Opcional)

### Para Produção Completa:

1. **Validação Backend**
   - Criar endpoint webhook
   - Validar assinatura do Stripe
   - Salvar status da assinatura no banco de dados
   - Atualizar perfil do usuário

2. **Gerenciamento de Assinatura**
   - Criar tela para cancelar assinatura
   - Mostrar status da assinatura no perfil
   - Implementar renovação automática
   - Gerenciar período de teste

3. **Segurança**
   - Validar pagamentos no backend
   - Não confiar apenas no frontend
   - Verificar status da assinatura antes de liberar recursos premium

## 🔐 Variáveis de Ambiente Necessárias

Adicione ao seu `.env`:
```env
# Stripe Keys
STRIPE_PUBLISHABLE_KEY=pk_live_seu_key_aqui
STRIPE_SECRET_KEY=sk_live_seu_key_aqui
STRIPE_WEBHOOK_SECRET=whsec_seu_secret_aqui

# URLs
PAYMENT_SUCCESS_URL=https://seu-dominio.com/payment-success
PAYMENT_CANCEL_URL=https://seu-dominio.com/paywall
```

## 📞 Suporte

Se tiver dúvidas sobre a configuração do Stripe:
- Documentação: https://stripe.com/docs
- Dashboard: https://dashboard.stripe.com
- Suporte: https://support.stripe.com
