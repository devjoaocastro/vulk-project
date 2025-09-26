# 🚀 Quick OAuth Setup - K0D Platform

## ❌ **Problema Atual:**
O botão "Connect" não funciona porque as variáveis de ambiente OAuth não estão configuradas.

## ✅ **Solução Rápida:**

### 1. **Adiciona estas variáveis ao `.env.local`:**

```bash
# OAuth Providers
VERCEL_CLIENT_ID=your_vercel_client_id
VERCEL_CLIENT_SECRET=your_vercel_client_secret

NETLIFY_CLIENT_ID=your_netlify_client_id  
NETLIFY_CLIENT_SECRET=your_netlify_client_secret

CLOUDFLARE_CLIENT_ID=your_cloudflare_client_id
CLOUDFLARE_CLIENT_SECRET=your_cloudflare_client_secret

# Base URLs
NEXTAUTH_URL=http://localhost:3000
```

### 2. **Como obter as credenciais:**

#### **Vercel:**
1. Vai a [Vercel Dashboard](https://vercel.com/dashboard)
2. Settings → OAuth Apps → Create New OAuth App
3. **Callback URL**: `http://localhost:3000/api/oauth/callback/vercel`
4. Copia Client ID e Client Secret

#### **Netlify:**
1. Vai a [Netlify Dashboard](https://app.netlify.com/user/applications)
2. Create New Application
3. **Redirect URI**: `http://localhost:3000/api/oauth/callback/netlify`
4. Copia Client ID e Client Secret

#### **Cloudflare:**
1. Vai a [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Create Token
3. **Redirect URI**: `http://localhost:3000/api/oauth/callback/cloudflare`
4. Copia Client ID e Client Secret

### 3. **Reinicia o servidor:**
```bash
pnpm run dev
```

### 4. **Testa a conexão:**
- Clica no botão "Connect" de qualquer provider
- Deve redirecionar para o provider para autorização
- Após autorizar, volta automaticamente para o K0D

## 🔍 **Debug:**

Se ainda não funcionar, verifica:
1. **Console do browser** - erros de rede
2. **Terminal** - logs do servidor
3. **Variáveis de ambiente** - se estão carregadas

## 📝 **Nota:**
- **Desenvolvimento**: Usa `localhost:3000`
- **Produção**: Atualiza URLs para o teu domínio
- **Segurança**: Nunca commites o `.env.local`
