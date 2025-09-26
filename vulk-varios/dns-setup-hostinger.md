# 🌐 Configuração DNS na Hostinger para vulk.host

## 📋 **Informações Necessárias**

### **IP do Fly.io:**
- **IP Principal**: `149.248.196.151`
- **Tipo**: IPv4 público dedicado
- **Região**: Global

## 🔧 **Configuração na Hostinger**

### **Opção 1: Configuração A Record (Recomendada)**

1. **Aceder ao painel da Hostinger**
   - Login em `hpanel.hostinger.com`
   - Ir para "Domínios" → "vulk.host"

2. **Configurar DNS Records**
   ```
   Tipo: A
   Nome: @
   Valor: 149.248.196.151
   TTL: 3600 (1 hora)
   ```

   ```
   Tipo: A
   Nome: *
   Valor: 149.248.196.151
   TTL: 3600 (1 hora)
   ```

### **Opção 2: Configuração CNAME (Alternativa)**

Se a Hostinger não suportar wildcard A records:

1. **Configurar A Record principal**
   ```
   Tipo: A
   Nome: @
   Valor: 149.248.196.151
   TTL: 3600
   ```

2. **Configurar CNAME para subdomínios**
   ```
   Tipo: CNAME
   Nome: *
   Valor: vulk.host
   TTL: 3600
   ```

## 🚀 **Configuração Automática no Fly.io**

### **1. Configurar certificado SSL**
```bash
flyctl certs create vulk.host --app testapp3-1758508954914
```

### **2. Configurar wildcard certificate**
```bash
flyctl certs create "*.vulk.host" --app testapp3-1758508954914
```

### **3. Verificar configuração**
```bash
flyctl certs list --app testapp3-1758508954914
```

## 📝 **Configuração no Código**

### **Atualizar flyio-deployer.ts**
```typescript
// Configurar domínio personalizado
const customDomain = `${appName}.vulk.host`;

// Criar certificado SSL
await execAsync(`cd ${tempDir} && flyctl certs create ${customDomain} --app ${config.appName}`, {
    env: { ...process.env, FLY_API_TOKEN: process.env.FLY_API_TOKEN }
});

// Configurar DNS
await execAsync(`cd ${tempDir} && flyctl ips allocate-v4 --app ${config.appName} --yes`, {
    env: { ...process.env, FLY_API_TOKEN: process.env.FLY_API_TOKEN }
});
```

## ✅ **Verificação**

### **1. Testar domínio principal**
```bash
curl -I https://vulk.host
```

### **2. Testar subdomínio**
```bash
curl -I https://testapp3-1758508954914.vulk.host
```

### **3. Verificar DNS**
```bash
nslookup vulk.host
nslookup testapp3-1758508954914.vulk.host
```

## 🔄 **Processo Automático**

### **Para cada novo projeto:**
1. **Criar app no Fly.io** com nome único
2. **Configurar certificado SSL** para `{appName}.vulk.host`
3. **Deploy da aplicação**
4. **URL final**: `https://{appName}.vulk.host`

### **Exemplo de URLs geradas:**
- `https://landing-page-1234567890.vulk.host`
- `https://ecommerce-store-1234567890.vulk.host`
- `https://dashboard-app-1234567890.vulk.host`

## 🛠️ **Troubleshooting**

### **Problema: Subdomínio não resolve**
- Verificar se o wildcard A record está configurado
- Aguardar propagação DNS (até 24h)
- Verificar TTL (recomendado: 3600s)

### **Problema: SSL não funciona**
- Verificar se o certificado foi criado
- Aguardar validação SSL (até 10 minutos)
- Verificar se o domínio aponta para o IP correto

### **Problema: App não carrega**
- Verificar se a app está deployada
- Verificar logs: `flyctl logs --app {appName}`
- Verificar status: `flyctl status --app {appName}`

## 📊 **Monitoramento**

### **Verificar status dos apps**
```bash
flyctl apps list
flyctl status --app {appName}
```

### **Verificar certificados**
```bash
flyctl certs list --app {appName}
```

### **Verificar IPs**
```bash
flyctl ips list --app {appName}
```

## 🎯 **Resultado Final**

Após a configuração, todos os projetos gerados terão URLs automáticas:
- ✅ `https://{projectName}-{timestamp}.vulk.host`
- ✅ SSL automático
- ✅ Subdomínios ilimitados
- ✅ Deploy automático
- ✅ Monitoramento integrado
