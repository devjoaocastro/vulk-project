
# VULK® — Pedido de Implementação Completa (v3.0)
**Objetivo:** Migrar o VULK atual para o novo design (Design Map extraído do Figma), estabelecer um **orquestrador de IA** com comunicação por **NDJSON** (VULK‑AgentOps v3.0), **preview SSR determinístico**, e **UI de chat dinâmica** (ações visíveis, logs, diffs, estado). Este ficheiro é para ser usado no Cursor como guia e *system/developer prompt* base.

---

## 0) Escopo & Resultados Esperados
- **Migração 1:1** do visual para o novo **Design Map** sem perder **rotas/menus/fluxos** existentes.
- **Eliminação total** de estilos/componentes legacy (guard rails + codemods).
- **Protocolo de eventos NDJSON** bidirecional (SSE/WebSocket) com schemas versionados.
- **Preview** robusto (Next/SSR) com porta determinística, Traefik, quotas e healthcheck.
- **UI de Chat** com formatação rica (Markdown), **Activity Log**, árvore de ficheiros, diffs e estados.
- **Segurança & Supply‑chain**: redaction de paths/secrets, SBOM, locks, regras ESLint.
- **Observabilidade**: métricas de custos, tempo de build, erros, scorecard final.
- **Qualidade**: Lint/TS sem erros, a11y AA, testes de fumo e snapshot mínimos.

---

## 1) Protocolo VULK‑AgentOps v3.0 (NDJSON)
Cada linha do stream = **1 objeto JSON** com:
```json
{
  "id": "uuid",
  "ts": "2025-09-20T23:45:12.345Z",
  "type": "string",
  "protocol": { "name": "VULK-AgentOps", "version": "3.0" },
  "corr": "uuid-optional",
  "payload": {}
}
```

### 1.1 Tipos de evento (obrigatórios)
- `hello` → `{ agent, version, capabilities:[], limits:{} }`
- `plan` → `{ goal, steps:[{id, text, status}] }`
- `context_read` → `{ files:["design_map.json","route_map.json","constraints.json"] }`
- `artifact_start` / `artifact_end` → `{ artifactId, idempotencyKey, title, status }`
- `figma_link` → `{ screenId, route, components:[{id,name}] }`
- `file_write` → `{ path, contents, language? }`
- `file_patch` → `{ path, patch /* unidiff */ }`
- `run` → `{ cwd, cmd, args:[], env?:{"KEY":"env_ref:SERVICE_KEY"}, timeoutMs? }`
- `preview_start` / `preview_ready` / `preview_stop` → `{ cmd,args,port,url? }`
- `log` → `{ stream:"stdout|stderr", line }`
- `build_step` → `{ phase:"deps|build|launch|test", progress:0..100 }`
- `tool_use` → `{ name:"fs|process|git|net|figma", action:"write|exec|clone", decision:"allow|deny|needs_approval", reason }`
- `warning` / `question` / `error` → `{ code,message,hint,file?,stderr? }`
- `metrics` → `{ name, data }` (ex.: `{name:"cost",data:{tokens:...,cpuMs:...,memMB:...}}`)
- `git` → `{ action:"init|commit|diff|tag", message?, files? }`
- `done` → `{ created:[], modified:[], removed:[], previewUrl?, summary, nextSteps:[], scorecard?:{lint:"pass|fail",tests:{pass,fail},a11y:"AA|FAIL",sbom:"generated",design_drift:{missingTokens:[],unmappedVariants:[]}} }`

### 1.2 Regras de validação
- **Idempotência**: `artifactId + idempotencyKey` não devem produzir duplos.
- **Ordem**: `preview_ready` só após `preview_start` e porta up (healthcheck).
- **Path safety**: normalizar dentro de `{{WORKSPACE_ROOT}}`; negar fora.
- **Diff safety**: rejeições em `file_patch` → emitir `error` com hunk e plano.

---

## 2) Política de Redação (Anti‑vazamento)
- **Nunca** incluir paths locais, nomes de máquina, remotes git, SHAs, IDs de deploy, **secrets** ou envs.
- **Nunca** mencionar a origem do design (ex.: `.fig`). Usar **apenas** “Design Map”.
- Logs com candidato a secret/path → substituir por `[REDACTED]` (manter log privado fora do chat).

### 2.1 Scrubber Middleware (TypeScript)
```ts
export function redactLine(line: string): string {
  const patterns = [
    /\/(?:Users|home|var|etc|opt|srv|private)(?:\/[A-Za-z0-9._-]+)+/g,                 // Unix paths
    /[A-Za-z]:\\(?:[^\\\r\n]+\\)*[^\\\r\n]*/g,                                         // Windows paths
    /(?i)(api[_-]?key|token|secret|password|bearer)\s*[:=]\s*["']?[A-Za-z0-9._\-]{12,}/g,
    /https?:\/\/(?:127\.0\.0\.1|localhost|internal\.[^/\s]+)[^\s"]*/g
  ];
  let redacted = line;
  for (const rx of patterns) redacted = redacted.replace(rx, "[REDACTED]");
  return redacted;
}
```

---

## 3) Migração “Migration Mode” (sem perder rotas/menus)
- Fonte de verdade visual: `design_map.json` (tokens, components, patterns).
- Fonte de IA/rotas: **código atual** + `route_map.json` (inventário).
- **Kill switch** de legacy (ESLint rule) obrigatório; **codemods** automáticos.
- Transitional layouts **apenas** quando não houver screen direto (reportar em `done`).

### 3.1 Guardrails de Legacy (ESLint + script)
**`tools/legacy-style-guard.js`** (exemplo mínimo):
```js
const fs = require('fs'), path = require('path');
const ROOT = process.env.WORKSPACE_ROOT || process.cwd();
const banned = [/old-theme\.css/, /legacy\.css/, /--old-/, /class(Name)?=["'](?:lc-|wmk-legacy-)/];
function scan(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const s = fs.statSync(p);
    if (s.isDirectory() && !/node_modules|\.git|dist/.test(p)) scan(p);
    else if (s.isFile() && /\.(ts|tsx|js|jsx|css)$/.test(f)) {
      const txt = fs.readFileSync(p, 'utf8');
      for (const rx of banned) if (rx.test(txt)) {
        console.error(`LEGACY DETECTADO: ${p} via ${rx}`); process.exitCode = 2; return;
      }
    }
  }
}
scan(ROOT);
```

Adicionar em `package.json`:
```json
{
  "scripts": {
    "ci:style-guard": "node tools/legacy-style-guard.js && eslint . --max-warnings=0"
  }
}
```

### 3.2 Codemods (mapeamento)
**`tools/codemods/migrate-styles.ts`** gera `reports/codemods.json` e aplica substituições classe→token.

---

## 4) Integração com Figma via Design Map
- O host fornece `design_map.json` (tokens, screens[{id,name,route,...}], components).
- O agente **não** vê paths `.fig`. Pedidos adicionais via `question` com `screenId`/token key.
- Em cada rota migrada → emitir `figma_link {screenId, route, components[]}`.

### 4.1 Stubs de entrada
**`route_map.json` (exemplo):**
```json
{
  "routes": [
    { "path": "/", "name": "Home" },
    { "path": "/chat", "name": "Chat" },
    { "path": "/dashboard", "name": "Dashboard" },
    { "path": "/projects", "name": "Projects" },
    { "path": "/agents", "name": "Agents" },
    { "path": "/settings", "name": "Settings" }
  ]
}
```

**`design_map.json` (exemplo mínimo):**
```json
{
  "tokens": {
    "color.primary":"#0EA5E9",
    "font.body":"Inter",
    "radius.lg":"16",
    "space.2":"8px",
    "shadow.card":"0 6px 20px rgba(0,0,0,.08)"
  },
  "screens": [
    { "id":"S:ChatMain", "name":"Chat — Main", "route":"/chat", "width":1440, "height":1024 },
    { "id":"S:Dashboard", "name":"Dashboard — Overview", "route":"/dashboard" }
  ],
  "components": [
    { "id":"C:MessageItem", "name":"MessageItem", "variants":["default","assistant","error"] },
    { "id":"C:ActivityLog", "name":"ActivityLog", "variants":["pending","running","done","error"] }
  ]
}
```

---

## 5) UI do Chat — Requisitos (Frontend)
- **Renderer Markdown** com headings, **bold**, listas, tabelas, code fences (copy).
- **Activity Log** mapeado a `file_*`, `run`, `log`, `preview_*`, `error`, `done`.
- **Árvore de Ficheiros** com realce em alterações; diff inline opcional.
- **Estados de stream**: “a pensar…”, “a executar…”, progresso e retry.
- **A11y**: `aria-live="polite"`, foco visível, roles, navegação por teclado.

### 5.1 Componentes mínimos
- `PlanPanel`, `ActivityLog`, `FileTree`, `PatchDiffCard`, `CommandChip`,
  `LogStream`, `PreviewBadge/Iframe`, `ErrorCard`, `SummaryCard`.

---

## 6) Preview SSR determinístico (Next.js)
- Porta fixa `{{PREVIEW_PORT}}` (ex.: 3000), `cwd = {{WORKSPACE_ROOT}}`.
- Scripts em `package.json`:
```json
{
  "scripts": {
    "dev": "next dev -p {{PREVIEW_PORT}}",
    "build": "next build",
    "start": "next start -p {{PREVIEW_PORT}}",
    "lint": "eslint . --max-warnings=0",
    "test": "vitest run --reporter=dot",
    "sbom": "cyclonedx-npm -o sbom.json",
    "ci:style-guard": "node tools/legacy-style-guard.js && eslint . --max-warnings=0"
  }
}
```

### 6.1 Docker + Traefik (exemplo `docker-compose.preview.yml`)
```yaml
services:
  build-runner:
    image: node:20-alpine
    working_dir: /work
    volumes:
      - ./work/${SESSION_ID}:/work
      - pnpm-store:/root/.pnpm-store
    command: sh -lc "corepack enable && pnpm install && pnpm dev -p ${PREVIEW_PORT:-3000}"
    environment:
      - NODE_ENV=development
    expose:
      - "${PREVIEW_PORT:-3000}"
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.vulk${SESSION_ID}.rule=Host(`${SESSION_ID}.preview.vulk.dev`)"
      - "traefik.http.services.vulk${SESSION_ID}.loadbalancer.server.port=${PREVIEW_PORT:-3000}"
      - "traefik.http.routers.vulk${SESSION_ID}.entrypoints=websecure"
      - "traefik.http.routers.vulk${SESSION_ID}.tls.certresolver=letsencrypt"
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:${PREVIEW_PORT:-3000}/"]
      interval: 10s
      timeout: 3s
      retries: 12

volumes:
  pnpm-store: {}
```

### 6.2 Hardening
- Quotas de CPU/RAM por sessão; **auto-stop** por inatividade (N minutos).
- Cache `pnpm` por hash(lockfile+node+os).
- Debounce watcher (300–500ms) para rebuilds.
- Health antes de `preview_ready`; logs ao chat sempre.

---

## 7) Segurança & Supply‑Chain
- **Secrets** via `env_ref:` apenas (nunca plaintext).
- **SBOM** CycloneDX (`pnpm sbom`), bloquear registries não aprovados.
- **Locks** (pnpm-lock.yaml), verificação de integridade.
- **ESLint** “no-legacy-style” + CI fail-fast.

---

## 8) Observabilidade & Custos
- `metrics.cost` (tokens, cpuMs, memMB), build time, test counts.
- `scorecard` no `done`: lint, tests, a11y, sbom, design_drift.
- Trace IDs por sessão; logs persistidos por artifact.

---

## 9) Testes & Qualidade
- **Smoke tests** por rota essencial (`/chat`, `/dashboard`).
- **Snapshot** do chat e layout (render básico).
- **A11y** mínimo: roles presentes e foco navegável.
- Lint/TS sem erros; CI bloqueia em warning.

---

## 10) Exemplo NDJSON — ciclo “migrar /chat”
```json
{"id":"1","ts":"2025-09-20T23:50:00Z","type":"hello","protocol":{"name":"VULK-AgentOps","version":"3.0"},"payload":{"agent":"VULK","version":"3.0","capabilities":["fs","process","preview","git","figma"],"limits":{"maxFiles":200}}}
{"id":"2","ts":"2025-09-20T23:50:01Z","type":"plan","protocol":{"name":"VULK-AgentOps","version":"3.0"},"payload":{"goal":"Migrar layout global + /chat para novo design","steps":[{"id":"s1","text":"Sincronizar tokens/tema","status":"pending"},{"id":"s2","text":"Ativar legacy kill switch","status":"pending"},{"id":"s3","text":"Codemods classes antigas→novas","status":"pending"},{"id":"s4","text":"Migrar layout global","status":"pending"},{"id":"s5","text":"Migrar /chat com Markdown + Activity","status":"pending"},{"id":"s6","text":"Instalar deps & preview","status":"pending"},{"id":"s7","text":"Smoke tests + commit","status":"pending"}]}} 
{"id":"3","ts":"2025-09-20T23:50:02Z","type":"context_read","protocol":{"name":"VULK-AgentOps","version":"3.0"},"payload":{"files":["design_map.json","route_map.json","constraints.json"]}}
{"id":"4","ts":"2025-09-20T23:50:03Z","type":"artifact_start","protocol":{"name":"VULK-AgentOps","version":"3.0"},"payload":{"artifactId":"A-CHAT","idempotencyKey":"mig-chat-v1","title":"Migrar /chat"}}
{"id":"5","ts":"2025-09-20T23:50:04Z","type":"figma_link","protocol":{"name":"VULK-AgentOps","version":"3.0"},"payload":{"screenId":"S:ChatMain","route":"/chat","components":[{"id":"C:MessageItem","name":"MessageItem"},{"id":"C:ActivityLog","name":"ActivityLog"}]}} 
{"id":"6","ts":"2025-09-20T23:50:05Z","type":"file_write","protocol":{"name":"VULK-AgentOps","version":"3.0"},"payload":{"path":"src/styles/tokens.css","contents":"/* vars a partir de design_map.tokens */"}}
{"id":"7","ts":"2025-09-20T23:50:06Z","type":"file_patch","protocol":{"name":"VULK-AgentOps","version":"3.0"},"payload":{"path":"tailwind.config.ts","patch":"*** Begin Patch\n*** Update File: tailwind.config.ts\n@@\n- theme: { extend: {} }\n+ theme: { extend: { /* tokens from design_map */ } }\n*** End Patch"}} 
{"id":"8","ts":"2025-09-20T23:50:07Z","type":"run","protocol":{"name":"VULK-AgentOps","version":"3.0"},"payload":{"cwd":"{{WORKSPACE_ROOT}}","cmd":"pnpm","args":["install"],"timeoutMs":600000}}
{"id":"9","ts":"2025-09-20T23:50:12Z","type":"build_step","protocol":{"name":"VULK-AgentOps","version":"3.0"},"payload":{"phase":"deps","progress":70}} 
{"id":"10","ts":"2025-09-20T23:50:20Z","type":"file_patch","protocol":{"name":"VULK-AgentOps","version":"3.0"},"payload":{"path":"src/app/(routes)/chat/page.tsx","patch":"*** Begin Patch\n*** Update File: src/app/(routes)/chat/page.tsx\n@@\n- <div>Chat</div>\n+ <ChatScreen />\n*** End Patch"}} 
{"id":"11","ts":"2025-09-20T23:50:21Z","type":"preview_start","protocol":{"name":"VULK-AgentOps","version":"3.0"},"payload":{"cmd":"pnpm","args":["dev","-p","3000"],"port":3000}}
{"id":"12","ts":"2025-09-20T23:50:23Z","type":"log","protocol":{"name":"VULK-AgentOps","version":"3.0"},"payload":{"stream":"stdout","line":"ready - http://0.0.0.0:3000"}} 
{"id":"13","ts":"2025-09-20T23:50:24Z","type":"preview_ready","protocol":{"name":"VULK-AgentOps","version":"3.0"},"payload":{"url":"https://{{SESSION_ID}}.preview.vulk.dev"}} 
{"id":"14","ts":"2025-09-20T23:50:25Z","type":"metrics","protocol":{"name":"VULK-AgentOps","version":"3.0"},"payload":{"name":"cost","data":{"tokens":18234,"cpuMs":5230,"memMB":612}}} 
{"id":"15","ts":"2025-09-20T23:50:26Z","type":"git","protocol":{"name":"VULK-AgentOps","version":"3.0"},"payload":{"action":"commit","message":"feat(chat): migrate to new design + tokens"}} 
{"id":"16","ts":"2025-09-20T23:50:27Z","type":"artifact_end","protocol":{"name":"VULK-AgentOps","version":"3.0"},"payload":{"artifactId":"A-CHAT","status":"success"}} 
{"id":"17","ts":"2025-09-20T23:50:28Z","type":"done","protocol":{"name":"VULK-AgentOps","version":"3.0"},"payload":{"created":["src/styles/tokens.css"],"modified":["tailwind.config.ts","src/app/(routes)/chat/page.tsx"],"previewUrl":"https://{{SESSION_ID}}.preview.vulk.dev","summary":"Layout global e /chat migrados para novo design, tokens aplicados, preview operacional.","nextSteps":["Migrar /dashboard com tabelas/filters","Executar codemods remanescentes"],"scorecard":{"lint":"pass","tests":{"pass":6,"fail":0},"a11y":"AA","sbom":"generated","design_drift":{"missingTokens":[],"unmappedVariants":["Button/ghost:focus"]}}}}
```

---

## 11) CI/CD (GitHub Actions — exemplo)
**`.github/workflows/ci.yml`**:
```yaml
name: vulk-ci
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: "pnpm" }
      - run: corepack enable
      - run: pnpm install
      - run: pnpm ci:style-guard
      - run: pnpm build
      - run: pnpm test
      - run: pnpm sbom
      - name: Upload SBOM
        uses: actions/upload-artifact@v4
        with: { name: sbom, path: sbom.json }
```

---

## 12) Aceitação (Definition of Done)
- **Visual 1:1** com Design Map; zero classes/tokens legacy (guard a passar).
- **Preview** ativo com URL, health OK, e logs no chat.
- **NDJSON** válido, sem prosa fora de eventos; redaction ativo.
- **Scorecard** no `done` com lint:pass, tests ≥ mínimos, a11y AA, sbom gerado.
- **Migração /chat** e **layout global** concluídos; próximos passos listados.

---

## 13) Placeholders a preencher antes de executar
- `{{WORKSPACE_ROOT}}`, `{{PREVIEW_PORT}}`
- `{{STACK}}`, `{{NODE_VERSION}}`, `{{PKG_MGR}}`, `{{LINT}}`, `{{FORMATTER}}`, `{{TEST_RUNNER}}`
- Fornecer `route_map.json` + `design_map.json` (pelo host).

---

## 14) Nota para uso no Cursor
- Colar a **Prompt SYSTEM/DEVELOPER** (secções 1, 2, 3, 4 e 5 em especial) no teu orquestrador de IA.
- Manter o **Middleware de Redação** no backend do Cursor.
- Lançar o serviço de preview com o `docker-compose.preview.yml` ou runner equivalente.
- Garantir `SSE/WebSocket` para stream **NDJSON** ao UI.

---

**FIM — VULK® Implementação Completa v3.0**

Análise da Concorrência e Especificação para 'O SISTEMA'

1. Visão Geral e Objetivo

O objetivo é criar um sistema de desenvolvimento assistido por IA, doravante designado 'O SISTEMA', que supere as ofertas existentes no mercado. A análise dos concorrentes (Bolt, v0, Lovable, etc.) e dos seus system prompts revela um padrão claro: os sistemas mais avançados estão a afastar-se de um modelo de 'chatbot' e a aproximar-se de um orquestrador de tarefas transparente e interativo.

A nossa arquitetura será a mais avançada porque combinará as melhores características observadas e irá evoluí-las com base numa arquitetura de comunicação por eventos em tempo real, proporcionando uma experiência de utilizador radicalmente transparente, reativa e poderosa.

2. Análise dos Padrões da Concorrência

A análise das capturas de ecrã e dos prompts revela várias tendências e funcionalidades-chave que definem o estado da arte.

Padrões de Interface de Utilizador (UI)

ConcorrenteCaracterística Principal da UIImplicação para 'O SISTEMA'BoltLog de ações estruturado com ícones de estado (✓) e comandos explícitos (npm install).Devemos abandonar respostas em linguagem natural para relatar ações. Em vez disso, a UI deve renderizar um log de eventos de ações, cada um com tipo, estado (em curso, sucesso, falha) e detalhes.v0.appIndicador de 'Pensamento' (Thought for 6s), componentes interativos (Install Supabase vs Skip) e barras de progresso.O sistema deve comunicar o seu estado interno. Não apenas o que fez, mas o que está a fazer (a pensar, a executar) e o que precisa (input do utilizador através de componentes interativos).LovableResumo de ações (2 edits made) e uma clara separação entre o plano de alto nível e a execução.A UI deve ser capaz de apresentar vistas sumarizadas e detalhadas das ações. O utilizador deve poder ver o plano geral e, se quiser, aprofundar para ver cada alteração de código.AI StudioÁrvore de ficheiros com feedback visual (✓) e sugestões de próximos passos em forma de botões.Ações como a criação de ficheiros devem refletir-se numa vista de ficheiros em tempo real. O sistema deve ser proativo, sugerindo os próximos passos lógicos para guiar o utilizador.

Padrões de Comunicação e Arquitetura (System Prompts)

ConcorrenteAbordagem ChaveImplicação para 'O SISTEMA'LovableProtocolo de comunicação explícito com tags XML (<lov-write>, <lov-thinking>).Esta é a abordagem mais robusta. Define um contrato de API entre o agente e a UI. Vamos adotar e expandir esta ideia usando um esquema JSON rigoroso.BoltConceito de <boltArtifact> que agrupa múltiplas ações (<boltAction>) numa única transação.Essencial para tarefas complexas. Permite agrupar a criação de ficheiros, instalação de dependências e configuração numa única unidade de trabalho, garantindo a atomicidade.Same.devFoco explícito em execução paralela de ferramentas e manutenção de estado interno (.same/todos.md).A eficiência é crucial. O nosso orquestrador deve ser capaz de executar chamadas de ferramentas não dependentes em paralelo. A gestão de estado interna do agente é uma boa prática para tarefas de longa duração.

3. Arquitetura Proposta: 'O Protocolo Manus'

Para alcançar um fluxo de conversação superior, dinâmico e não estático, propomos uma arquitetura baseada em eventos, onde o backend (Agente Manus) comunica com o frontend (UI) através de um fluxo contínuo de eventos estruturados em JSON. Isto elimina a ambiguidade da linguagem natural e permite que a UI se torne um 'renderer' inteligente do estado do sistema.

Fluxo de Comunicação em Tempo Real

A comunicação será feita via WebSockets ou Server-Sent Events (SSE). Em vez de uma única resposta, o agente enviará uma série de eventos à medida que processa um pedido.

Exemplo de Fluxo:

1.
Utilizador: "Cria um botão de login."

2.
Agente → UI: event: thought_start

3.
UI: Mostra a animação "A pensar...".

4.
Agente → UI: event: plan_update, data: { "steps": ["Criar componente Button.tsx", "Adicionar ao App.tsx", "Instalar dependências de estilo"] }

5.
UI: Mostra uma checklist com os passos planeados.

6.
Agente → UI: event: action_start, data: { "actionId": "uuid-123", "type": "file.create", "path": "src/components/Button.tsx", "description": "A criar o componente Button.tsx" }

7.
UI: Atualiza o estado da ação na checklist e mostra um indicador de progresso para Button.tsx.

8.
Agente → UI: event: file_content_update, data: { "actionId": "uuid-123", "path": "src/components/Button.tsx", "contentSnippet": "<button>...</button>" }

9.
UI: (Opcional) Mostra um snippet do código ou atualiza a árvore de ficheiros.

10.
Agente → UI: event: action_end, data: { "actionId": "uuid-123", "status": "success" }

11.
Agente → UI: event: preview_update, data: { "status": "updating", "message": "A reconstruir o preview..." }

12.
UI: Mostra uma mensagem de que o preview está a ser atualizado.

13.
Agente → UI: event: preview_update, data: { "status": "ready", "url": "https://preview.nosso-sistema.com/projeto-id" }

14.
UI: Atualiza o iframe do preview e mostra o botão de login.

15.
Agente → UI: event: final_message, data: { "contentType": "markdown", "content": "O componente de login foi criado e está disponível no preview. **O que gostaria de fazer a seguir?**" }

16.
UI: Mostra a mensagem final e, opcionalmente, botões de sugestão de próximos passos.

3.1. Esquema JSON para Eventos (O Protocolo Manus)

Cada evento enviado do Agente para o Frontend será um objeto JSON com a seguinte estrutura base:

JSON


{
  "eventId": "string", // UUID único para cada evento
  "timestamp": "ISO 8601 string", // Data e hora do evento
  "type": "string", // Tipo de evento (ex: "thought_start", "plan_update", "action_start", "action_end", "file_content_update", "preview_update", "final_message", "user_input_required", "suggestion")
  "payload": { // Conteúdo específico do evento
    // ... (estrutura detalhada abaixo)
  }
}


Detalhes do payload por Tipo de Evento:

1.
type: thought_start

2.
type: plan_update

3.
type: action_start

4.
type: action_end

5.
type: file_content_update

6.
type: preview_update

7.
type: final_message

8.
type: user_input_required

9.
type: suggestion

3.2. Protocolo de Interação Agente ↔ Frontend

O Agente Manus comunicará com o Frontend através de uma série de chamadas de ferramentas que, no backend, serão traduzidas para os eventos JSON definidos acima e enviados via WebSocket/SSE. Isto garante que o Agente se foca na lógica de negócio e na execução de tarefas, enquanto o sistema de comunicação se encarrega da formatação e entrega dos eventos.

Ferramentas de Comunicação do Agente:

Para o Agente, a comunicação com o Frontend será abstraída através de um conjunto de ferramentas específicas, que mapeiam diretamente para os tipos de eventos JSON. Isto permite que o Agente utilize a sua capacidade de tool-calling para orquestrar a experiência do utilizador.

1.
send_thought(message: str): Envia uma mensagem de pensamento interno do Agente para o Frontend, comunicando o que o Agente está a processar ou a planear. Mapeia para o evento thought_start.

2.
update_plan(plan_id: str, goal: str, steps: List[Dict]): Atualiza o plano de ação visível para o utilizador. Cada passo pode ter um stepId, description e status. Mapeia para o evento plan_update.

3.
start_action(action_id: str, type: str, description: str, details: Dict): Inicia uma ação específica que o Agente está a executar. O details conterá informações contextuais (ex: path para ficheiros, command para shell). Mapeia para o evento action_start.

4.
end_action(action_id: str, status: str, error_message: Optional[str] = None): Finaliza uma ação, indicando sucesso ou falha. Em caso de falha, inclui uma mensagem de erro. Mapeia para o evento action_end.

5.
update_file_content(action_id: str, path: str, content_snippet: str, full_content_hash: str): Notifica o Frontend sobre uma alteração no conteúdo de um ficheiro. Inclui um snippet e um hash para verificação. Mapeia para o evento file_content_update.

6.
update_preview(status: str, url: Optional[str] = None, message: Optional[str] = None): Atualiza o estado do ambiente de preview. Mapeia para o evento preview_update.

7.
send_final_message(content_type: str, content: str): Envia a mensagem final formatada para o utilizador, marcando o fim de uma iteração ou tarefa. Mapeia para o evento final_message.

8.
request_user_input(question: str, options: Optional[List[Dict]] = None, input_type: Optional[str] = None): Solicita input do utilizador, com opções pré-definidas ou um tipo de input específico. Mapeia para o evento user_input_required.

9.
send_suggestions(suggestions: List[Dict]): Envia sugestões de próximos passos ou ações para o utilizador. Mapeia para o evento suggestion.

3.3. Vantagens do Protocolo Manus

O Protocolo Manus oferece várias vantagens significativas para a criação de um sistema de desenvolvimento assistido por IA de ponta. A transparência é um dos principais benefícios, pois o utilizador tem visibilidade total sobre o que o Agente está a fazer, a pensar e a planear. A reatividade da UI, que pode reagir em tempo real a cada evento, atualizando componentes e indicadores de progresso, melhora significativamente a experiência do utilizador. A robustez do sistema é garantida pela comunicação estruturada em JSON, que elimina ambiguidades e erros de parsing. A extensibilidade do protocolo permite que novos tipos de eventos e ações sejam facilmente adicionados sem quebrar a compatibilidade. A interatividade é aprimorada, permitindo que o Agente solicite input do utilizador de forma estruturada. Finalmente, a depuração aprimorada, com um log de eventos detalhado, torna a resolução de problemas muito mais eficiente.

4. Especificação dos Componentes de UI Dinâmicos e Estados Visuais

Com base no 'Protocolo Manus' definido, a interface de utilizador (UI) deixa de ser um simples mostrador de texto e passa a ser um dashboard reativo que renderiza o estado do sistema em tempo real. Cada componente da UI subscreve a tipos de eventos específicos, garantindo que a informação apresentada é sempre sincronizada com as ações do Agente.

Mapeamento de Eventos para Componentes de UI

A tabela seguinte detalha que componentes da UI são afetados por cada tipo de evento do protocolo, criando uma experiência de utilizador coesa e informativa.

Tipo de Evento (type)Componente de UI AfetadoDescrição da Atualização Visualthought_startIndicador de AtividadeExibe uma animação e a mensagem do payload (ex: "A pensar..."). Substitui um spinner genérico por um feedback contextual.plan_updatePainel de Plano de AçãoRenderiza ou atualiza uma lista de passos (checklist) com o objetivo geral. Cada passo mostra a sua descrição e estado (pending, in_progress, etc.).action_startLog de AtividadesAdiciona um novo item ao log com um ícone de "em progresso". O item contém a descrição da ação e pode ser expandido para ver os details.action_endLog de AtividadesAtualiza o item correspondente no log. O ícone muda para "sucesso" (✓) ou "falha" (✗). Em caso de falha, a mensagem de erro é visível.file_content_updateÁrvore de FicheirosRealça o ficheiro modificado. Pode opcionalmente mostrar um ícone de "modificado" e, ao passar o rato, exibir o contentSnippet.preview_updateJanela de PreviewSe o status for "updating", mostra um overlay com a mensagem. Se for "ready", atualiza o src do iframe para a nova url. Se for "error", exibe uma mensagem de erro.final_messageCaixa de Mensagem PrincipalRenderiza o content formatado em Markdown, apresentando a resposta conclusiva do Agente de forma rica e legível.user_input_requiredFormulário InterativoExibe a question e renderiza os controlos de input necessários (botões para options, campos de texto, etc.) para capturar a resposta do utilizador.suggestionBotões de SugestãoApresenta uma lista de botões com as suggestions de próximos passos, permitindo ao utilizador guiar o Agente de forma proativa.

Detalhe dos Componentes de UI

O Indicador de Atividade substitui a noção de "o Agente está a escrever", comunicando o estado cognitivo do Agente. É crucial para gerir as expectativas do utilizador durante os períodos em que não há ações visíveis a decorrer. O Painel de Plano de Ação fornece uma visão de alto nível do que o Agente pretende fazer, sendo essencial para a transparência e para dar ao utilizador a confiança de que o Agente compreendeu o pedido. O Log de Atividades, inspirado nos melhores exemplos da concorrência, é o coração da transparência da execução, apresentando um registo imutável e cronológico de todas as ações concretas realizadas pelo Agente. A Árvore de Ficheiros em Tempo Real fornece uma representação visual e sempre atualizada da estrutura do projeto, fundamental para o contexto do desenvolvimento. Finalmente, o Formulário Interativo transforma o diálogo de um monólogo do Agente para uma verdadeira conversação, permitindo que o Agente peça clarificações de forma estruturada.

5. Arquitetura do Sistema de Preview e Deployment em Tempo Real

Para que o sistema seja verdadeiramente avançado e supere a concorrência, o ambiente de preview e deployment deve ser uma parte intrínseca e observável do fluxo de trabalho do Agente, e não uma caixa preta. A sua robustez e a capacidade de fornecer feedback em tempo real são cruciais para uma experiência de desenvolvimento fluida e transparente.

5.1. Componentes Chave da Arquitetura de Preview

Uma arquitetura de preview de alto desempenho e fiabilidade requer a coordenação de vários componentes, cada um com um papel específico na transformação do código gerado pelo Agente numa aplicação web interativa e visível para o utilizador. Estes componentes incluem um Ambiente de Execução Isolado (Sandbox do Agente), um Serviço de Sincronização de Ficheiros (File Sync Service), um Ambiente de Build e Deployment do Preview, um Serviço de Proxy/Gateway e um sistema de Monitorização e Logging.

5.2. Fluxo de Trabalho do Preview em Tempo Real

O fluxo de trabalho para o preview em tempo real é acionado por eventos do Agente e deve ser o mais automatizado possível para proporcionar uma experiência instantânea. O processo inicia-se com a modificação do código pelo Agente, seguida pela sincronização de ficheiros, o acionamento do build/deployment, a atualização do preview e, finalmente, o envio de feedback ao Agente.

5.3. Estratégias de Observabilidade e Diagnóstico

Para que o Agente possa atuar como um engenheiro de software completo, ele precisa de ferramentas para observar e diagnosticar problemas no ambiente de preview. A falta de visibilidade é uma das maiores frustrações no desenvolvimento assistido por IA. O Agente deve ter acesso a logs de build/deployment e de erros em tempo de execução, permitindo-lhe sugerir correções ou aplicá-las autonomamente.

5.4. Integração com fly.io (Exemplo)

Se o fly.io for o serviço de preview escolhido, a integração pode envolver a geração e modificação do ficheiro fly.toml pelo Agente, a execução de comandos fly deploy e o acesso a logs do fly.io para monitorização e diagnóstico.

6. Documentação Técnica Completa e Especificações de Implementação

Esta análise serve como um documento fundamental para a conceção e implementação de um sistema de desenvolvimento assistido por IA de próxima geração. Para garantir a sua completude e utilidade, a documentação técnica final incluirá um glossário de termos, diagramas de arquitetura, a especificação completa do Protocolo Manus, especificações de implementação do Frontend e do Backend/Agente, um guia de configuração e deployment do preview, estratégias de observabilidade e debugging, considerações de segurança e um plano de evolução.

6.1. Implementação de Componentes Visuais Dinâmicos

Os componentes visuais dinâmicos são a chave para uma experiência de utilizador transparente e interativa. A sua implementação depende diretamente do consumo dos eventos estruturados do Protocolo Manus. O Log de Atividades será construído reagindo aos eventos action_start e action_end, mantendo um estado interno no Frontend que representa o log de atividades. A Árvore de Ficheiros em Tempo Real refletirá as alterações no sistema de ficheiros do projeto, sendo atualizada pelos eventos file_content_update e pelas ações file.create/file.delete. Os Formulários Interativos e Sugestões, acionados por user_input_required e suggestion, permitirão que o Agente solicite feedback ou direcione o utilizador.

6.2. Formatação Rica (Bolds, Títulos, Listas)

A formatação rica nas mensagens do Agente é crucial para a legibilidade e para guiar a atenção do utilizador. O Protocolo Manus especifica que as mensagens finais (final_message) e as descrições (description em action_start, plan_update) podem usar Markdown. O Frontend deve incluir uma biblioteca de parsing de Markdown para converter o texto em HTML ou componentes de UI renderizáveis, suportando elementos como negrito, itálico, títulos, listas, blocos de código e links.

6.3. Considerações Técnicas Adicionais

A implementação da comunicação em tempo real exigirá uma ligação persistente entre o Frontend e o Backend, idealmente através de WebSockets. Um store de estado global no Frontend será essencial para gerir o activityLog, a fileTree, o estado do preview e outros dados. O correlacionamento de eventos, através de eventId e actionId, permitirá que o Frontend atualize o estado corretamente.

7. Considerações Éticas e Legais na Aquisição e Integração de Recursos de Design

Para que "O SISTEMA" seja não apenas tecnicamente avançado, mas também eticamente responsável e legalmente sólido, é fundamental abordar a forma como os recursos de design (templates, estilos, componentes) são adquiridos e integrados. A prática de crawling público em plataformas como UI8.net sem permissão explícita é proibida pelos Termos de Serviço e viola direitos autorais, expondo o projeto a riscos legais e de reputação. Em vez disso, devem ser adotadas estratégias que garantam a conformidade e a sustentabilidade.

7.1. Estratégias Legais e Éticas para Aquisição de Recursos de Design

Para enriquecer o sistema com estilos e templates de alta qualidade, sem recorrer a práticas ilícitas, propõem-se as seguintes abordagens: parcerias oficiais com marketplaces de design, indexação exclusiva de metadados públicos, criação de um "Design System VULK®" inspirado e integração com bibliotecas open-source.

7.2. Arquitetura Ética para Geração de Design

A arquitetura de geração de design deve refletir estas considerações éticas e legais. O fluxo proposto para o motor RAGG (Retrieval-Augmented Generation & Generation) do "O SISTEMA" envolve o input do utilizador, a pesquisa na base de dados vetorial, a extração de metadados, a sugestão de templates, a geração de código original, a inclusão de links de compra/créditos e o preview ao vivo.

7.3. Implementação e Indexação de Recursos Open-Source

Para integrar efetivamente as bibliotecas open-source, o "O SISTEMA" deve clonar os seus repositórios, extrair componentes e templates através de scripts de indexação e integrar esta informação no fluxo de IA, permitindo que o Agente utilize estes recursos como referência para gerar código original e adaptado ao projeto.

8. Melhorias e Detalhes Adicionais com Base nos Inputs Fornecidos

Com base nos inputs adicionais fornecidos, é possível refinar e expandir a especificação, abordando pontos críticos de estabilidade, comunicação e integração com ferramentas de design.

8.1. Estabilização do Fluxo Técnico e do Preview

Os problemas de "preview não sobe/é inconsistente" e "mensagens cortadas/sem estilo" são abordados com as seguintes correções e diretrizes:

•
Protocolo Único de Eventos (NDJSON): A comunicação entre o Agente e a UI deve ser estritamente baseada em NDJSON (Newline Delimited JSON) via SSE/WebSocket. Cada linha representa um evento {type, payload, ts}, garantindo que a UI consegue renderizar passos e estados de forma consistente. Este é um refinamento do Protocolo Manus, especificando o formato de transporte.

•
Workspace Único e Fixo: Todas as ações de ficheiro e build devem utilizar um root de workspace único e fixo (ex: /work/{sessionId}). Isto garante que o ambiente de preview sempre "vê" o projeto correto.

•
Ferramentas Explícitas no Orquestrador: O Agente deve invocar ferramentas específicas para operações de sistema de ficheiros (fs.write_file, fs.apply_patch para unidiff, fs.read_json), execução de processos (process.exec com log streaming), gestão de preview (preview.start, preview.stop), integração com Figma (figma.export_map) e controlo de versão (git.init/commit/diff).

•
Logs em Tempo Real: Todo o output de build e execução deve ser transmitido para o chat em tempo real através de eventos log e build_step.

•
Preview SSR Real: Para projetos Next.js/SSR, deve ser levantado um container com pnpm install && pnpm dev (ou next start), integrado com um proxy reverso (ex: Traefik) que injeta uma rota por sessionId (ex: https://{sessionId}.preview.vulk.dev). Para client-only, pode-se usar WebContainer ou sandbox baseado em esbuild no browser.

•
Renderer do Chat Aprimorado: O frontend deve usar bibliotecas como react-markdown com plugins para slugs, autolink-headings e raw HTML (com sanitização), e componentes de atividade dedicados para renderizar os eventos (<Plan />, <FileCreate />, <Patch />, <Command />, <LogStream />, <PreviewLink />, <Error />, <Summary />).

•
Falhas Visíveis e Recuperação: Qualquer erro deve gerar um evento error com code, hint, file?, stderr? e parar o preview/build afetado. O Agente deve ser capaz de aplicar correções e tentar novamente.

•
Traefik e Healthcheck: A configuração do Traefik deve incluir uma rota por sessão, porta interna fixa (ex: 5173/3000) e um healthcheck HTTP para garantir a disponibilidade do preview.

8.2. Integração Avançada com Figma

A integração com o Figma deve ser robusta e precisa, garantindo que o design é replicado 1:1.

•
Design Map: A pipeline deve produzir um Design Map em JSON, contendo screens[] (com name, id, route, width/height, statusBar, variants), components[] (com name, id, props, variants, constraints) e tokens (cores, tipografia, radii, espaçamentos, sombras). Este mapa será injetado no contexto do Agente, forçando o modelo a usá-lo como fonte da verdade.

•
Figma Binding: Para cada screen implementada, o Agente deve emitir um evento figma_link com {screenId, route} e descrever a correspondência de componentes.

•
Consistência Visual: O Agente deve aplicar fielmente os tokens (cores, tipografia, radii, espaçamento, sombras) e replicar tamanhos, weights e line-heights do Figma. Componentes com variantes devem implementar estados reais (CSS/ARIA), e a acessibilidade (labels, roles, aria-*, foco visível, contraste WCAG AA) deve ser garantida.

8.3. Protocolo de Ações (AgentOps v1 - NDJSON)

O protocolo de ações, denominado AgentOps v1, especifica os tipos de eventos NDJSON que o Agente deve emitir para a UI. Estes incluem:

•
plan: Plano de alto nível (bullets curtas).

•
file_write: Cria/substitui um ficheiro.

•
file_patch: Unidiff para alterações localizadas.

•
run: Executa comando (ex: pnpm install, pnpm dev).

•
build_step: Checkpoint com fase + percentagem.

•
figma_link: Resolução de um ecrã/componente do Figma para código.

•
preview_start / preview_ready / preview_stop: Eventos relacionados com o preview.

•
log: Linhas de log (build/dev/test).

•
question: Falta de dado crítico (o orquestrador responde com answer).

•
error: Erro com code, hint, file?, stderr?.

•
done: Sumário conclusivo (sempre o último evento).

8.4. Experiência de Chat (UX) Aprimorada

A experiência de chat será aprimorada através da emissão de eventos específicos que a UI renderizará como componentes visuais:

•
plan: Renderizado como bullets das etapas.

•
ActivityList: Renderiza file_write, file_patch, run, log, preview_ready.

•
FileCreate/Patch: Mostra o diff, com opção de copiar.

•
Command: Comando + status (pending/running/done).

•
PreviewBadge: Botão com previewUrl.

•
ErrorCard: Exibe code, message, hint, com opção de expandir stderr.

•
Summary: Do evento done.

•
Renderer Markdown: Com títulos, negritos, code fences.

8.5. Causas e Soluções para Problemas de Preview

Os problemas comuns de preview e as suas soluções incluem:

•
Workspace Errado: Forçar cwd de todos os run para workspaceRoot.

•
Porta Errada / Traefik: Definir labels por sessão e porta estática do processo (ex: 3000).

•
Build a Falhar: Transmitir stream completo de stdout/stderr ao chat e abortar com error.

•
Ficheiros Gerados mas Falta package.json/scripts: O Agente deve emitir file_write para scripts em package.json e tsconfig.

•
Faltam Tokens/Estilos: O primeiro ciclo deve sincronizar tokens do Figma para Tailwind/tema antes de gerar screens.

9. Conclusão

Esta especificação detalhada, enriquecida pela análise da concorrência e pelos inputs fornecidos, estabelece uma base sólida para o desenvolvimento de "O SISTEMA". A adoção de um protocolo de comunicação baseado em eventos estruturados, a integração precisa com ferramentas de design como o Figma, e a implementação de componentes de UI dinâmicos e um pipeline de preview robusto, permitirão criar uma experiência de desenvolvimento assistido por IA que é transparente, reativa, eticamente responsável e tecnicamente superior às soluções existentes no mercado. O foco na observabilidade, na recuperação de erros e na geração de código 100% original, mas inspirado, posicionará "O SISTEMA" como uma plataforma inovadora e líder no seu segmento.

