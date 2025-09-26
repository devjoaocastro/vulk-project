# 🤖 VULK AGENTS DIAGRAM

## 📋 **ARQUITETURA VISUAL DOS AGENTES VULK**

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           VULK AGENTS SYSTEM                                    │
│                    Specialized AI Agents Architecture                          │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   USER INPUT    │    │   ORCHESTRATOR  │    │   RAGG AGENT    │    │   AI AGENTS     │
│                 │    │                 │    │                 │    │                 │
│ "Create an      │───►│ • Coordination  │───►│ • Knowledge     │───►│ • Planning      │
│  e-commerce     │    │ • Event Mgmt    │    │ • Templates     │    │ • Components    │
│  platform"      │    │ • Monitoring    │    │ • Patterns      │    │ • Pages         │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │                       │
                                ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   EVENT         │    │   KNOWLEDGE     │    │   CODE          │    │   INTEGRATION   │
│   SYSTEM        │    │   BASE          │    │   GENERATION    │    │   & REVIEW      │
│                 │    │                 │    │                 │    │                 │
│ • PlanningEvent │    │ • Site Indexer  │    │ • React/Next.js │    │ • Integration   │
│ • ComponentEvent│    │ • Code Gen      │    │ • Tailwind CSS  │    │ • Review        │
│ • PageEvent     │    │ • Embeddings    │    │ • TypeScript    │    │ • Quality       │
│ • StyleEvent    │    │ • Vector DB     │    │ • Prisma ORM    │    │ • Testing       │
│ • ConfigEvent   │    │ • Search        │    │ • NextAuth.js   │    │ • Security      │
│ • ReviewEvent   │    │ • Context       │    │ • APIs          │    │ • Performance   │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 **FLUXO DETALHADO DE AGENTES**

### **FASE 1: ORQUESTRAÇÃO E PLANEAMENTO**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           PROJECT ORCHESTRATOR                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│ 1. Recebe prompt do utilizador                                                  │
│ 2. Cria correlationId único                                                     │
│ 3. Inicia ProjectPlannerAgent                                                   │
│ 4. Coordena comunicação entre agentes                                          │
│ 5. Monitora progresso através de eventos                                       │
└─────────────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           PROJECT PLANNER AGENT                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • Analisa requisitos do utilizador                                              │
│ • Define arquitetura do projeto                                                │
│ • Seleciona tech stack (Next.js, Tailwind, Prisma, etc.)                       │
│ • Cria estrutura de ficheiros                                                   │
│ • Emite PlanningEvent com estrutura definida                                    │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### **FASE 2: RAGG AGENT - CONHECIMENTO CONTEXTUAL**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              RAGG AGENT                                         │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • Recebe contexto do ProjectPlannerAgent                                        │
│ • Busca templates similares no Vector DB                                        │
│ • Recupera padrões e componentes relevantes                                     │
│ • Fornece conhecimento contextual aos outros agentes                            │
│ • Emite RAGGEvent com templates e padrões encontrados                           │
└─────────────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           KNOWLEDGE BASE                                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • SiteIndexer: Indexa sites e extrai componentes visuais                       │
│ • VisualCodeGenerator: Gera código baseado em templates                        │
│ • SimpleSiteIndexer: Indexação simplificada para desenvolvimento               │
│ • Vector DB: Armazena embeddings semânticos                                    │
│ • Search: Busca templates similares por semelhança                             │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### **FASE 3: GERAÇÃO DE CÓDIGO - AGENTES ESPECIALIZADOS**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           COMPONENT GENERATOR AGENT                             │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • Recebe prompt + contexto do RAGG                                              │
│ • Gera componentes React/Next.js                                                │
│ • Aplica padrões encontrados pelo RAGG                                          │
│ • Inclui TypeScript, Tailwind CSS, acessibilidade                               │
│ • Emite ComponentEvent com código gerado                                        │
└─────────────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            PAGE GENERATOR AGENT                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • Recebe prompt + contexto do RAGG                                              │
│ • Gera páginas Next.js App Router                                               │
│ • Aplica layouts e estruturas encontradas pelo RAGG                             │
│ • Inclui SEO, metadata, responsividade                                          │
│ • Emite PageEvent com páginas geradas                                           │
└─────────────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            STYLE GENERATOR AGENT                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • Recebe prompt + contexto do RAGG                                              │
│ • Gera estilos Tailwind CSS                                                     │
│ • Aplica temas e cores encontradas pelo RAGG                                    │
│ • Inclui responsividade, dark mode, animações                                   │
│ • Emite StyleEvent com estilos gerados                                          │
└─────────────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            CONFIG GENERATOR AGENT                               │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • Recebe prompt + contexto do RAGG                                              │
│ • Gera configurações (next.config.js, tailwind.config.js, etc.)                │
│ • Aplica otimizações encontradas pelo RAGG                                      │
│ • Inclui build, deploy, performance, segurança                                  │
│ • Emite ConfigEvent com configurações geradas                                   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### **FASE 4: INTEGRAÇÃO E REVISÃO**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            INTEGRATION AGENT                                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • Recebe todos os ficheiros gerados                                             │
│ • Integra frontend, backend, database                                           │
│ • Valida dependências e imports                                                 │
│ • Configura conexões entre componentes                                          │
│ • Emite IntegrationEvent com projeto integrado                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              REVIEW AGENT                                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • Recebe código integrado                                                       │
│ • Revisa qualidade, performance, segurança                                      │
│ • Sugere melhorias e otimizações                                                │
│ • Valida TypeScript, acessibilidade, SEO                                        │
│ • Emite ReviewEvent com análise de qualidade                                     │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 🔄 **COMUNICAÇÃO ENTRE AGENTES**

### **Sistema de Eventos**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           EVENT SYSTEM                                          │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • PlanningEvent → ProjectPlannerAgent → Estrutura do projeto                   │
│ • RAGGEvent → RAGGAgent → Templates e padrões encontrados                      │
│ • ComponentEvent → ComponentGeneratorAgent → Componentes React                 │
│ • PageEvent → PageGeneratorAgent → Páginas Next.js                             │
│ • StyleEvent → StyleGeneratorAgent → Estilos Tailwind                          │
│ • ConfigEvent → ConfigGeneratorAgent → Configurações                           │
│ • IntegrationEvent → IntegrationAgent → Projeto integrado                      │
│ • ReviewEvent → ReviewAgent → Análise de qualidade                             │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### **Fluxo de Dados**
```
User Input
    │
    ▼
ProjectOrchestrator
    │
    ├── ProjectPlannerAgent → PlanningEvent
    │
    ├── RAGGAgent → RAGGEvent (templates + contexto)
    │
    ├── ComponentGeneratorAgent → ComponentEvent (componentes)
    │
    ├── PageGeneratorAgent → PageEvent (páginas)
    │
    ├── StyleGeneratorAgent → StyleEvent (estilos)
    │
    ├── ConfigGeneratorAgent → ConfigEvent (configurações)
    │
    ├── IntegrationAgent → IntegrationEvent (integração)
    │
    └── ReviewAgent → ReviewEvent (qualidade)
```

## 🧠 **RAGG COMO AGENTE DE CONHECIMENTO**

### **Função Principal**
```
RAGGAgent = Knowledge Base + Context Provider
    │
    ├── Indexa templates e sites
    ├── Gera embeddings semânticos
    ├── Busca conhecimento relevante
    ├── Fornece contexto aos outros agentes
    └── Aumenta qualidade da geração
```

### **Integração com Outros Agentes**
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

## 🎯 **BENEFÍCIOS DA ARQUITETURA**

### **✅ Especialização**
- Cada agente é especializado em uma função específica
- Qualidade superior em cada área
- Manutenção e evolução independente

### **✅ Conhecimento Contextual**
- RAGG fornece conhecimento relevante
- Padrões e templates aplicados
- Qualidade e consistência melhoradas

### **✅ Rastreabilidade**
- Eventos estruturados para cada ação
- Monitoramento em tempo real
- Debug e otimização facilitados

### **✅ Escalabilidade**
- Fácil adicionar novos agentes
- Paralelização de tarefas
- Distribuição de carga

## 🚀 **RESULTADO FINAL**

O sistema VULK com agentes especializados oferece:

- **✅ Agentes Especializados**: Cada um com função específica
- **✅ RAGG como Agente de Conhecimento**: Fornece contexto e padrões
- **✅ Comunicação Estruturada**: Eventos para rastreabilidade
- **✅ Geração Aumentada**: Conhecimento contextual aplicado
- **✅ Qualidade Superior**: Especialização em cada área

**O sistema está pronto para gerar projetos com qualidade superior através de agentes especializados!** 🚀
