# 🎨 VULK CHAT STYLING SYSTEM

## 📋 **SISTEMA DE ESTILIZAÇÃO CONSISTENTE PARA CHAT**

### **Problema Atual:**
- Estilos inconsistentes entre diferentes tipos de mensagem
- Falta de componentes shadcn/ui avançados para ações específicas
- UI/UX não otimizado para diferentes estados e ações

### **Solução:**
Sistema de estilização consistente com componentes shadcn/ui avançados para cada tipo de ação.

## 🎯 **TIPOS DE AÇÕES E ESTILOS**

### **1. Ações de Ficheiro**
```typescript
// FileActionMessage - Quando edita/cria ficheiros
interface FileActionMessage {
  type: 'file_action';
  action: 'create' | 'edit' | 'delete' | 'move' | 'rename';
  filePath: string;
  content?: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
}
```

### **2. Ações de Estado**
```typescript
// StateActionMessage - Quando altera estado
interface StateActionMessage {
  type: 'state_action';
  action: 'start' | 'progress' | 'complete' | 'error';
  component: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
}
```

### **3. Ações de Deploy**
```typescript
// DeployActionMessage - Quando faz deploy
interface DeployActionMessage {
  type: 'deploy_action';
  action: 'start' | 'progress' | 'complete' | 'error';
  platform: 'vercel' | 'flyio' | 'netlify';
  url?: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
}
```

### **4. Ações de Media**
```typescript
// MediaActionMessage - Quando gera media
interface MediaActionMessage {
  type: 'media_action';
  action: 'generate' | 'process' | 'complete' | 'error';
  mediaType: 'image' | 'video' | 'audio';
  url?: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
}
```

## 🎨 **COMPONENTES SHADCN/UI AVANÇADOS**

### **1. FileActionCard - Para ações de ficheiro**
```typescript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, Edit, Trash2, Move, Rename } from "lucide-react";

export const FileActionCard: React.FC<FileActionMessage> = ({ action, filePath, status }) => {
  const getActionIcon = () => {
    switch (action) {
      case 'create': return <FileText className="w-4 h-4" />;
      case 'edit': return <Edit className="w-4 h-4" />;
      case 'delete': return <Trash2 className="w-4 h-4" />;
      case 'move': return <Move className="w-4 h-4" />;
      case 'rename': return <Rename className="w-4 h-4" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <Card className="w-full border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            {getActionIcon()}
            {action.charAt(0).toUpperCase() + action.slice(1)} File
          </CardTitle>
          <Badge className={getStatusColor()}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-mono">
            {filePath}
          </p>
          {status === 'processing' && (
            <Progress value={75} className="w-full" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
```

### **2. StateActionCard - Para ações de estado**
```typescript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Play, Pause, CheckCircle, XCircle } from "lucide-react";

export const StateActionCard: React.FC<StateActionMessage> = ({ action, component, status }) => {
  const getActionIcon = () => {
    switch (action) {
      case 'start': return <Play className="w-4 h-4" />;
      case 'progress': return <Pause className="w-4 h-4" />;
      case 'complete': return <CheckCircle className="w-4 h-4" />;
      case 'error': return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <Card className="w-full border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            {getActionIcon()}
            State {action.charAt(0).toUpperCase() + action.slice(1)}
          </CardTitle>
          <Badge className={getStatusColor()}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Component: <span className="font-mono">{component}</span>
          </p>
          <div className="flex items-center space-x-2">
            <Switch checked={status === 'completed'} />
            <span className="text-xs text-muted-foreground">
              {status === 'completed' ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
```

### **3. DeployActionCard - Para ações de deploy**
```typescript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, Globe, Zap } from "lucide-react";

export const DeployActionCard: React.FC<DeployActionMessage> = ({ action, platform, url, status }) => {
  const getPlatformIcon = () => {
    switch (platform) {
      case 'vercel': return <Globe className="w-4 h-4" />;
      case 'flyio': return <Zap className="w-4 h-4" />;
      case 'netlify': return <Globe className="w-4 h-4" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <Card className="w-full border-l-4 border-l-indigo-500 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            {getPlatformIcon()}
            Deploy to {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </CardTitle>
          <Badge className={getStatusColor()}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {status === 'processing' && (
            <Progress value={60} className="w-full" />
          )}
          {url && (
            <Button variant="outline" size="sm" className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Deployment
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
```

### **4. MediaActionCard - Para ações de media**
```typescript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Image, Video, Music, Download } from "lucide-react";

export const MediaActionCard: React.FC<MediaActionMessage> = ({ action, mediaType, url, status }) => {
  const getMediaIcon = () => {
    switch (mediaType) {
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Music className="w-4 h-4" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <Card className="w-full border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            {getMediaIcon()}
            Generate {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}
          </CardTitle>
          <Badge className={getStatusColor()}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {status === 'processing' && (
            <Progress value={45} className="w-full" />
          )}
          {url && (
            <Button variant="outline" size="sm" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Media
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
```

## 🎯 **SISTEMA DE ESTILOS CONSISTENTE**

### **1. MessageStyleSystem - Sistema centralizado**
```typescript
export class MessageStyleSystem {
  private static instance: MessageStyleSystem;
  private styleCache: Map<string, string> = new Map();

  static getInstance(): MessageStyleSystem {
    if (!MessageStyleSystem.instance) {
      MessageStyleSystem.instance = new MessageStyleSystem();
    }
    return MessageStyleSystem.instance;
  }

  getStyleForAction(action: string, status: string): string {
    const cacheKey = `${action}_${status}`;
    
    if (this.styleCache.has(cacheKey)) {
      return this.styleCache.get(cacheKey)!;
    }

    const baseStyle = "rounded-lg p-4 mb-3 transition-all duration-200 border-l-4";
    let style = baseStyle;

    switch (action) {
      case 'file_action':
        style += ` bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-500`;
        break;
      case 'state_action':
        style += ` bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-500`;
        break;
      case 'deploy_action':
        style += ` bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border-indigo-500`;
        break;
      case 'media_action':
        style += ` bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-500`;
        break;
      default:
        style += ` bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`;
    }

    // Adicionar estilo baseado no status
    switch (status) {
      case 'pending':
        style += ` opacity-75`;
        break;
      case 'processing':
        style += ` animate-pulse`;
        break;
      case 'completed':
        style += ` opacity-100`;
        break;
      case 'error':
        style += ` border-red-500 bg-red-50 dark:bg-red-900/20`;
        break;
    }

    this.styleCache.set(cacheKey, style);
    return style;
  }

  getIconForAction(action: string): React.ReactNode {
    switch (action) {
      case 'file_action': return <FileText className="w-4 h-4" />;
      case 'state_action': return <Settings className="w-4 h-4" />;
      case 'deploy_action': return <Globe className="w-4 h-4" />;
      case 'media_action': return <Image className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  }

  getBadgeColorForStatus(status: string): string {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }
}
```

### **2. ActionMessageRenderer - Renderizador unificado**
```typescript
export const ActionMessageRenderer: React.FC<{
  message: ActionMessage;
  onActionClick?: (action: string) => void;
}> = ({ message, onActionClick }) => {
  const styleSystem = MessageStyleSystem.getInstance();
  const style = styleSystem.getStyleForAction(message.type, message.status);
  const icon = styleSystem.getIconForAction(message.type);
  const badgeColor = styleSystem.getBadgeColorForStatus(message.status);

  return (
    <div className={style}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium text-sm">
            {message.type.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        <Badge className={badgeColor}>
          {message.status}
        </Badge>
      </div>
      
      <div className="space-y-2">
        {message.type === 'file_action' && (
          <FileActionCard {...message} />
        )}
        {message.type === 'state_action' && (
          <StateActionCard {...message} />
        )}
        {message.type === 'deploy_action' && (
          <DeployActionCard {...message} />
        )}
        {message.type === 'media_action' && (
          <MediaActionCard {...message} />
        )}
      </div>
    </div>
  );
};
```

## 🎨 **COMPONENTES AVANÇADOS SHADCN/UI**

### **1. ProgressIndicator - Indicador de progresso**
```typescript
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export const ProgressIndicator: React.FC<{
  progress: number;
  status: string;
  label: string;
}> = ({ progress, status, label }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <Badge variant="outline">{status}</Badge>
      </div>
      <Progress value={progress} className="w-full" />
      <span className="text-xs text-muted-foreground">
        {progress}% complete
      </span>
    </div>
  );
};
```

### **2. StatusBadge - Badge de status**
```typescript
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react";

export const StatusBadge: React.FC<{
  status: 'pending' | 'processing' | 'completed' | 'error';
  size?: 'sm' | 'md' | 'lg';
}> = ({ status, size = 'md' }) => {
  const getIcon = () => {
    switch (status) {
      case 'pending': return <Clock className="w-3 h-3" />;
      case 'processing': return <AlertCircle className="w-3 h-3" />;
      case 'completed': return <CheckCircle className="w-3 h-3" />;
      case 'error': return <XCircle className="w-3 h-3" />;
    }
  };

  const getVariant = () => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'processing': return 'default';
      case 'completed': return 'default';
      case 'error': return 'destructive';
    }
  };

  return (
    <Badge variant={getVariant()} className="flex items-center gap-1">
      {getIcon()}
      {status}
    </Badge>
  );
};
```

### **3. ActionButton - Botão de ação**
```typescript
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const ActionButton: React.FC<{
  action: string;
  status: string;
  onClick?: () => void;
  disabled?: boolean;
}> = ({ action, status, onClick, disabled }) => {
  const isLoading = status === 'processing';
  const isCompleted = status === 'completed';
  const isError = status === 'error';

  return (
    <Button
      variant={isCompleted ? 'default' : isError ? 'destructive' : 'outline'}
      size="sm"
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full"
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {action}
    </Button>
  );
};
```

## 🚀 **IMPLEMENTAÇÃO**

### **1. Integração no ChatMessageV2**
```typescript
// src/components/chat/ChatMessageV2.tsx
export function ChatMessageV2({ message, onSuggestionClick, isLastMessage }) {
  // ... existing code ...

  const renderActionMessage = () => {
    if (message.type && message.type.includes('_action')) {
      return (
        <ActionMessageRenderer 
          message={message} 
          onActionClick={onSuggestionClick}
        />
      );
    }
    return null;
  };

  return (
    <div className="group w-full flex flex-col mb-4">
      {/* ... existing message content ... */}
      
      {/* Render action message if applicable */}
      {renderActionMessage()}
      
      {/* ... rest of component ... */}
    </div>
  );
}
```

### **2. Sistema de Eventos**
```typescript
// src/lib/chat/action-events.ts
export const ActionEventTypes = {
  FILE_ACTION: 'file_action',
  STATE_ACTION: 'state_action',
  DEPLOY_ACTION: 'deploy_action',
  MEDIA_ACTION: 'media_action'
} as const;

export const ActionStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  ERROR: 'error'
} as const;
```

## 🎉 **RESULTADO FINAL**

O sistema de estilização consistente oferece:

- **✅ Componentes shadcn/ui avançados** para cada tipo de ação
- **✅ Estilos consistentes** com gradientes e cores temáticas
- **✅ Indicadores visuais** claros para status e progresso
- **✅ Interatividade** com botões e ações
- **✅ Responsividade** e acessibilidade
- **✅ Sistema centralizado** de estilos

**O chat agora tem estilização consistente e profissional para todas as ações!** 🚀
