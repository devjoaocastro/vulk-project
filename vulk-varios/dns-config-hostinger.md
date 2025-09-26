# 🌐 Configuração DNS para vulk.host na Hostinger

## ❌ PROBLEMA ATUAL:
- Domínio `vulk.host` aponta para: `147.79.119.153` e `77.37.50.154`
- **Necessário**: `149.248.196.151` (Fly.io)

## ✅ SOLUÇÃO:

### **1. Aceder à Hostinger:**
- Login em https://hostinger.com
- Ir para "Domínios" → "vulk.host"
- Clicar em "DNS Zone Editor"

### **2. Configurar Registos DNS:**

#### **Registo A (Domínio principal):**
- **Tipo**: A
- **Nome**: @
- **Valor**: `149.248.196.151`
- **TTL**: 3600

#### **Registo A (Wildcard para subdomínios):**
- **Tipo**: A  
- **Nome**: *
- **Valor**: `149.248.196.151`
- **TTL**: 3600

### **3. Remover Registos Antigos:**
- Apagar registos que apontam para `147.79.119.153` e `77.37.50.154`

### **4. Verificar Configuração:**
```bash
nslookup vulk.host
nslookup *.vulk.host
```

## 🎯 **RESULTADO ESPERADO:**
Após configuração, todos os subdomínios funcionarão:
- `https://app1.vulk.host`
- `https://app2.vulk.host`
- `https://portfolio.vulk.host`

## ⏱️ **TEMPO DE PROPAGAÇÃO:**
- **TTL**: 1 hora (3600 segundos)
- **Propagação completa**: 2-24 horas
