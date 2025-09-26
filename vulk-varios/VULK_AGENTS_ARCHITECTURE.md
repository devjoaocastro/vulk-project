# 🤖 VULK AGENTS ARCHITECTURE

## 📋 **VISÃO GERAL DOS AGENTES VULK**

O sistema VULK utiliza uma arquitetura de **agentes especializados** que trabalham em conjunto para gerar projetos completos. Cada agente tem uma função específica e comunica-se através de eventos estruturados.

## 🏗️ **ARQUITETURA DE AGENTES**

### **1. Agente Base (VulkAgent)**
```typescript
abstract class VulkAgent {
  protected correlationId: string;
  protected onEvent?: (event: VulkEvent) => void;
  
  // Método abstrato que cada agente implementa
  abstract execute(prompt: string, ...args: any[]): Promise<AgentResponse>;
  
  // Comunicação com IA (OpenRouter)
  protected async callAI(prompt: string, systemPrompt: string): Promise<string>;
}
```

### **2. Agentes Especializados**

#### **🎯 ProjectPlannerAgent**
```typescript
class ProjectPlannerAgent extends VulkAgent {
  // Função: Analisa requisitos e cria estrutura do projeto
  // Input: Prompt do utilizador
  // Output: Estrutura do projeto, tech stack, arquitetura
  // Eventos: PlanningEvent
}
```

#### **🧩 ComponentGeneratorAgent**
```typescript
class ComponentGeneratorAgent extends VulkAgent {
  // Função: Gera componentes React/Next.js
  // Input: Nome do componente, prompt, caminho do ficheiro
  // Output: Código TypeScript React completo
  // Eventos: ComponentEvent
}
```

#### **📄 PageGeneratorAgent**
```typescript
class PageGeneratorAgent extends VulkAgent {
  // Função: Gera páginas Next.js
  // Input: Nome da página, prompt, caminho do ficheiro
  // Output: Código Next.js App Router
  // Eventos: PageEvent
}
```

#### **🎨 StyleGeneratorAgent**
```typescript
class StyleGeneratorAgent extends VulkAgent {
  // Função: Gera estilos CSS/Tailwind
  // Input: Nome do estilo, prompt, caminho do ficheiro
  // Output: CSS/Tailwind configurado
  // Eventos: StyleEvent
}
```

#### **⚙️ ConfigGeneratorAgent**
```typescript
class ConfigGeneratorAgent extends VulkAgent {
  // Função: Gera ficheiros de configuração
  // Input: Nome da config, prompt, caminho do ficheiro
  // Output: Configurações (next.config.js, tailwind.config.js, etc.)
  // Eventos: ConfigEvent
}
```

#### **🔗 IntegrationAgent**
```typescript
class IntegrationAgent extends VulkAgent {
  // Função: Integra todos os componentes
  // Input: Lista de ficheiros gerados
  // Output: Projeto integrado e funcional
  // Eventos: IntegrationEvent
}
```

#### **🔍 ReviewAgent**
```typescript
class ReviewAgent extends VulkAgent {
  // Função: Revisa qualidade do código
  // Input: Código gerado, caminho do ficheiro
  // Output: Análise de qualidade, sugestões
  // Eventos: ReviewEvent
}
```

## 🧠 **RAGG COMO AGENTE ESPECIALIZADO**

### **O que é RAGG?**
**RAGG (Retrieval-Augmented Generation)** é um agente especializado que:
- **Indexa conhecimento** de templates, sites e componentes
- **Recupera informação** relevante baseada em queries
- **Aumenta a geração** com conhecimento específico
- **Funciona como memória** do sistema VULK

### **RAGG Agent Architecture**
```typescript
class RAGGAgent extends VulkAgent {
  // Função: Fornece conhecimento contextual
  // Input: Query do utilizador, contexto do projeto
  // Output: Templates relevantes, exemplos, padrões
  // Eventos: RAGGEvent
}
```

### **Componentes RAGG**

#### **1. SiteIndexer**
```typescript
class SiteIndexer {
  // Função: Indexa sites e extrai componentes visuais
  // Processo:
  // 1. Navega para o site
  // 2. Extrai componentes visuais
  // 3. Extrai CSS e JavaScript
  // 4. Captura screenshots
  // 5. Gera embedding semântico
  // 6. Salva no Vector DB
}
```

#### **2. VisualCodeGenerator**
```typescript
class VisualCodeGenerator {
  // Função: Gera código baseado em templates visuais
  // Processo:
  // 1. Recebe query do utilizador
  // 2. Busca templates similares
  // 3. Extrai padrões visuais
  // 4. Gera código React/Next.js
  // 5. Aplica estilos e animações
}
```

#### **3. SimpleSiteIndexer**
```typescript
class SimpleSiteIndexer {
  // Função: Indexação simplificada para desenvolvimento
  // Processo:
  // 1. Indexa templates fornecidos
  // 2. Gera embeddings semânticos
  // 3. Busca templates similares
  // 4. Fornece conhecimento contextual
}
```

## 🔄 **FLUXO DE COMUNICAÇÃO ENTRE AGENTES**

### **1. Orquestração Central**
```
ProjectOrchestrator
    │
    ├── ProjectPlannerAgent (análise inicial)
    │
    ├── RAGGAgent (fornece conhecimento)
    │
    ├── ComponentGeneratorAgent (gera componentes)
    │
    ├── PageGeneratorAgent (gera páginas)
    │
    ├── StyleGeneratorAgent (gera estilos)
    │
    ├── ConfigGeneratorAgent (gera configurações)
    │
    ├── IntegrationAgent (integra tudo)
    │
    └── ReviewAgent (revisa qualidade)
```

### **2. Eventos de Comunicação**
```typescript
// Cada agente emite eventos estruturados
interface VulkEvent {
  type: 'planning' | 'component' | 'page' | 'style' | 'config' | 'integration' | 'review';
  status: 'generating' | 'completed' | 'error';
  data: any;
  timestamp: Date;
}
```

### **3. Sistema de Eventos**
```typescript
// Eventos específicos por agente
PlanningEvent → ProjectPlannerAgent
ComponentEvent → ComponentGeneratorAgent
PageEvent → PageGeneratorAgent
StyleEvent → StyleGeneratorAgent
ConfigEvent → ConfigGeneratorAgent
IntegrationEvent → IntegrationAgent
ReviewEvent → ReviewAgent
RAGGEvent → RAGGAgent
```

## 🎯 **COMO OS AGENTES ENTRAM NO PROJETO**

### **1. Entrada do Utilizador**
```
User Input: "Create an e-commerce platform"
    │
    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           PROJECT ORCHESTRATOR                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│ 1. Recebe prompt do utilizador                                                 │
│ 2. Cria correlationId único                                                     │
│ 3. Inicia sequência de agentes                                                 │
│ 4. Coordena comunicação entre agentes                                           │
│ 5. Monitora progresso através de eventos                                       │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### **2. Sequência de Execução**
```
1. ProjectPlannerAgent
   ├── Analisa requisitos
   ├── Define arquitetura
   └── Emite PlanningEvent

2. RAGGAgent
   ├── Busca templates relevantes
   ├── Fornece conhecimento contextual
   └── Emite RAGGEvent

3. ComponentGeneratorAgent
   ├── Gera componentes React
   ├── Aplica padrões do RAGG
   └── Emite ComponentEvent

4. PageGeneratorAgent
   ├── Gera páginas Next.js
   ├── Integra componentes
   └── Emite PageEvent

5. StyleGeneratorAgent
   ├── Gera estilos Tailwind
   ├── Aplica tema consistente
   └── Emite StyleEvent

6. ConfigGeneratorAgent
   ├── Gera configurações
   ├── Otimiza build
   └── Emite ConfigEvent

7. IntegrationAgent
   ├── Integra todos os ficheiros
   ├── Valida dependências
   └── Emite IntegrationEvent

8. ReviewAgent
   ├── Revisa qualidade
   ├── Sugere melhorias
   └── Emite ReviewEvent
```

## 🧠 **RAGG COMO AGENTE DE CONHECIMENTO**

### **1. Função Principal**
```
RAGGAgent = Knowledge Base + Context Provider
    │
    ├── Indexa templates e sites
    ├── Gera embeddings semânticos
    ├── Busca conhecimento relevante
    ├── Fornece contexto aos outros agentes
    └── Aumenta qualidade da geração
```

### **2. Integração com Outros Agentes**
```
ComponentGeneratorAgent
    │
    ├── Recebe prompt do utilizador
    ├── Consulta RAGGAgent para templates similares
    ├── Aplica padrões encontrados
    └── Gera componente com conhecimento contextual

PageGeneratorAgent
    │
    ├── Recebe prompt do utilizador
    ├── Consulta RAGGAgent para layouts similares
    ├── Aplica padrões de navegação
    └── Gera página com estrutura otimizada
```

### **3. Fluxo RAGG**
```
1. Indexação
   ├── SiteIndexer indexa sites/templates
   ├── Extrai componentes visuais
   ├── Gera embeddings semânticos
   └── Salva no Vector DB

2. Recuperação
   ├── RAGGAgent recebe query
   ├── Busca templates similares
   ├── Recupera conhecimento relevante
   └── Fornece contexto aos agentes

3. Geração Aumentada
   ├── Agentes recebem contexto do RAGG
   ├── Aplicam padrões encontrados
   ├── Gera código com conhecimento
   └── Melhora qualidade e consistência
```

## 🎯 **BENEFÍCIOS DA ARQUITETURA DE AGENTES**

### **✅ Especialização**
- Cada agente é especializado em uma função específica
- Qualidade superior em cada área
- Manutenção e evolução independente

### **✅ Escalabilidade**
- Fácil adicionar novos agentes
- Paralelização de tarefas
- Distribuição de carga

### **✅ Rastreabilidade**
- Eventos estruturados para cada ação
- Monitoramento em tempo real
- Debug e otimização facilitados

### **✅ Conhecimento Contextual**
- RAGG fornece conhecimento relevante
- Padrões e templates aplicados
- Qualidade e consistência melhoradas

## 🚀 **PRÓXIMOS PASSOS**

### **1. Agentes Adicionais**
- **DatabaseAgent**: Geração de schemas e migrações
- **DeployAgent**: Configuração e deploy automático
- **SecurityAgent**: Análise e implementação de segurança
- **PerformanceAgent**: Otimização de performance

### **2. RAGG Avançado**
- **Multi-modal RAGG**: Imagens, vídeos, áudio
- **Real-time RAGG**: Atualização contínua de conhecimento
- **Collaborative RAGG**: Conhecimento partilhado entre utilizadores

### **3. Comunicação Avançada**
- **Agent-to-Agent**: Comunicação direta entre agentes
- **Learning Agents**: Agentes que aprendem com feedback
- **Adaptive Agents**: Agentes que se adaptam ao contexto

## 🎉 **RESULTADO FINAL**

O sistema VULK com agentes especializados oferece:

- **✅ Agentes Especializados**: Cada um com função específica
- **✅ RAGG como Agente de Conhecimento**: Fornece contexto e padrões
- **✅ Comunicação Estruturada**: Eventos para rastreabilidade
- **✅ Geração Aumentada**: Conhecimento contextual aplicado
- **✅ Qualidade Superior**: Especialização em cada área

**O sistema está pronto para gerar projetos com qualidade superior através de agentes especializados!** 🚀
