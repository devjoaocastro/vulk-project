# Grok Coder Integration Setup

Este guia explica como configurar e usar o Grok Coder (X.AI) na aplicação.

## 🚀 Configuração Inicial

### 1. Obter API Key da X.AI

1. Acesse [console.x.ai](https://console.x.ai)
2. Registre-se usando seu email, conta do X (Twitter) ou Google
3. Vá para "API Keys" no painel de desenvolvedor
4. Clique em "New Key" para gerar uma nova chave
5. **IMPORTANTE**: Copie e armazene a chave em local seguro (não será exibida novamente)

### 2. Configurar Variáveis de Ambiente

Adicione a seguinte variável ao seu arquivo `.env.local`:

```bash
XAI_API_KEY=your_xai_api_key_here
```

### 3. Verificar Configuração

Acesse `/test-grok` na aplicação para testar a conexão.

## 📋 Modelos Disponíveis

### Grok Code Fast 1 (`grok-code-fast-1`)
- **Descrição**: Modelo rápido e eficiente para desenvolvimento
- **Capacidades**: Código, resposta rápida, geral
- **Uso**: Ideal para tarefas de codificação simples e rápidas

### Grok 2 (`grok-2`)
- **Descrição**: Modelo avançado de propósito geral com capacidades de codificação
- **Capacidades**: Código, raciocínio complexo, geral, resposta rápida
- **Uso**: Ideal para tarefas complexas e análise de código

### Grok Beta (`grok-beta`)
- **Descrição**: Versão beta com recursos mais recentes
- **Capacidades**: Código, raciocínio complexo, geral, resposta rápida
- **Uso**: Para experimentar novos recursos

### Grok 2 Vision (`grok-2-vision`)
- **Descrição**: Modelo com capacidades de visão para análise de imagens
- **Capacidades**: Código, análise de imagem, raciocínio complexo, geral
- **Uso**: Para tarefas que envolvem análise de imagens e código

## 🔧 Uso da API

### Endpoint Principal

```
POST /api/grok
```

### Parâmetros

```json
{
  "model": "grok-code-fast-1",
  "prompt": "Create a React component for a todo list",
  "max_tokens": 4000,
  "temperature": 0.3,
  "stream": false
}
```

### Resposta

```json
{
  "success": true,
  "model": "grok-code-fast-1",
  "content": "// Generated code here...",
  "usage": {
    "prompt_tokens": 50,
    "completion_tokens": 200,
    "total_tokens": 250
  },
  "finish_reason": "stop"
}
```

## 🎯 Hook React

### useGrokCoder

```typescript
import { useGrokCoder, createGrokPrompt } from '@/hooks/useGrokCoder';

function MyComponent() {
  const { generateCode, isLoading, error, response } = useGrokCoder();

  const handleGenerate = async () => {
    const result = await generateCode({
      model: 'grok-code-fast-1',
      prompt: createGrokPrompt('Create a login form', {
        language: 'TypeScript',
        framework: 'React',
        requirements: ['Use hooks', 'Add validation']
      }),
      max_tokens: 2000,
      temperature: 0.3,
      stream: false
    });
  };

  return (
    <div>
      <button onClick={handleGenerate} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Code'}
      </button>
      {response?.content && (
        <pre>{response.content}</pre>
      )}
    </div>
  );
}
```

## 🔄 Streaming

Para respostas em tempo real:

```typescript
const result = await generateCode({
  model: 'grok-code-fast-1',
  prompt: 'Create a complex React component',
  stream: true
});

// O hook automaticamente atualiza streamContent durante a geração
```

## 🛠️ Integração com Sistema Existente

### 1. Adicionar ao ModelSelector

Os modelos Grok já estão integrados no dropdown de modelos da homepage.

### 2. Usar no Sistema de Geração

O Grok Coder pode ser usado através do sistema de orquestração existente:

```typescript
// No orchestrator.ts, o Grok será automaticamente selecionado
// quando o usuário escolher um modelo xai:grok-* no dropdown
```

### 3. Configuração de Preferências

No `config.ts`, os modelos Grok são priorizados para geração de código:

```typescript
code_generation: {
  model_preference: [
    "grok-2",
    "grok-beta", 
    "gemini-2.5-pro",
    // ...
  ]
}
```

## 🧪 Testando

### 1. Página de Teste

Acesse `/test-grok` para testar a integração completa.

### 2. Teste de Conexão

```typescript
const { testConnection } = useGrokCoder();
const isConnected = await testConnection();
```

### 3. Health Check

```
GET /api/grok
```

Retorna status da conexão e modelos disponíveis.

## 🚨 Troubleshooting

### Erro: "XAI_API_KEY environment variable is required"

- Verifique se a variável está definida no `.env.local`
- Reinicie o servidor de desenvolvimento
- Verifique se o arquivo `.env.local` está na raiz do projeto

### Erro: "Failed to connect to X.AI API"

- Verifique se a API key está correta
- Confirme se a conta X.AI está ativa
- Verifique se há créditos disponíveis na conta

### Erro: "Invalid model"

- Use apenas os modelos listados em `GROK_MODELS`
- Verifique se o modelo está disponível na sua conta

## 📊 Monitoramento

### Logs

Todos os requests são logados com prefixo `[XAI_API]` e `[GROK_HOOK]`:

```
🚀 [XAI_API] Making completion request: { model: "grok-code-fast-1", ... }
✅ [XAI_API] Completion successful: { model: "grok-code-fast-1", ... }
```

### Métricas

O hook `useGrokCoder` fornece informações de uso:

```typescript
{
  usage: {
    prompt_tokens: 50,
    completion_tokens: 200,
    total_tokens: 250
  }
}
```

## 🔒 Segurança

- **Nunca** commite a API key no código
- Use variáveis de ambiente para todas as chaves
- Monitore o uso da API para evitar custos inesperados
- Implemente rate limiting se necessário

## 💡 Dicas de Uso

1. **Para código simples**: Use `grok-code-fast-1`
2. **Para tarefas complexas**: Use `grok-2` ou `grok-beta`
3. **Para análise de imagens**: Use `grok-2-vision`
4. **Para streaming**: Ative `stream: true` para respostas em tempo real
5. **Para prompts otimizados**: Use `createGrokPrompt()` helper

## 📚 Recursos Adicionais

- [Documentação X.AI](https://docs.x.ai)
- [Console X.AI](https://console.x.ai)
- [Grok Code Fast Documentation](https://docs.x.ai/docs/guides/grok-code-prompt-engineering)
