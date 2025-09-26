# 🌐 VULK® WebContainer Port Management System

## 📋 **Como Funciona o Sistema de Portas**

### **🎯 Estratégia: Port Pooling Inteligente**

**Problema**: Com 1M de projetos, não podemos ter 1M de portas diferentes.

**Solução**: Pool de 100 portas (3001-3100) com gestão inteligente.

---

## 🔧 **Arquitetura do Sistema**

### **Portas Reservadas:**
- **3000**: VULK.dev (Site Principal)
- **3001-3100**: Pool de WebContainer Projects (100 portas)

### **Estados dos Projetos:**
1. **`initializing`** - Projeto sendo criado
2. **`ready`** - Projeto criado, pronto para executar
3. **`running`** - Servidor dev ativo na porta
4. **`sleeping`** - Projeto inativo (porta liberada para reuso)
5. **`error`** - Erro no projeto

---

## ⚡ **Funcionamento Inteligente**

### **1. Criação de Projeto:**
```typescript
// Busca projeto inativo primeiro
const inactiveProject = findInactiveProject();
if (inactiveProject) {
  // Reutiliza porta do projeto inativo
  return inactiveProject.port;
}

// Se não há inativos, usa próxima porta disponível
const port = getNextAvailablePort(); // 3001, 3002, 3003...
```

### **2. Gestão de Recursos:**
- **Projetos ativos**: Mantêm servidor rodando
- **Projetos inativos**: Servidor parado, porta liberada
- **Timeout**: 30 minutos de inatividade = projeto vai "dormir"

### **3. Reutilização de Portas:**
```typescript
// Projeto A (inativo há 35 min) → Porta 3001 liberada
// Projeto B (novo) → Reutiliza porta 3001
// Projeto A (reativado) → Pode usar porta 3002
```

---

## 📊 **Capacidade do Sistema**

### **Limites Teóricos:**
- **Projetos simultâneos**: 100 (uma por porta)
- **Projetos totais**: Ilimitados (ficam "dormindo")
- **Reutilização**: Portas são reutilizadas automaticamente

### **Cenários Reais:**
- **100 users ativos**: Todos com servidor rodando
- **10,000 users totais**: 9,900 projetos "dormindo"
- **Novo user**: Reutiliza porta de projeto inativo

---

## 🚀 **Exemplo Prático**

### **Cenário: 5 Projetos**

```
Projeto A (User1) → Porta 3001 → Ativo (servidor rodando)
Projeto B (User2) → Porta 3002 → Ativo (servidor rodando)  
Projeto C (User3) → Porta 3003 → Dormindo (inativo 45 min)
Projeto D (User4) → Porta 3004 → Ativo (servidor rodando)
Projeto E (User5) → Porta 3005 → Dormindo (inativo 20 min)
```

### **Novo User6 chega:**
```
Projeto C → Reutiliza porta 3003 (era do User3 inativo)
User6 → Porta 3003 → Ativo (servidor rodando)
```

### **User3 volta:**
```
User3 → Porta 3006 → Novo projeto (porta 3006)
```

---

## 🎯 **Vantagens do Sistema**

### **✅ Escalabilidade:**
- Suporta milhões de projetos
- Apenas 100 portas necessárias
- Reutilização automática

### **✅ Performance:**
- Projetos inativos não consomem recursos
- Ativação rápida (reutiliza porta)
- Limpeza automática

### **✅ Economia:**
- Menos recursos de servidor
- Portas otimizadas
- Gestão inteligente

---

## 🔮 **Futuras Melhorias**

### **1. Subdomains (Escalável):**
```
project-abc123.vulk.dev → Porta interna
project-def456.vulk.dev → Porta interna
```

### **2. Path-based Routing:**
```
vulk.dev/project/abc123 → Proxy para porta
vulk.dev/project/def456 → Proxy para porta
```

### **3. Load Balancing:**
```
Múltiplos servidores VULK
Distribuição automática de projetos
```

---

## 📈 **Métricas do Sistema**

```typescript
const stats = webContainer.getProjectStats();
// {
//   total: 1250,        // Total de projetos criados
//   active: 45,         // Projetos com servidor ativo
//   sleeping: 1205,     // Projetos inativos
//   portsUsed: 45,      // Portas em uso
//   portsAvailable: 55  // Portas disponíveis
// }
```

---

## 🎉 **Conclusão**

O sistema de **Port Pooling** permite:
- **1M+ projetos** com apenas **100 portas**
- **Gestão automática** de recursos
- **Reutilização inteligente** de portas
- **Escalabilidade infinita** para projetos

**Resultado**: VULK pode suportar milhões de usuários com recursos mínimos! 🚀
