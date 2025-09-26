# k0d AI Development Guide

## Project Overview
K0D is an open-source UI component generator that transforms text prompts into React components using multiple AI providers. The platform supports multiple UI frameworks and provides real-time preview and deployment capabilities.

## Core Architecture

### Key Components
- **AI Router** (`src/ai/router.ts`): Routes tasks to appropriate AI providers with usage metering
- **Web Container Preview** (`src/components/WebContainerPreview.tsx`): Handles live component previews
- **Deploy System**: Supports multiple providers (Netlify/Vercel/Cloudflare) via `src/app/api/deploy/*`

### Data Flow
1. User input → Chat UI → Agents Orchestrator → AI Router → Provider
2. Preview: Generated code → WebContainer mount → Dev server → Preview iframe
3. Deploy: Code snapshot → Provider API → Status updates to UI

## Development Patterns

### Component Architecture
- Use TypeScript for all new components and features
- Follow Single Responsibility principle in component design
- Implement proper error boundaries and loading states
- Structure: `src/components/` for shared components, `src/app/*/_components/` for route-specific ones

### State Management
- Global state: Zustand store
- Form state: React Hook Form
- Server state: Next.js server components

### AI Integration Practices
- Always meter LLM calls through `meteredLLMCall` wrapper
- Handle provider-specific logic in `src/ai/providers/`
- Sanitize model outputs before preview rendering

### Styling Conventions
- Use Tailwind CSS with shadcn/ui components
- Theme customization via `src/lib/themes.ts`
- Follow mobile-first responsive design

## Common Workflows

### Adding New Features
1. Add route in `src/app/`
2. Create components in `_components/`
3. Wire up AI providers if needed
```instructions
# k0d AI Development Guide (concise)

Overview
- k0d transforms natural language prompts into React UI components and small apps. It uses a router/orchestrator abstraction to pick an LLM provider, sanitizes and validates generated code, and offers two preview modes: fast in-browser (react-live) and full dev environment (WebContainer).

What to read first
- `src/lib/ai/orchestrator.ts` — planning, task inference, and streaming helpers (text + structured).
- `src/ai/router.ts` — routing rules and `getClientForTask` (provider presets per TaskKind).
- `src/lib/prompts/generation.ts` — canonical system prompt; generators must follow SUMMARY / PLAN / ===CODE=== format.
- `src/lib/code-trim.ts` — extraction & sanitization of model output (removes fences, dedups functions, wraps JSX).
- `src/components/SandpackViewer.tsx` and `src/components/WebContainerPreview.tsx` — preview strategies.

Key conventions (do not change lightly)
- Prompt output: models are instructed to emit SUMMARY (1–3 lines), a numbered PLAN (3–6 steps), then a separator line `===CODE===` followed by raw JSX/TSX. The server extracts code from after the separator in `src/lib/code-trim.ts`.
- Meter all LLM usage via the billing wrapper at `src/billing/meteredLLMCall.ts` when calling non-stream helpers; orchestrator streaming uses `ai` SDK streams.
- Routing: add new provider adapters under `src/ai/providers` and register selection rules in `src/ai/router.ts`.

Streaming & client UX
- `/api/chat` (see `src/app/api/chat/route.ts`) returns an SSE stream. The server now emits an initial SSE event `metadata` containing {summary,plan,model,provider} and also injects a plain-text summary/plan chunk so existing clients consuming the text stream display the AI "thinking" immediately.

Developer workflows
- Dev server: `pnpm dev` (runs `next dev --turbo`).
- Lint: `pnpm run lint` (uses Biome). Fixes are suggested by the linter; many existing rules flag `noExplicitAny` — prefer explicit types.
- Tests: unit tests live under `src/**/__tests__` (run `pnpm test` if present). Add integration harnesses for new providers.

Pitfalls & gotchas
- Avoid embedding markdown fences in .ts/.tsx prompt files (previously broke module parsing).
- `llm(modelId)` may return different provider model objects; casts or typings may be required when calling `generateText` vs `streamText` (follow patterns in `src/ai/router.ts`).
- Sanitization must run before mounting preview code — use `src/lib/advanced-react-linter.ts` / `src/lib/code-trim.ts`.

Useful file map
- Orchestrator & routing: `src/lib/ai/orchestrator.ts`, `src/ai/router.ts`, `src/ai/types.ts`
- Prompt templates: `src/lib/prompts/*.ts` (generation, creative, element-property)
- Code processing: `src/lib/code-trim.ts`, `src/lib/advanced-react-linter.ts`
- Preview: `src/components/SandpackViewer.tsx`, `src/components/WebContainerPreview.tsx`, `src/components/generator/PreviewPane.tsx`
- Billing/tracing: `src/billing/meteredLLMCall.ts`, `src/lib/trace.ts`, `src/lib/llm-logger.ts`

When making changes
- Keep prompt format stable (SUMMARY/PLAN/===CODE===) or update both prompt templates and `code-trim` extraction.
- If you add a provider adapter, include: provider factory in `src/lib/llm.ts`, adapter in `src/ai/providers/`, and routing rule in `src/ai/router.ts`.

If unclear points remain, ask for: intended preview flow (Sandpack vs WebContainer), whether to prefer structured streaming (`streamStructured`) for a new feature, or which provider to prioritize for UI generation quality.

``` 
