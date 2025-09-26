# VULK® - The Voice-Controlled, AI-Powered Full-Stack Platform

<div align="center">
  <h3>Transform Voice Commands into Complete Applications</h3>
  <p>The first platform that combines AI, voice control, and real-time collaboration for full-stack development</p>
</div>

<div align="center">
  <a href="#-features">Features</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-documentation">Documentation</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</div>

## ✨ What is VULK®?

VULK® is the first platform of development full-stack that combines artificial intelligence, voice control, and real-time collaboration to allow developers to create and deploy complete applications in minutes, not months.

### Key Highlights

- 🎤 **Voice-to-Code Technology**: First platform with voice control and eye-tracking
- 🤖 **AI-Powered Development**: Complete full-stack generation with multiple AI providers
- 👥 **Real-Time Collaboration**: Multi-user editing with voice chat and screen sharing
- 🚀 **One-Click Deployment**: Deploy to Vercel, Netlify, Cloudflare with custom domains
- 🎨 **Quality by Design**: Automated quality gates and AST-based deterministic patching

## 🚀 Features

### Voice-to-Code Technology
- Speech recognition with WebRTC-based streaming STT
- Eye-tracking integration for element selection
- Natural language processing for development commands
- AST-based deterministic patching

### Full-Stack Generation
- Complete applications: Frontend + backend + database
- Multi-framework support: React, Vue, Svelte, Flutter
- Backend packs: Express, Supabase, Cloudflare Workers
- Database integration: PostgreSQL, MySQL, MongoDB

### Real-Time Collaboration
- Multi-user editing without conflicts
- Voice chat integration during development
- Live cursors and screen sharing
- Team management with permissions and roles

### AI-Powered Development
- Gemini-first approach with multi-provider support
- Intelligent routing with automatic fallback
- Cost optimization with diffs and batch processing
- RAGG (Retrieval + governance) system

## 🛠 Getting Started

### Prerequisites
- Node.js 18.x or later
- PostgreSQL database
- WebRTC-compatible browser for voice features
- Git

### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/devjoaocastro/vulk.git
cd vulk
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Copy the contents from `.env.example`
   - Fill in your configuration values

4. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to start generating UI components!

## 🔧 Environment Setup

Create a `.env.local` file with:

```env
# Database
DATABASE_URL=postgresql_url_here

# Authentication
AUTH_SECRET=your_auth_secret
AUTH_GITHUB_ID=your_auth_github_id
AUTH_GITHUB_SECRET=your_auth_github_secret

# Optional: Redis for view count
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
```

## 🤖 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com), [NextUI](https://nextui.org)
- **Database**: PostgreSQL with [Prisma](https://prisma.io)
- **Authentication**: [NextAuth.js](https://next-auth.js.org)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs)
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai)

## 📚 Documentation

- Architecture: `docs/architecture.md`
- Preview Flow: `docs/preview.md`
- Deploy Integrations: `docs/deploy.md`
- AI Router: `docs/ai-router.md`
- Billing and Metering: `docs/billing.md`
 - Translation Cleanup: `docs/translation.md`

## 🤝 Contributing

We welcome contributions! Check out our [Contributing Guide](CONTRIBUTING.md) to get started.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [v0.dev](https://v0.dev) for inspiration
- [Vercel](https://vercel.com) for the AI SDK
- [shadcn/ui](https://ui.shadcn.com) for UI components
- [NextUI](https://nextui.org) for additional components

---

## 📦 Deployment

There are two safe ways to deploy to production without Prisma engine mismatches:

### Option A — Cloud build on Vercel (recommended)
- Deploy without prebuilt artifacts so Vercel builds on Linux and generates Prisma Client for the correct target.
- Use either:
  - `vercel --prod` (no `--prebuilt`)
  - Git-based deployments (push to the connected repo)

### Option B — Prebuilt deploy, but build on Linux via Docker
If you need `--prebuilt`, ensure the build runs in Linux and includes the `linux-arm64-openssl-3.0.x` Prisma Query Engine.

Example command:

```bash
docker run --rm -v "$PWD":/app -w /app --platform=linux/arm64 node:20 bash -lc "\
  corepack enable && \
  pnpm i --frozen-lockfile && \
  npx prisma generate && \
  pnpm build && \
  npx vercel deploy --prebuilt --prod\
"
```

Important:
- `prisma/schema.prisma` already includes `binaryTargets = ["native", "linux-arm64-openssl-3.0.x"]`.
- Never ship artifacts built on macOS to Vercel using `--prebuilt` (they contain darwin engines).

See detailed instructions in `docs/DEPLOYMENT.md`.

## 🧪 CI/CD Guardrails

We include a GitHub Actions workflow that:
- Runs on Linux, installs deps, runs `prisma generate`, and builds the app.
- Verifies the Prisma Query Engine for `linux-arm64-openssl-3.0.x` is present.

Files:
- `.github/workflows/ci.yml`
- `scripts/check-prisma-engines.mjs`

## 🧰 Debugging & Monitoring

- Debug page: `src/app/debug/page.tsx` shows end-to-end reasoning and message flow for UI generation.
- Server logging endpoint: `src/app/api/log-error/route.ts` collects runtime errors from the preview.
- Client preview: `src/components/preview-screen.tsx` sanitizes and transforms code and reports issues.
- For auth/session tests and linter checks, see the `test-*.js` scripts in the repo.

## 🔐 Environment Variables (extended)

Required:
- `DATABASE_URL`
- `AUTH_SECRET`

Common (optional) providers via `src/lib/llm.ts`:
- `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `AZURE_OPENAI_API_KEY`, `GEMINI/GOOGLE_GENERATIVE_AI_API_KEY`, `MISTRAL_API_KEY`, `COHERE_API_KEY`, `VERTEX_*`, `BEDROCK_*`, `OLLAMA_*`, etc.

Utilities:
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (for caching/metrics)

Tuning (optional):
- `OPENAI_DEFAULT_MODEL` (default: `openai:gpt-4o-mini`)
- `OPENAI_TEMPERATURE` (default: `0.7` if unset)
- `OPENAI_MAX_TOKENS` (omit to let the provider decide)

Validation helper: `validate-env.js` checks and reports missing keys at startup.

## 🧯 Troubleshooting

- __Prisma engine mismatch on Vercel__ (500 at `/` or `/api/auth/session`):
  - Cause: Prebuilt artifacts from macOS shipped `darwin` engines; Vercel requires `linux-arm64-openssl-3.0.x`.
  - Fix: Redeploy without `--prebuilt` or build prebuilt within Linux (Docker). Ensure `schema.prisma` binaryTargets include `linux-arm64-openssl-3.0.x`.

- __Babel transform error in preview__ (“Preset requires a filename”):
  - Fixed: `src/components/preview-screen.tsx` passes `filename` to the Babel transform; update is already in place.

- __`UI.updatedAt` not updating__:
  - Ensure `updatedAt` is set server-side during creation or add `@updatedAt` attribute in `schema.prisma` where applicable.

## 🧠 Error Knowledge Base (KB)

We plan and recommend an internal Error KB to store recurring error signatures and proven remediations for fast, automatic triage:

- Schema (Prisma) proposal: `ErrorPattern`, `Solution`, `ErrorOccurrence`, `Recommendation`.
- Fast lookup: hash(message + top stack frames) → Redis cache for O(1), fallback to Postgres.
- Capture points: server API and client preview send standardized payloads to `/api/log-error`.
- Observability: dashboard listing top errors, MTTR, solution success rate.

Details and a step-by-step rollout plan are documented in `docs/ERROR-KB.md`.

## ✅ Production Checklist

- Do not use `vercel --prebuilt` unless building on Linux.
- Ensure `binaryTargets = ["native", "linux-arm64-openssl-3.0.x"]` in `prisma/schema.prisma`.
- Run `npx prisma generate` during CI/Cloud build.
- Confirm `scripts/check-prisma-engines.mjs` passes in CI.
- Verify `/debug` page and `/api/log-error` are functional.

## 📞 Contact & Information

### Company Information
- **Company:** VULK® Technologies
- **Website:** [vulk.dev](https://vulk.dev) | [vulk.pt](https://vulk.pt)
- **Status:** ✅ Platform Complete and Ready for Launch
- **Version:** v0.2 (95% Complete) + v0.3 (Advanced Systems Implemented)

### Team
- **João Castro:** Founder & CEO
- **Email:** joao@vulk.dev
- **Investors:** investors@vulk.dev
- **Support:** tech@vulk.dev

### Demo & Resources
- **Live Demo:** [demo.vulk.dev](https://demo.vulk.dev)
- **Free Trial:** [trial.vulk.dev](https://trial.vulk.dev)
- **Documentation:** [docs.vulk.dev](https://docs.vulk.dev)
- **GitHub:** [github.com/VULK-dev](https://github.com/VULK-dev)

### Business Model
- **Free:** €0/mês (7 days trial)
- **Starter:** €19/mês (3 projetos, 1 domínio próprio)
- **Pro:** €49/mês (10 projetos, API access)
- **Team/Enterprise:** Custom pricing

---

**© 2025 VULK® Technologies. All rights reserved.**
