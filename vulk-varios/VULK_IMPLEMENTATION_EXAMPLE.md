# VULK Implementation Example

Este documento demonstra como usar o sistema VULK implementado conforme o README.md.

## 🚀 Inicialização do Sistema

```typescript
import { VULKSystem } from '@/lib/vulk-system';

// Configurar o sistema VULK
const vulkSystem = VULKSystem.getInstance({
  enableRAGG: true,
  enableStackBlitz: true,
  enableLearning: true,
  defaultDeployer: 'flyio',
  maxRetries: 3,
  timeout: 300000
});
```

## 📝 Criação de Projeto

```typescript
// Criar um novo projeto
const project = await vulkSystem.createProject(
  "Cria uma aplicação de e-commerce com Next.js, Tailwind CSS e Prisma",
  "E-commerce VULK"
);

console.log('Projeto criado:', project.id);
```

## 🔄 Execução do Projeto

```typescript
// Executar o projeto completo
const result = await vulkSystem.executeProject(project.id);

if (result.success) {
  console.log('Projeto gerado com sucesso!');
  console.log('Ficheiros gerados:', result.files.length);
  console.log('Eventos processados:', result.events.length);
} else {
  console.error('Erro na geração:', result.error);
}
```

## 🚀 Deploy do Projeto

```typescript
// Deploy para Fly.io
const deploymentUrl = await vulkSystem.deployProject(project.id, 'flyio');
console.log('Projeto deployado em:', deploymentUrl);
```

## 📊 Monitorização

```typescript
// Obter estatísticas do sistema
const stats = vulkSystem.getSystemStats();
console.log('Estatísticas:', stats);

// Listar todos os projetos
const projects = vulkSystem.listProjects();
console.log('Projetos:', projects);
```

## 🎯 Uso com Agentes Específicos

```typescript
import { PlanningAgent } from '@/lib/agents/planning-agent';
import { ComponentAgent } from '@/lib/agents/component-agent';

// Usar agente de planeamento
const planningAgent = new PlanningAgent('correlation_id');
const planningResult = await planningAgent.execute(userInput);

// Usar agente de componentes
const componentAgent = new ComponentAgent('correlation_id');
const componentResult = await componentAgent.execute(requirements);
```

## 🔍 Sistema RAGG

```typescript
import { RAGGSystem } from '@/lib/ragg/ragg-system';

const raggSystem = RAGGSystem.getInstance();

// Buscar conhecimento contextual
const context = await raggSystem.searchContextualKnowledge(
  'e-commerce components',
  5
);

console.log('Contexto encontrado:', context.results.length);
```

## 📡 Processamento de Eventos

```typescript
import { ImprovedAIExtractor } from '@/lib/parsers/improved-ai-extractor';

const extractor = ImprovedAIExtractor.getInstance();

// Extrair conteúdo estruturado da resposta da IA
const result = await extractor.extractStructuredContent(
  aiResponse,
  'correlation_id'
);

// Processar eventos em tempo real
await vulkSystem.processEvents(result.events);
```

## 🎨 Chat Avançado

```typescript
import { AdvancedChatSystem } from '@/components/chat/advanced-chat-system';

// Usar o sistema de chat avançado
<AdvancedChatSystem
  messages={messages}
  onSendMessage={handleSendMessage}
  onEventClick={handleEventClick}
  isProcessing={isProcessing}
  projectStatus={projectStatus}
/>
```

## 🔧 Configuração Avançada

```typescript
// Configuração personalizada do orquestrador
const orchestrator = VULKOrchestrator.getInstance({
  enableStackBlitz: true,
  enableRealTimeEvents: true,
  enableLearning: true,
  maxRetries: 5,
  timeout: 600000
});

// Configuração do deployer Fly.io
const flyioDeployer = FlyioDeployer.getInstance();
const deployment = await flyioDeployer.deployProject(projectCode, {
  appName: 'vulk-app',
  region: 'lhr',
  memory: '512mb',
  cpu: 'shared-cpu-2x',
  env: {
    NODE_ENV: 'production',
    DATABASE_URL: 'postgresql://...'
  },
  healthCheck: {
    path: '/health',
    interval: 10,
    timeout: 2
  }
});
```

## 📈 Fluxo Completo de Exemplo

```typescript
async function createEcommerceProject() {
  try {
    // 1. Inicializar sistema
    const vulkSystem = VULKSystem.getInstance();
    
    // 2. Criar projeto
    const project = await vulkSystem.createProject(
      "Cria uma aplicação de e-commerce completa com Next.js, Tailwind CSS, Prisma e autenticação",
      "E-commerce VULK"
    );
    
    // 3. Executar geração
    console.log('Iniciando geração do projeto...');
    const result = await vulkSystem.executeProject(project.id);
    
    if (result.success) {
      console.log('✅ Projeto gerado com sucesso!');
      console.log(`📁 Ficheiros: ${result.files.length}`);
      console.log(`📡 Eventos: ${result.events.length}`);
      
      // 4. Deploy
      console.log('🚀 Iniciando deploy...');
      const deploymentUrl = await vulkSystem.deployProject(project.id);
      console.log(`🌐 Projeto deployado: ${deploymentUrl}`);
      
      return {
        project,
        result,
        deploymentUrl
      };
    } else {
      throw new Error(`Erro na geração: ${result.error}`);
    }
    
  } catch (error) {
    console.error('❌ Erro no processo:', error);
    throw error;
  }
}

// Executar exemplo
createEcommerceProject()
  .then(result => {
    console.log('🎉 Projeto criado com sucesso!');
    console.log('URL:', result.deploymentUrl);
  })
  .catch(error => {
    console.error('💥 Erro:', error);
  });
```

## 🔍 Verificação de Status

```typescript
// Verificar status do projeto
const project = vulkSystem.getProject(projectId);
console.log('Status:', project?.status);

// Obter estatísticas
const stats = vulkSystem.getSystemStats();
console.log('📊 Estatísticas:', stats);
```

Este exemplo demonstra como usar o sistema VULK implementado conforme o README.md, incluindo todos os componentes principais: orquestração, agentes, RAGG, deployers e chat avançado.
