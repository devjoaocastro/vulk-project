# 🎨 VULK MEDIA & LEARNING ARCHITECTURE

## 📋 **ARQUITETURA VISUAL DOS AGENTES DE MEDIA**

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           VULK MEDIA SYSTEM                                     │
│                    Media Generation & Learning Architecture                     │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   USER REQUEST  │    │   MEDIA AGENT    │    │   MODEL ROUTER  │    │   AI MODELS     │
│                 │    │                 │    │                 │    │                 │
│ "Generate logo  │───►│ • Analysis      │───►│ • Model         │───►│ • Gemini 2.5    │
│  for e-commerce"│    │ • Generation    │    │   Selection     │    │ • Nano Banana   │
│                 │    │ • Consistency   │    │ • Optimization  │    │ • DALL-E 3      │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │                       │
                                ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   LEARNING      │    │   CONSISTENCY   │    │   OBJECT        │    │   VISUAL RAGG   │
│   SYSTEM        │    │   SYSTEM        │    │   SEPARATION    │    │   SYSTEM        │
│                 │    │                 │    │                 │    │                 │
│ • Error         │    │ • Brand         │    │ • PNG           │    │ • Visual        │
│   Learning      │    │   Guidelines    │    │   Separation   │    │   Knowledge     │
│ • Success       │    │ • Color         │    │ • Background    │    │ • Template      │
│   Patterns      │    │   Consistency   │    │   Generation    │    │   Search        │
│ • Feedback      │    │ • Style         │    │ • Object       │    │ • Pattern       │
│   Analysis      │    │   Consistency   │    │   Detection     │    │   Extraction    │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 **FLUXO DETALHADO DE GERAÇÃO DE MEDIA**

### **FASE 1: ANÁLISE E PLANEAMENTO**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              MEDIA AGENT                                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│ 1. Recebe pedido de media do utilizador                                         │
│ 2. Analisa tipo de media (logo, hero, product, etc.)                          │
│ 3. Identifica estilo necessário (modern, corporate, minimalist, etc.)           │
│ 4. Determina tamanho e aspect ratio                                             │
│ 5. Cria MediaRequest estruturado                                                │
└─────────────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              MODEL ROUTER                                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • Analisa requisitos do pedido                                                 │
│ • Seleciona modelo otimizado (Gemini, Nano Banana, DALL-E 3)                   │
│ • Considera custo, qualidade, velocidade                                        │
│ • Aplica regras de seleção baseadas em tipo e estilo                           │
│ • Retorna configuração do modelo selecionado                                   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### **FASE 2: GERAÇÃO COM CONSISTÊNCIA**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           CONSISTENCY SYSTEM                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • Aplica brand guidelines do projeto                                           │
│ • Garante consistência de cores e estilo                                       │
│ • Otimiza prompt para consistência máxima                                      │
│ • Aplica regras de qualidade e resolução                                       │
│ • Gera prompt final otimizado                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           MEDIA GENERATION                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • Envia prompt otimizado para modelo selecionado                               │
│ • Gera imagem com especificações exatas                                        │
│ • Aplica filtros de qualidade e consistência                                   │
│ • Valida resultado contra requisitos                                           │
│ • Retorna GeneratedMedia com metadata                                           │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### **FASE 3: SEPARAÇÃO DE OBJETOS**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         OBJECT SEPARATION SYSTEM                               │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • Analisa imagem gerada                                                        │
│ • Identifica objetos principais                                                │
│ • Separa objetos em PNGs individuais                                           │
│ • Gera fundos diferenciados para cada objeto                                   │
│ • Cria versões com e sem fundo                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           BACKGROUND GENERATION                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • Gera fundos personalizados para cada objeto                                  │
│ • Aplica estilos consistentes (minimalist, corporate, etc.)                     │
│ • Cria variações de fundo (sólido, gradiente, textura)                         │
│ • Otimiza para diferentes tamanhos e aspect ratios                             │
│ • Retorna conjunto completo de media                                            │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### **FASE 4: APRENDIZADO E FEEDBACK**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            LEARNING SYSTEM                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • Regista geração e resultado                                                  │
│ • Coleta feedback do utilizador                                                │
│ • Analisa padrões de sucesso e erro                                            │
│ • Identifica melhorias necessárias                                             │
│ • Atualiza prompts e configurações                                             │
└─────────────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           FEEDBACK ANALYSIS                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • Analisa rating e comentários                                                 │
│ • Identifica problemas comuns                                                  │
│ • Gera sugestões de melhoria                                                   │
│ • Atualiza base de conhecimento                                                │
│ • Aplica melhorias em futuras gerações                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 🧠 **RAGG VISUAL COMO AGENTE DE CONHECIMENTO**

### **FASE 5: CONHECIMENTO VISUAL**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            VISUAL RAGG AGENT                                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • Busca templates visuais similares                                            │
│ • Extrai padrões de design relevantes                                          │
│ • Fornece contexto visual aos outros agentes                                   │
│ • Aplica conhecimento de templates anteriores                                  │
│ • Melhora consistência com projetos similares                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           VISUAL KNOWLEDGE BASE                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • SiteIndexer: Indexa sites e extrai padrões visuais                          │
│ • VisualCodeGenerator: Gera código baseado em templates                        │
│ • Vector DB: Armazena embeddings visuais                                      │
│ • Pattern Extraction: Extrai padrões de design                                 │
│ • Template Search: Busca templates similares                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 🔄 **SISTEMA DE APRENDIZADO COM ERROS**

### **1. Error Learning Flow**
```
Error Detection
    │
    ├── Error Analysis
    │   ├── Identificar tipo de erro
    │   ├── Analisar causa raiz
    │   └── Extrair padrões comuns
    │
    ├── Pattern Recognition
    │   ├── Identificar padrões de erro
    │   ├── Classificar tipos de erro
    │   └── Mapear soluções
    │
    ├── Learning Application
    │   ├── Atualizar prompts
    │   ├── Ajustar configurações
    │   └── Melhorar seleção de modelos
    │
    └── Continuous Improvement
        ├── Monitorar melhorias
        ├── Validar correções
        └── Aplicar aprendizados
```

### **2. Success Learning Flow**
```
Success Detection
    │
    ├── Success Analysis
    │   ├── Identificar fatores de sucesso
    │   ├── Analisar padrões de qualidade
    │   └── Extrair melhores práticas
    │
    ├── Pattern Recognition
    │   ├── Identificar padrões de sucesso
    │   ├── Classificar tipos de sucesso
    │   └── Mapear configurações ideais
    │
    ├── Knowledge Application
    │   ├── Replicar configurações
    │   ├── Aplicar padrões de sucesso
    │   └── Otimizar para casos similares
    │
    └── Continuous Improvement
        ├── Monitorar performance
        ├── Validar melhorias
        └── Expandir conhecimento
```

## 🎯 **CENTRALIZAÇÃO DE MODELOS**

### **Model Selection Logic**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              MODEL ROUTER                                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│ • Gemini 2.5 Pro (Free)                                                        │
│   - Melhor para: Texto, código, análise                                        │
│   - Custo: Gratuito                                                             │
│   - Qualidade: Alta                                                             │
│   - Velocidade: Rápida                                                         │
│                                                                                 │
│ • Nano Banana (Free)                                                           │
│   - Melhor para: Imagens simples, backgrounds                                  │
│   - Custo: Gratuito                                                             │
│   - Qualidade: Média                                                           │
│   - Velocidade: Muito rápida                                                   │
│                                                                                 │
│ • DALL-E 3 (Paid)                                                              │
│   - Melhor para: Logos, produtos, imagens complexas                            │
│   - Custo: Pago                                                                │
│   - Qualidade: Excelente                                                       │
│   - Velocidade: Média                                                          │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### **Selection Criteria**
```
Media Type + Style + Quality Requirements
    │
    ├── Logo + Corporate + High Quality → DALL-E 3
    ├── Background + Minimalist + Medium Quality → Nano Banana
    ├── Hero + Modern + High Quality → Gemini 2.5 Pro
    └── Product + Realistic + High Quality → DALL-E 3
```

## 🎨 **SEPARAÇÃO DE OBJETOS (PNGs)**

### **Object Separation Process**
```
Original Image
    │
    ├── Object Detection
    │   ├── Identificar objetos principais
    │   ├── Detectar bordas e contornos
    │   └── Classificar tipos de objeto
    │
    ├── Object Separation
    │   ├── Extrair objetos individuais
    │   ├── Criar máscaras de transparência
    │   └── Gerar PNGs com fundo transparente
    │
    ├── Background Generation
    │   ├── Gerar fundos personalizados
    │   ├── Aplicar estilos consistentes
    │   └── Criar variações de fundo
    │
    └── Final Output
        ├── Objetos separados (PNGs)
        ├── Fundos diferenciados
        └── Versões combinadas
```

## 🚀 **BENEFÍCIOS DA ARQUITETURA**

### **✅ Geração Otimizada**
- **Modelos centralizados**: Seleção automática do melhor modelo
- **Consistência máxima**: Brand guidelines e prompts otimizados
- **Qualidade superior**: Aprendizado contínuo com erros

### **✅ Separação Avançada**
- **PNGs separados**: Objetos individuais com transparência
- **Fundos diferenciados**: Variações personalizadas
- **Flexibilidade máxima**: Combinações ilimitadas

### **✅ Aprendizado Contínuo**
- **Error learning**: Melhoria com cada erro
- **Success patterns**: Replicação de sucessos
- **Feedback loop**: Melhoria contínua

### **✅ Conhecimento Visual**
- **RAGG visual**: Templates e padrões contextuais
- **Vectorização**: Conhecimento visual indexado
- **Busca semântica**: Templates similares relevantes

## 🎉 **RESULTADO FINAL**

O sistema VULK com agentes de media e aprendizado oferece:

- **✅ MediaAgent**: Geração otimizada de imagens
- **✅ LearningAgent**: Aprendizado contínuo com erros
- **✅ ConsistencyAgent**: Consistência máxima
- **✅ ObjectSeparationAgent**: Separação de objetos (PNGs)
- **✅ VisualRAGGAgent**: Conhecimento visual contextual
- **✅ ModelRouter**: Centralização e otimização de modelos

**O sistema está pronto para gerar media com qualidade superior, consistência máxima e aprendizado contínuo!** 🚀
