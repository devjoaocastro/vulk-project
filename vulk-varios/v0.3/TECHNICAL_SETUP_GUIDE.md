# 🔧 VULK® — GUIA TÉCNICO DE SETUP v0.3

**Setup completo para implementar as funcionalidades avançadas do VULK®**

---

## 📦 **DEPENDÊNCIAS NECESSÁRIAS**

### **1. Core Dependencies**
```bash
# Sistema de ficheiros virtual
npm install memfs chokidar

# WebContainer para execução real
npm install @webcontainer/api

# Hugging Face para Qwen2.5-Coder
npm install @huggingface/inference

# Monaco Editor para código
npm install monaco-editor @monaco-editor/react

# TensorFlow para eye-tracking
npm install @tensorflow/tfjs @tensorflow-models/face-landmarks-detection

# WebRTC para camera access
npm install @tensorflow-models/face-detection
```

### **2. Voice & Audio**
```bash
# Whisper WASM para voice-to-code
npm install @whisper/wasm whisper-turbo

# Audio processing
npm install @mediapipe/audio-classifier
```

### **3. Real-time & Collaboration**
```bash
# WebSocket para real-time
npm install socket.io socket.io-client

# Live collaboration
npm install @liveblocks/client @liveblocks/react

# Real-time sync
npm install yjs y-websocket
```

### **4. OAuth & Integrations**
```bash
# Stripe integration
npm install stripe @stripe/stripe-js

# Supabase integration
npm install @supabase/supabase-js

# Database ORM
npm install prisma @prisma/client
```

### **5. UI & UX**
```bash
# Advanced UI components
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-tooltip @radix-ui/react-popover

# Charts para analytics
npm install recharts @tremor/react

# Animations
npm install framer-motion @react-spring/web
```

---

## 🏗️ **ESTRUTURA DE ARQUIVOS**

### **1. Sistema de Orquestração**
```
/src/lib/orchestration/
├── agent-loop.ts          # ✅ Implementado
├── tool-manager.ts        # 🔄 Em desenvolvimento
├── context-builder.ts     # ❌ Pendente
└── agent-specialist.ts    # ❌ Pendente
```

### **2. Sistema de Ficheiros**
```
/src/lib/fs/
├── vulk-fs.ts            # ✅ Implementado
├── watcher.ts            # ❌ Pendente
├── sync-manager.ts       # ❌ Pendente
└── backup-manager.ts     # ❌ Pendente
```

### **3. WebContainer**
```
/src/lib/webcontainer/
├── runner.ts             # ❌ Pendente
├── process-manager.ts    # ❌ Pendente
├── port-manager.ts       # ❌ Pendente
└── file-sync.ts          # ❌ Pendente
```

### **4. Voice & Eye Tracking**
```
/src/lib/voice/
├── whisper-processor.ts  # ❌ Pendente
├── command-parser.ts     # ❌ Pendente
└── audio-manager.ts      # ❌ Pendente

/src/lib/gaze/
├── tracker.ts            # ❌ Pendente
├── calibration.ts        # ❌ Pendente
└── element-detector.ts   # ❌ Pendente
```

### **5. Token Tracking**
```
/src/lib/token-tracking/
├── counter.ts            # ❌ Pendente
├── cost-calculator.ts    # ❌ Pendente
├── usage-analytics.ts    # ❌ Pendente
└── budget-manager.ts     # ❌ Pendente
```

---

## ⚙️ **CONFIGURAÇÃO DE AMBIENTE**

### **1. Variáveis de Ambiente (.env.local)**
```bash
# Core VULK
NEXTAUTH_SECRET=vulk-secret-key-2024-production-ready
NEXTAUTH_URL=http://localhost:3000

# Hugging Face (Qwen2.5-Coder)
HF_TOKEN=your_huggingface_token_here

# OAuth Providers
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret

# Figma Integration
FIGMA_CLIENT_ID=your-figma-client-id
FIGMA_CLIENT_SECRET=your-figma-client-secret
NEXT_PUBLIC_FIGMA_CLIENT_ID=your-figma-client-id

# Stripe Integration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Supabase Integration
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/vulk_db"

# WebSocket (para real-time)
NEXT_PUBLIC_WS_URL=ws://localhost:3001

# Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_MIXPANEL_TOKEN=your-mixpanel-token
```

### **2. Next.js Configuration (next.config.ts)**
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@tensorflow/tfjs'],
  },
  webpack: (config) => {
    // TensorFlow.js support
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
    };
    
    // Monaco Editor support
    config.module.rules.push({
      test: /\.worker\.js$/,
      use: { loader: 'worker-loader' },
    });
    
    return config;
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cross-Origin-Embedder-Policy',
          value: 'require-corp',
        },
        {
          key: 'Cross-Origin-Opener-Policy',
          value: 'same-origin',
        },
      ],
    },
  ],
};

export default nextConfig;
```

### **3. TypeScript Configuration (tsconfig.json)**
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6", "webworker"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

---

## 🚀 **IMPLEMENTAÇÃO PASSO A PASSO**

### **FASE 1: WebContainer Integration (Semana 1)**

#### **1.1 Criar WebContainer Runner**
```typescript
// /src/lib/webcontainer/runner.ts
import { createWebContainer } from '@webcontainer/api';
import { getProjectFS } from '../fs/vulk-fs';

export async function bootProjectInWebContainer(projectId: string) {
  const container = await createWebContainer();
  const fs = getProjectFS(projectId);

  // Sync files to WebContainer
  for (const [path, content] of Object.entries(fs.toJSON())) {
    await container.fs.writeFile(path, content);
  }

  // Install dependencies
  const install = await container.spawn('npm', ['install']);
  install.output.pipeTo(new WritableStream({
    write: (chunk) => broadcastLog(projectId, chunk.toString())
  }));

  // Start dev server
  const devServer = await container.spawn('npm', ['run', 'dev']);
  devServer.on('port', (port) => {
    broadcastEvent({
      type: 'dev_server_ready',
      url: `https://${port}.vulk.dev`,
      projectId
    });
  });

  return container;
}
```

#### **1.2 Integrar com Sistema de Ficheiros**
```typescript
// /src/lib/fs/watcher.ts
import chokidar from 'chokidar';
import { getProjectFS } from './vulk-fs';

export function watchProjectFiles(
  projectId: string,
  onFileChange: (path: string, content: string) => void
) {
  const fs = getProjectFS(projectId);
  const watcher = chokidar.watch('/', {
    cwd: '/',
    ignoreInitial: true,
    usePolling: true
  });

  watcher.on('change', (path) => {
    const content = fs.readFileSync(path, 'utf8');
    onFileChange(path, content);
  });

  return () => watcher.close();
}
```

### **FASE 2: Voice-to-Code (Semana 2)**

#### **2.1 Whisper Integration**
```typescript
// /src/lib/voice/whisper-processor.ts
import { createWhisperProcessor } from '@whisper/wasm';

export class WhisperProcessor {
  private processor: any;

  async initialize() {
    this.processor = await createWhisperProcessor({
      model: 'whisper-turbo',
      quantized: true
    });
  }

  async transcribe(audioBuffer: ArrayBuffer): Promise<string> {
    if (!this.processor) await this.initialize();
    
    const result = await this.processor.process(audioBuffer);
    return result.text;
  }
}
```

#### **2.2 Command Parser**
```typescript
// /src/lib/voice/command-parser.ts
export class VoiceCommandParser {
  parseCommand(text: string): VoiceCommand {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('create') && lowerText.includes('component')) {
      return {
        type: 'create_component',
        name: this.extractComponentName(text),
        props: this.extractProps(text)
      };
    }
    
    if (lowerText.includes('change') && lowerText.includes('color')) {
      return {
        type: 'change_style',
        property: 'color',
        value: this.extractColor(text)
      };
    }
    
    return { type: 'unknown', text };
  }
}
```

### **FASE 3: Token Tracking (Semana 3)**

#### **3.1 Token Counter**
```typescript
// /src/lib/token-tracking/counter.ts
export class TokenCounter {
  private usage: Map<string, TokenUsage> = new Map();

  trackUsage(sessionId: string, usage: TokenUsage) {
    const current = this.usage.get(sessionId) || {
      totalTokens: 0,
      totalCost: 0,
      byAgent: {},
      byAction: {}
    };

    current.totalTokens += usage.tokens;
    current.totalCost += usage.cost;
    
    this.usage.set(sessionId, current);
    this.broadcastUsage(sessionId, current);
  }

  getUsage(sessionId: string): TokenUsage {
    return this.usage.get(sessionId) || {
      totalTokens: 0,
      totalCost: 0,
      byAgent: {},
      byAction: {}
    };
  }
}
```

#### **3.2 Cost Calculator**
```typescript
// /src/lib/token-tracking/cost-calculator.ts
export class CostCalculator {
  private pricing = {
    'qwen2.5-coder-7b': { input: 0.0001, output: 0.0002 },
    'gemini-2.5-pro': { input: 0.0005, output: 0.0015 },
    'gpt-4': { input: 0.03, output: 0.06 }
  };

  calculateCost(model: string, inputTokens: number, outputTokens: number): number {
    const modelPricing = this.pricing[model];
    if (!modelPricing) return 0;

    const inputCost = inputTokens * modelPricing.input;
    const outputCost = outputTokens * modelPricing.output;
    
    return inputCost + outputCost;
  }
}
```

---

## 🧪 **TESTING & VALIDATION**

### **1. Unit Tests**
```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Run tests
npm run test
```

### **2. Integration Tests**
```bash
# Install Playwright for E2E testing
npm install --save-dev @playwright/test

# Run E2E tests
npm run test:e2e
```

### **3. Performance Tests**
```bash
# Install Lighthouse CI
npm install --save-dev @lhci/cli

# Run performance tests
npm run test:performance
```

---

## 📊 **MONITORING & ANALYTICS**

### **1. Error Tracking**
```typescript
// /src/lib/monitoring/error-tracker.ts
export class ErrorTracker {
  static track(error: Error, context: any) {
    console.error('VULK Error:', error, context);
    
    // Send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Sentry, LogRocket, etc.
    }
  }
}
```

### **2. Performance Monitoring**
```typescript
// /src/lib/monitoring/performance-tracker.ts
export class PerformanceTracker {
  static trackTiming(name: string, startTime: number) {
    const duration = performance.now() - startTime;
    
    console.log(`Performance: ${name} took ${duration}ms`);
    
    // Send to analytics
    if (typeof window !== 'undefined') {
      window.gtag?.('event', 'timing_complete', {
        name,
        value: Math.round(duration)
      });
    }
  }
}
```

---

## 🔒 **SECURITY CHECKLIST**

### **1. Input Validation**
- ✅ **Sanitize** all user inputs
- ✅ **Validate** file uploads
- ✅ **Rate limiting** on API endpoints
- ✅ **CSRF protection** enabled

### **2. Authentication**
- ✅ **JWT tokens** with expiration
- ✅ **Secure cookies** (httpOnly, secure, sameSite)
- ✅ **OAuth** providers configured
- ✅ **Session management** secure

### **3. Data Protection**
- ✅ **Encryption** at rest and in transit
- ✅ **GDPR compliance** ready
- ✅ **Data retention** policies
- ✅ **Backup** strategies

---

## 🚀 **DEPLOYMENT**

### **1. Vercel Deployment**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### **2. Environment Variables**
```bash
# Set production environment variables
vercel env add NEXTAUTH_SECRET
vercel env add HF_TOKEN
vercel env add GITHUB_ID
# ... etc
```

### **3. Database Setup**
```bash
# Run migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

---

## 📚 **RECURSOS ADICIONAIS**

### **1. Documentação**
- [WebContainer API Docs](https://webcontainer.dev/)
- [Hugging Face Inference API](https://huggingface.co/docs/api-inference)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [TensorFlow.js](https://www.tensorflow.org/js)

### **2. Comunidade**
- [VULK Discord](https://discord.gg/vulk) (criar)
- [GitHub Discussions](https://github.com/vulk/vulk/discussions)
- [Twitter](https://twitter.com/vulk_dev)

### **3. Suporte**
- **Email**: support@vulk.dev
- **Documentação**: docs.vulk.dev
- **Status**: status.vulk.dev

---

*Guia criado em: Janeiro 2025*  
*Versão: v0.3*  
*Status: Ativo*
