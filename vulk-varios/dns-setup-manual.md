# 🌐 Configuração Manual DNS - vulk.host

## 🎯 **INSTRUÇÕES PRECISAS:**

### **1. Aceder ao DNS:**
- Ir para: https://hpanel.hostinger.com/domain/vulk.host/dns?tab=dns_records
- Clicar em **"DNS/Nameservers"**

### **2. ELIMINAR registros incorretos:**
- ❌ **Eliminar**: `ALIAS @` → `vulk.host.cdn.hstgr.net`
- ❌ **Eliminar**: `CNAME www` → `149.248.196.151` (se existir)

### **3. ADICIONAR registros A corretos:**

#### **Registro 1 - Domínio principal:**
- Clicar **"Adicionar registo"**
- **Tipo**: `A`
- **Nome**: `@`
- **Alvo**: `149.248.196.151`
- **TTL**: `14400`
- Clicar **"Adicionar registo"**

#### **Registro 2 - www:**
- Clicar **"Adicionar registo"**
- **Tipo**: `A`
- **Nome**: `www`
- **Alvo**: `149.248.196.151`
- **TTL**: `14400`
- Clicar **"Adicionar registo"**

#### **Registro 3 - Wildcard (já existe, verificar):**
- **Tipo**: `A`
- **Nome**: `*`
- **Alvo**: `149.248.196.151`
- **TTL**: `14400`

### **4. RESULTADO FINAL:**
```
A    @    -    149.248.196.151    14400
A    www  -    149.248.196.151    14400
A    *    -    149.248.196.151    14400
```

### **5. VERIFICAR:**
```bash
nslookup vulk.host
nslookup www.vulk.host
nslookup test.vulk.host
```

## ⏱️ **TEMPO DE PROPAGAÇÃO:**
- **TTL**: 4 horas
- **Propagação**: 1-4 horas
- **Teste**: Aguardar 30 minutos e testar

## 🎯 **APÓS CONFIGURAÇÃO:**
Todos os subdomínios funcionarão:
- `https://vulk.host`
- `https://www.vulk.host`
- `https://app1.vulk.host`
- `https://portfolio.vulk.host`
