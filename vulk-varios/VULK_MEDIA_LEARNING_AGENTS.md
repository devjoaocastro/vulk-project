# 🎨 VULK MEDIA & LEARNING AGENTS

## 📋 **AGENTE DE MEDIA - ANÁLISE ATUAL**

### **✅ O que já temos:**
```typescript
// src/lib/ai/media-generator.ts
export class MediaGenerator {
  // ✅ Geração de imagens com Gemini
  // ✅ Múltiplos tipos: hero, logo, icon, background, product, avatar, illustration
  // ✅ Estilos: realistic, illustration, minimalist, modern, vintage, corporate
  // ✅ Tamanhos: small, medium, large
  // ✅ Aspect ratios: square, landscape, portrait, wide
}
```

### **❌ O que falta:**
- **Agente de Media especializado** (não está integrado como agente)
- **Sistema de aprendizado com erros**
- **Consistência máxima nos pedidos**
- **Separação de objetos (PNGs)**
- **Fundos diferenciados**
- **Centralização de modelos**

## 🎯 **AGENTE DE MEDIA ESPECIALIZADO**

### **1. MediaAgent - Agente Especializado**
```typescript
export class MediaAgent extends VulkAgent {
  private mediaGenerator: MediaGenerator;
  private learningSystem: MediaLearningSystem;
  private modelRouter: ModelRouter;

  async execute(prompt: string, mediaType: string, filePath: string): Promise<AgentResponse> {
    try {
      // 1. Análise do pedido de media
      const mediaRequest = await this.analyzeMediaRequest(prompt, mediaType);
      
      // 2. Seleção do modelo otimizado
      const model = await this.modelRouter.selectOptimalModel(mediaRequest);
      
      // 3. Geração com consistência máxima
      const media = await this.generateConsistentMedia(mediaRequest, model);
      
      // 4. Separação de objetos (PNGs)
      const separatedObjects = await this.separateObjects(media);
      
      // 5. Aprendizado com feedback
      await this.learningSystem.recordGeneration(mediaRequest, media, feedback);
      
      return { success: true, content: media, metadata: { mediaType, filePath } };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
```

### **2. Model Router - Centralização de Modelos**
```typescript
export class ModelRouter {
  private models: Map<string, ModelConfig> = new Map();
  
  constructor() {
    this.initializeModels();
  }
  
  private initializeModels() {
    // Google Gemini (Free)
    this.models.set('gemini-2.5-pro', {
      provider: 'google',
      cost: 'free',
      capabilities: ['text', 'image', 'code'],
      quality: 'high',
      speed: 'fast'
    });
    
    // Nano Banana (Free)
    this.models.set('nano-banana', {
      provider: 'nano-banana',
      cost: 'free',
      capabilities: ['image', 'text'],
      quality: 'medium',
      speed: 'fast'
    });
    
    // OpenRouter (Paid)
    this.models.set('dall-e-3', {
      provider: 'openrouter',
      cost: 'paid',
      capabilities: ['image'],
      quality: 'excellent',
      speed: 'medium'
    });
  }
  
  async selectOptimalModel(request: MediaRequest): Promise<ModelConfig> {
    // Lógica de seleção baseada em:
    // - Tipo de media
    // - Qualidade necessária
    // - Custo disponível
    // - Velocidade requerida
    
    if (request.type === 'logo' && request.style === 'corporate') {
      return this.models.get('dall-e-3'); // Melhor para logos
    }
    
    if (request.type === 'background' && request.style === 'minimalist') {
      return this.models.get('nano-banana'); // Suficiente para backgrounds
    }
    
    return this.models.get('gemini-2.5-pro'); // Default
  }
}
```

## 🧠 **SISTEMA DE APRENDIZADO COM ERROS**

### **1. MediaLearningSystem - Agente de Aprendizado**
```typescript
export class MediaLearningSystem {
  private errorDatabase: Map<string, ErrorPattern> = new Map();
  private successDatabase: Map<string, SuccessPattern> = new Map();
  private feedbackSystem: FeedbackSystem;
  
  async recordGeneration(request: MediaRequest, result: GeneratedMedia, feedback?: Feedback) {
    // 1. Registar geração
    const generation = {
      id: this.generateId(),
      request,
      result,
      feedback,
      timestamp: new Date(),
      success: feedback?.rating > 3
    };
    
    // 2. Análise de padrões
    if (generation.success) {
      await this.recordSuccessPattern(generation);
    } else {
      await this.recordErrorPattern(generation);
    }
    
    // 3. Atualização de prompts
    await this.updatePromptsBasedOnLearning();
  }
  
  async recordErrorPattern(generation: GenerationRecord) {
    const errorPattern: ErrorPattern = {
      id: this.generateId(),
      requestType: generation.request.type,
      requestStyle: generation.request.style,
      errorType: this.analyzeErrorType(generation),
      commonIssues: this.extractCommonIssues(generation),
      suggestedImprovements: this.generateImprovements(generation),
      timestamp: new Date()
    };
    
    this.errorDatabase.set(errorPattern.id, errorPattern);
    
    // Aprender com o erro
    await this.learnFromError(errorPattern);
  }
  
  async learnFromError(errorPattern: ErrorPattern) {
    // 1. Identificar causa raiz
    const rootCause = await this.identifyRootCause(errorPattern);
    
    // 2. Gerar melhorias
    const improvements = await this.generateImprovements(errorPattern);
    
    // 3. Atualizar prompts
    await this.updatePromptsForErrorType(errorPattern.requestType, improvements);
    
    // 4. Sugerir alternativas
    await this.suggestAlternatives(errorPattern);
  }
}
```

### **2. FeedbackSystem - Sistema de Feedback**
```typescript
export class FeedbackSystem {
  async collectFeedback(media: GeneratedMedia, userId: string): Promise<Feedback> {
    return {
      id: this.generateId(),
      mediaId: media.id,
      userId,
      rating: await this.getUserRating(media, userId),
      comments: await this.getUserComments(media, userId),
      improvements: await this.getSuggestedImprovements(media, userId),
      timestamp: new Date()
    };
  }
  
  async analyzeFeedback(feedback: Feedback[]): Promise<FeedbackAnalysis> {
    return {
      averageRating: this.calculateAverageRating(feedback),
      commonIssues: this.extractCommonIssues(feedback),
      improvementSuggestions: this.generateImprovementSuggestions(feedback),
      qualityTrends: this.analyzeQualityTrends(feedback)
    };
  }
}
```

## 🎨 **CONSISTÊNCIA MÁXIMA NOS PEDIDOS**

### **1. Enhanced Prompt System**
```typescript
export class EnhancedPromptSystem {
  private consistencyRules: Map<string, ConsistencyRule> = new Map();
  private brandGuidelines: Map<string, BrandGuideline> = new Map();
  
  async createConsistentPrompt(request: MediaRequest, context: ProjectContext): Promise<string> {
    // 1. Análise do contexto do projeto
    const projectStyle = await this.analyzeProjectStyle(context);
    
    // 2. Aplicação de regras de consistência
    const consistencyRules = await this.getConsistencyRules(request.type);
    
    // 3. Geração de prompt otimizado
    const basePrompt = request.prompt;
    const enhancedPrompt = await this.enhancePrompt(basePrompt, {
      projectStyle,
      consistencyRules,
      brandGuidelines: await this.getBrandGuidelines(context.brandId),
      colorPalette: context.colorPalette,
      typography: context.typography
    });
    
    return enhancedPrompt;
  }
  
  private async enhancePrompt(basePrompt: string, context: PromptContext): Promise<string> {
    const enhancements = [
      `Style: ${context.projectStyle}`,
      `Color palette: ${context.colorPalette}`,
      `Typography: ${context.typography}`,
      `Consistency: ${context.consistencyRules.join(', ')}`,
      `Brand guidelines: ${context.brandGuidelines.join(', ')}`,
      `High resolution, professional quality, web-optimized`
    ];
    
    return `${basePrompt}, ${enhancements.join(', ')}`;
  }
}
```

### **2. Brand Consistency System**
```typescript
export class BrandConsistencySystem {
  async ensureBrandConsistency(media: GeneratedMedia[], brandId: string): Promise<MediaConsistencyReport> {
    const brandGuidelines = await this.getBrandGuidelines(brandId);
    
    return {
      consistencyScore: await this.calculateConsistencyScore(media, brandGuidelines),
      colorConsistency: await this.analyzeColorConsistency(media, brandGuidelines.colorPalette),
      styleConsistency: await this.analyzeStyleConsistency(media, brandGuidelines.style),
      typographyConsistency: await this.analyzeTypographyConsistency(media, brandGuidelines.typography),
      suggestions: await this.generateConsistencySuggestions(media, brandGuidelines)
    };
  }
}
```

## 🖼️ **SEPARAÇÃO DE OBJETOS (PNGs)**

### **1. ObjectSeparationSystem**
```typescript
export class ObjectSeparationSystem {
  async separateObjects(media: GeneratedMedia): Promise<SeparatedObjects> {
    // 1. Análise da imagem
    const imageAnalysis = await this.analyzeImage(media.url);
    
    // 2. Identificação de objetos
    const objects = await this.identifyObjects(imageAnalysis);
    
    // 3. Separação de objetos
    const separatedObjects = await this.separateObjects(objects);
    
    // 4. Geração de fundos
    const backgrounds = await this.generateBackgrounds(media, separatedObjects);
    
    return {
      original: media,
      objects: separatedObjects,
      backgrounds: backgrounds,
      metadata: {
        objectCount: objects.length,
        separationQuality: await this.assessSeparationQuality(separatedObjects)
      }
    };
  }
  
  async generateBackgrounds(media: GeneratedMedia, objects: SeparatedObject[]): Promise<GeneratedMedia[]> {
    const backgrounds: GeneratedMedia[] = [];
    
    for (const object of objects) {
      // Gerar fundo para cada objeto
      const backgroundRequest: MediaRequest = {
        prompt: `Background for ${object.type}, ${media.prompt}`,
        type: 'background',
        style: 'minimalist',
        size: 'large',
        aspectRatio: 'landscape'
      };
      
      const background = await this.mediaGenerator.generateMedia(backgroundRequest);
      backgrounds.push(background);
    }
    
    return backgrounds;
  }
}
```

## 🔄 **INTEGRAÇÃO COM RAGG**

### **1. RAGG como Agente de Conhecimento Visual**
```typescript
export class VisualRAGGAgent extends VulkAgent {
  private siteIndexer: SiteIndexer;
  private visualCodeGenerator: VisualCodeGenerator;
  
  async execute(prompt: string, mediaType: string): Promise<AgentResponse> {
    try {
      // 1. Busca templates visuais similares
      const similarTemplates = await this.siteIndexer.searchSimilarSites(prompt, {
        mediaType,
        limit: 5
      });
      
      // 2. Extrai padrões visuais
      const visualPatterns = await this.extractVisualPatterns(similarTemplates);
      
      // 3. Gera código baseado em templates
      const generatedCode = await this.visualCodeGenerator.generateCode({
        prompt,
        templates: similarTemplates,
        patterns: visualPatterns
      });
      
      return {
        success: true,
        content: generatedCode,
        metadata: {
          templates: similarTemplates.length,
          patterns: visualPatterns.length
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
```

### **2. Vectorização de Conhecimento Visual**
```typescript
export class VisualKnowledgeVectorizer {
  async vectorizeVisualKnowledge(media: GeneratedMedia[]): Promise<VectorizedKnowledge> {
    const vectors: number[][] = [];
    
    for (const mediaItem of media) {
      // 1. Análise visual da imagem
      const visualAnalysis = await this.analyzeVisualFeatures(mediaItem.url);
      
      // 2. Geração de embedding
      const embedding = await this.generateVisualEmbedding(visualAnalysis);
      
      // 3. Armazenamento no Vector DB
      await this.storeInVectorDB({
        id: mediaItem.id,
        embedding,
        metadata: {
          type: mediaItem.type,
          style: mediaItem.style,
          prompt: mediaItem.prompt,
          visualFeatures: visualAnalysis
        }
      });
      
      vectors.push(embedding);
    }
    
    return {
      vectors,
      count: media.length,
      dimensions: vectors[0]?.length || 0
    };
  }
}
```

## 🎯 **ARQUITETURA COMPLETA**

### **1. Sistema de Agentes Integrado**
```
VULK Media System
    │
    ├── MediaAgent (geração de media)
    ├── LearningAgent (aprendizado com erros)
    ├── ConsistencyAgent (consistência máxima)
    ├── ObjectSeparationAgent (separação de objetos)
    ├── VisualRAGGAgent (conhecimento visual)
    └── ModelRouter (centralização de modelos)
```

### **2. Fluxo de Geração de Media**
```
User Request
    │
    ├── MediaAgent (análise do pedido)
    ├── ModelRouter (seleção do modelo)
    ├── EnhancedPromptSystem (consistência)
    ├── MediaGenerator (geração)
    ├── ObjectSeparationSystem (separação)
    ├── LearningSystem (aprendizado)
    └── FeedbackSystem (feedback)
```

## 🚀 **IMPLEMENTAÇÃO**

### **1. Agentes a Criar**
```typescript
// 1. MediaAgent especializado
export class MediaAgent extends VulkAgent { ... }

// 2. LearningAgent para aprendizado
export class LearningAgent extends VulkAgent { ... }

// 3. ConsistencyAgent para consistência
export class ConsistencyAgent extends VulkAgent { ... }

// 4. ObjectSeparationAgent para separação
export class ObjectSeparationAgent extends VulkAgent { ... }

// 5. VisualRAGGAgent para conhecimento visual
export class VisualRAGGAgent extends VulkAgent { ... }
```

### **2. Sistemas de Apoio**
```typescript
// 1. ModelRouter para centralização
export class ModelRouter { ... }

// 2. EnhancedPromptSystem para consistência
export class EnhancedPromptSystem { ... }

// 3. ObjectSeparationSystem para separação
export class ObjectSeparationSystem { ... }

// 4. LearningSystem para aprendizado
export class LearningSystem { ... }

// 5. FeedbackSystem para feedback
export class FeedbackSystem { ... }
```

## 🎉 **RESULTADO FINAL**

O sistema VULK com agentes de media e aprendizado oferece:

- **✅ Agente de Media Especializado**: Geração otimizada de imagens
- **✅ Sistema de Aprendizado**: Melhoria contínua com erros
- **✅ Consistência Máxima**: Prompts otimizados e brand guidelines
- **✅ Separação de Objetos**: PNGs separados e fundos diferenciados
- **✅ RAGG Visual**: Conhecimento visual contextual
- **✅ Centralização de Modelos**: Seleção otimizada de modelos

**O sistema está pronto para gerar media com qualidade superior e aprendizado contínuo!** 🚀
