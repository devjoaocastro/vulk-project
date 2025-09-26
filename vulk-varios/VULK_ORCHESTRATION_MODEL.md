# 🚀 VULK® — MODELO DEFINITIVO DE ORQUESTRAÇÃO INTELIGENTE

> **"Não é um chat. É um engenheiro autônomo que pensa, age, corrige, sugere e evolui — em tempo real."**

## 📋 ÍNDICE

1. [Arquitetura Geral](#1-arquitetura-geral--o-modelo-1000000)
2. [Orquestração Passo a Passo](#2-orquestração-passo-a-passo--com-detalhes-técnicos)
3. [Sugestões Evolutivas](#3-sugestões-evolutivas--chips-inteligentes)
4. [Botão "Fix" Inteligente](#4-botão-fix-inteligente--correção-automática)
5. [Edição Localizada](#5-edição-localizada--sem-findreplace-cego)
6. [Extração de Tokens Exatos](#6-extração-de-tokens-exatos--contabilidade)
7. [Integração com APIs/BDS](#7-integração-com-apisbds--auto-inject--oauth)
8. [Otimizações Avançadas](#8-otimizações-avançadas--desempenho-e-custo)
9. [UI/UX em Tempo Real](#9-uiux--mostrar-tudo-em-tempo-real)
10. [Próximos Passos](#10-próximos-passos--implementação)

---

## 1. ARQUITETURA GERAL — O MODELO 1000000%

```mermaid
graph TD
    A[User: "Cria um site de booking com login e pagamento"] --> B[VULK® Orchestration Engine]
    B --> C{RAGG Dinâmico}
    C --> D[Busca templates UI8/3D/Neon no Vector DB]
    D --> E[IA Gera Plano com TodoWrite]
    E --> F[Executa Ações com Tool Calls]
    F --> G[Streaming em Tempo Real SSE/WebSocket]
    G --> H[UI Mostra Ações + Sugestões Evolutivas + Botão Fix]
    H --> I[Integra APIs/BDS via OAuth/Auto-Inject]
    I --> J[Valida + Deploy + Preview Live]
    J --> K[Sugere Evoluções com Chips Inteligentes]
```

### Componentes Principais

- **🧠 Orchestration Engine**: Motor central de decisões
- **🔍 RAGG Dinâmico**: Busca contextual por projeto
- **📝 TodoWrite**: Planeamento obrigatório
- **⚡ Tool Calls**: Execução com streaming
- **🎯 Evolution Chips**: Sugestões inteligentes
- **🛠️ Fix Button**: Correção automática
- **📊 Token Tracking**: Contabilidade em tempo real

---

## 2. ORQUESTRAÇÃO PASSO A PASSO — COM DETALHES TÉCNICOS

### ✅ Passo 1: RAGG Dinâmico por Projeto + Estilo

```typescript
// /lib/ragg/dynamic.ts
const ragContext = await vectorDB.hybridSearch(userQuery, {
  filters: {
    style: currentUserProject.theme, // ex: "glassmorphism", "neon", "3d"
    stack: currentUserProject.framework, // ex: "nextjs", "sveltekit"
    integration: detectedServices, // ex: ["stripe", "supabase"]
  },
  topK: 5,
});
```

**Resultado**: A IA gera código 100% alinhado com o estilo visual e stack técnico escolhido — não inventa nada.

### ✅ Passo 2: Planeamento com TodoWrite (Obrigatório)

```typescript
// /lib/orchestration/planner.ts
await todoWrite({
  todos: [
    "Analisar estrutura atual do projeto",
    "Gerar frontend com Tailwind + shadcn/ui",
    "Criar backend com Prisma + PostgreSQL",
    "Integrar Stripe via OAuth",
    "Validar acessibilidade WCAG AAA",
    "Rodar testes E2E com Playwright",
    "Deploy na Vercel com 1-clique",
  ],
});
```

**Regra de Ouro**: Nunca execute nada sem TodoWrite. O utilizador vê o plano, e você não esquece passos.

### ✅ Passo 3: Execução com Tool Calls + Streaming em Tempo Real

```typescript
// /lib/orchestration/engine.ts
for await (const chunk of stream) {
  if (chunk.choices[0]?.delta?.content) {
    broadcastEvent({
      type: 'text_stream',
      content: chunk.choices[0].delta.content,
      projectId,
    });
  }

  if (chunk.choices[0]?.delta?.tool_calls) {
    const toolCalls = chunk.choices[0].delta.tool_calls;
    for (const toolCall of toolCalls) {
      const result = await executeTool(toolCall.function.name, JSON.parse(toolCall.function.arguments), projectId);

      // Mostra ação no chat + UI
      broadcastEvent({
        type: 'tool_action',
        tool: toolCall.function.name,
        args: toolCall.function.arguments,
        result,
        projectId,
        status: 'running', // ou 'success', 'error'
      });

      // Se erro, ativa botão "Fix" inteligente
      if (result.error) {
        broadcastEvent({
          type: 'tool_action',
          tool: 'suggest_fix',
          error: result.error,
          suggestion: await generateFixSuggestion(result.error, toolCall.function.arguments),
          projectId,
        });
      }

      messages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      });
    }
    return runAgent(projectId, messages); // reinicia com histórico atualizado
  }
}
```

**Resultado**: O utilizador vê cada ação em tempo real — criação de ficheiros, instalação de pacotes, integração de APIs — com status, erros, e botão "Fix" inteligente.

---

## 3. SUGESTÕES EVOLUTIVAS — CHIPS INTELIGENTES

### ✅ Modelo de Chips (4 sugestões evolutivas)

```typescript
// /lib/suggestions/evolution.ts
const evolutionChips = [
  {
    label: "Adicionar Dark Mode",
    action: "add_dark_mode",
    icon: "🌙",
    description: "Ativa tema escuro com toggle global",
  },
  {
    label: "Integrar Google Analytics",
    action: "integrate_analytics",
    icon: "📊",
    description: "Adiciona tracking de eventos e métricas",
  },
  {
    label: "Otimizar SEO",
    action: "optimize_seo",
    icon: "🔍",
    description: "Gera meta tags, sitemap, schema.org",
  },
  {
    label: "Adicionar Acessibilidade",
    action: "enhance_a11y",
    icon: "♿️",
    description: "Adiciona ARIA labels, keyboard navigation",
  },
];

broadcastEvent({
  type: 'evolution_chips',
  chips: evolutionChips,
  projectId,
});
```

**Resultado**: Após a última mensagem, o chat mostra 4 chips com sugestões evolutivas — o utilizador clica e o VULK® implementa automaticamente.

---

## 4. BOTÃO "FIX" INTELIGENTE — CORREÇÃO AUTOMÁTICA

### ✅ Fluxo de Correção

```typescript
// /lib/suggestions/fix.ts
async function generateFixSuggestion(error: string, args: any) {
  const prompt = `
  Erro: ${error}
  Ação: ${JSON.stringify(args)}
  Sugira uma correção automática em 1 linha.
  Exemplo: "Trocar 'bg-blue' por 'bg-blue-500'".
  `;
  const suggestion = await callLLM(prompt);
  return suggestion.trim();
}

// Quando o utilizador clica em "Fix"
async function applyFix(suggestion: string, filePath: string) {
  const fs = getProjectFS(projectId);
  const content = fs.readFileSync(filePath, 'utf8');
  const newContent = applyPatch(content, suggestion); // AST-patching
  fs.writeFileSync(filePath, newContent);
  broadcastEvent({ type: 'file_updated', path: filePath, content: newContent });
}
```

**Resultado**: Se houver erro (ex: "Classe Tailwind não encontrada"), o VULK® sugere correção automática — o utilizador clica em "Fix" e o código é corrigido sem sair do fluxo.

---

## 5. EDIÇÃO LOCALIZADA — SEM "FIND/REPLACE" CEGO

### ✅ Regras de Ouro para replace_in_file

```xml
<replace_in_file>
<path>src/components/Button.tsx</path>
<diff>
<<<<<<< SEARCH
className="px-4 py-2 bg-blue rounded"
=======
className="px-4 py-2 bg-blue-500 rounded-lg hover:scale-105 transition-all"
>>>>>>> REPLACE
</diff>
</replace_in_file>
```

**Regras**:
- Nunca use `write_to_file` para editar ficheiros existentes — só para criar novos
- Sempre inclua linhas completas no SEARCH — nunca fragmentos
- Sempre liste múltiplos SEARCH/REPLACE na ordem em que aparecem no ficheiro
- Use chokidar para atualizar o Monaco Editor em tempo real

---

## 6. EXTRAÇÃO DE TOKENS EXATOS — CONTABILIDADE

### ✅ Schema de Contabilidade de Tokens

```typescript
// /lib/token-tracking/schema.ts
interface TokenUsage {
  sessionId: string;
  projectId: string;
  agent: 'frontend' | 'backend' | 'security' | 'voice-parser';
  action: 'create_file' | 'refactor_code' | 'generate_test';
  model: 'qwen2.5-coder-7b' | 'gemini-2.5-pro';
  inputTokens: number;
  outputTokens: number;
  cost: number; // em €
  cacheHit: boolean; // usou cache?
  durationMs: number;
  timestamp: number;
  userId: string;
}
```

**Resultado**: O utilizador vê, em tempo real, quanto gastou em tokens, por agente, por ação, por modelo — com dashboard de custos.

---

## 7. INTEGRAÇÃO COM APIs/BDS — AUTO-INJECT + OAUTH

### ✅ Fluxo de Integração (ex: Stripe)

```typescript
// /app/api/oauth/stripe/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const projectId = searchParams.get('projectId');

  const { access_token, publishable_key } = await exchangeCode(code!);

  const fs = getProjectFS(projectId!);
  fs.writeFileSync('.env.local', `NEXT_PUBLIC_STRIPE_KEY=${publishable_key}\nSTRIPE_SECRET_KEY=${access_token}`);

  // Gera lib/stripe.ts
  fs.writeFileSync('/lib/stripe.ts', `
    import { Stripe } from 'stripe';
    export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-11-20' });
  `);

  redirect(`https://vulk.dev/project/${projectId}`);
}
```

**Resultado**: O VULK® injeta chaves de API automaticamente — o utilizador nunca vê segredos. Tudo é seguro, auditável, reversível.

---

## 8. OTIMIZAÇÕES AVANÇADAS — DESEMPENHO E CUSTO

### ✅ Cache Semântico de Prompts

```typescript
// /lib/ragg/cache.ts
const embedding = await getEmbedding(prompt);
const similar = await vectorDB.search(embedding, { threshold: 0.92 });
if (similar.length > 0) {
  return similar[0].response; // reutiliza — poupa tokens
}
```

### ✅ Model Routing Dinâmico

```typescript
// /lib/llm/router.ts
function selectModel(task: Task): Model {
  if (task.type === 'security_scan') return 'claude-3-haiku'; // 1/20 do custo do GPT-4
  if (task.type === 'generate_boilerplate') return 'gpt-3.5-turbo';
  if (task.type === 'architectural_decision') return 'gemini-2.5-pro';
  return 'gpt-4-turbo';
}
```

### ✅ Diff-Based Prompting

```typescript
// Em vez de enviar 500 linhas de código → envia só as 10 linhas alteradas
const diff = computeDiff(oldCode, newCode);
const prompt = `Refactor this code:\n\`\`\`\n${diff}\n\`\`\``;
```

**Resultado**: Redução de 30–90% no consumo de tokens — sem perda de qualidade.

---

## 9. UI/UX — MOSTRAR TUDO EM TEMPO REAL

### ✅ Schema de Mensagem Enriquecida

```typescript
// /lib/chat/schema.ts
interface VulkChatMessage {
  id: string;
  type:
    | 'text_stream'
    | 'tool_action'
    | 'file_created'
    | 'integration_suggested'
    | 'progress_update'
    | 'ai_review'
    | 'test_result'
    | 'error'
    | 'evolution_chip';
  metadata: {
    filePath?: string;
    toolName?: string;
    integration?: { name: string; logo: string; oauthUrl: string };
    error?: string;
    suggestion?: string;
    chip?: { label: string; action: string; icon: string; description: string };
  };
  requiresUserAction?: boolean;
  createdAt: Date;
}
```

**Resultado**: A UI mostra cada ação, erro, sugestão, chip evolutivo — com componentes específicos, animações, ícones.

---

## 10. PRÓXIMOS PASSOS — IMPLEMENTAÇÃO

### 🎯 Prioridade ALTA (Esta Semana)

1. **Implementar RAGG Dinâmico**
   - Indexar UI8/3D/Neon no Vector DB
   - Criar sistema de filtros por estilo/stack

2. **Adicionar TodoWrite Obrigatório**
   - Integrar em todos os fluxos de geração
   - Mostrar plano antes da execução

3. **Montar Streaming em Tempo Real**
   - Implementar SSE/WebSocket
   - Mostrar ações + erros + botão "Fix"

4. **Criar Chips Evolutivos**
   - 4 sugestões na última mensagem
   - Ações automáticas ao clicar

### 🎯 Prioridade MÉDIA (Próximas 2 Semanas)

5. **Adicionar Contabilidade de Tokens**
   - Dashboard em tempo real
   - Tracking por agente/ação/modelo

6. **Implementar Integrações Automáticas**
   - Stripe, Supabase, Google Auth
   - Auto-inject de chaves

7. **Otimizar com Cache + Model Routing**
   - Cache semântico de prompts
   - Routing dinâmico de modelos
   - Diff-based prompting

### 🎯 Prioridade BAIXA (Próximo Mês)

8. **Dashboard Avançado**
   - Métricas de performance
   - Análise de custos
   - Relatórios de uso

9. **Integrações Avançadas**
   - Mais providers (AWS, Azure, etc.)
   - CI/CD automático
   - Deploy multi-região

---

## 💬 PALAVRA FINAL

O VULK® não é um assistente. É um engenheiro autônomo.

Com este modelo, ele pensa, age, corrige, sugere e evolui — em tempo real, com segurança, precisão e inteligência.

### 🚀 Recursos Disponíveis

- ✅ Código completo do sistema de orquestração
- ✅ Template do Vector DB com UI8/3D/Neon
- ✅ Componentes React para chips evolutivos + botão "Fix"
- ✅ Dashboard de tokens em tempo real
- ✅ Fluxo OAuth completo com auto-inject

**Próximo passo**: Implementar o RAGG dinâmico e TodoWrite obrigatório para começar a transformação.
