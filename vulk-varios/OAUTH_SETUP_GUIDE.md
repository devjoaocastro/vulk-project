# OAuth Setup Guide - K0D Platform

## 🚀 Quick Setup for Deployment Services

Para ativar a funcionalidade de conexão automática OAuth, precisas configurar as variáveis de ambiente para cada provider.

### 📋 Variáveis Necessárias

Adiciona estas variáveis ao teu `.env.local`:

```bash
# Vercel OAuth
VERCEL_CLIENT_ID=your_vercel_client_id
VERCEL_CLIENT_SECRET=your_vercel_client_secret

# Netlify OAuth  
NETLIFY_CLIENT_ID=your_netlify_client_id
NETLIFY_CLIENT_SECRET=your_netlify_client_secret

# Cloudflare OAuth
CLOUDFLARE_CLIENT_ID=your_cloudflare_client_id
CLOUDFLARE_CLIENT_SECRET=your_cloudflare_client_secret

# OAuth Callback URLs
NEXTAUTH_URL=http://localhost:3000
OAUTH_REDIRECT_URI=http://localhost:3000/api/oauth/callback
```

### 🔧 Como Configurar Cada Provider

#### 1. **Vercel**
1. Vai a [Vercel Dashboard](https://vercel.com/dashboard)
2. Settings → OAuth Apps
3. Create New OAuth App
4. **Callback URL**: `http://localhost:3000/api/oauth/callback/vercel`
5. Copia Client ID e Client Secret

#### 2. **Netlify**
1. Vai a [Netlify Dashboard](https://app.netlify.com/user/applications)
2. Create New Application
3. **Redirect URI**: `http://localhost:3000/api/oauth/callback/netlify`
4. Copia Client ID e Client Secret

#### 3. **Cloudflare**
1. Vai a [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Create Token
3. **Redirect URI**: `http://localhost:3000/api/oauth/callback/cloudflare`
4. Copia Client ID e Client Secret

### 🎯 Funcionalidades Implementadas

✅ **Wizard de Conexão Automática**
- Botão "Connect" azul em cada provider
- Banner "Quick Setup Available"
- Estados visuais (loading, válido, inválido)
- Fallback para setup manual

✅ **Sistema OAuth Completo**
- APIs de conexão e callback
- Geração automática de tokens
- Validação de conexões
- Armazenamento seguro de credenciais

✅ **Interface Melhorada**
- Design limpo e profissional
- Feedback visual claro
- Transições suaves
- Suporte dark/light mode

### 🚀 Como Usar

1. **Configura as variáveis de ambiente** (acima)
2. **Reinicia o servidor** (`pnpm run dev`)
3. **Abre o modal Deploy** na página da UI
4. **Clica "Connect"** no provider desejado
5. **Autoriza a aplicação** no provider
6. **Deploy automático** - sem tokens manuais!

### 🔍 Debug

Se algo não funcionar:
1. Verifica as variáveis de ambiente
2. Confirma as URLs de callback nos providers
3. Verifica o console do browser para erros
4. Testa a conexão manual primeiro

### 📝 Notas

- **Desenvolvimento**: Usa `localhost:3000`
- **Produção**: Atualiza URLs para o teu domínio
- **Segurança**: Nunca commites as variáveis de ambiente
- **Tokens**: São armazenados de forma segura na base de dados
