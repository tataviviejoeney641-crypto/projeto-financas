# Arquitetura do Projeto — Projeto Finanças

Visão geral de alto nível:

- Frontend
  - Stack: React + Expo (Mono-repo style supporting mobile + web)
  - Estilo: NativeWind (Tailwind para React Native)
  - Roteamento: `expo-router` para navegação entre telas
  - Build/runtime: Metro para mobile; `expo start` para dev

- Backend
  - Stack: Node.js + Express
  - RPC: TRPC para comunicação tipada entre client/server
  - ORM: Drizzle (migrations em `drizzle/migrations`, schema em `drizzle/schema.ts`)
  - Serviços: endpoints para autenticação, gerenciamento de despesas, geração de relatórios

- Dados
  - Banco: MySQL (dependência `mysql2`) ou adaptável via Drizzle
  - Migrations e snapshots versionadas em `drizzle/meta/`

- Testes e Qualidade
  - Testes: Vitest (scripts em `package.json`)
  - Lint: ESLint (via `expo lint`)
  - Typecheck: `tsc --noEmit`

- Infra & DevOps
  - CI: GitHub Actions (`.github/workflows/ci.yml`) roda typecheck, lint, testes e build
  - Deploy: artefatos do servidor empacotados com `esbuild` (script `build`), deployment externo depende da infra escolhida

Notas de extensão
- Autenticação: OAuth providers configurados em `server/_core/oauth.ts`
- Integrações: geração de QR, image generation, transcrição de voz (hooks em `server/_core`)
