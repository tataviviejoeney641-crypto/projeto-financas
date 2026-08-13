# Projeto Finanças

![CI](https://github.com/tataviviejoeney641-crypto/projeto-financas/workflows/CI/badge.svg)
![License: MIT](https://img.shields.io/badge/license-MIT-green)

Aplicativo para gerenciamento de despesas pessoais e geração de insights financeiros, com foco em mobile (Expo) e web.

Resumo
- Interface: React + Expo + NativeWind (Tailwind para React Native)
- Backend: Node.js + Express + TRPC
- Banco/ORM: Drizzle (migrations e schema dentro de `drizzle/`)
- Testes: Vitest
- Lint/format: ESLint / Prettier

Principais funcionalidades
- Criar, editar e categorizar despesas
- Relatórios e insights por período/categoria
- Autenticação via OAuth (provedores configuráveis)

Instalação e execução (rápido)
1. Instale dependências: `pnpm install` (recomendado) ou `npm install`
2. Crie `.env` conforme necessário (veja `scripts/load-env.js` para dicas)
3. Rodar em desenvolvimento (servidor + Metro/Expo):

```bash
pnpm dev
```

Scripts úteis
- `pnpm dev` — roda servidor e Metro/Expo em paralelo
- `pnpm build` — empacota o servidor com `esbuild`
- `pnpm start` — inicia build de produção
- `pnpm lint` — executa ESLint (`expo lint`)
- `pnpm test` — roda testes com Vitest
- `pnpm check` — checa tipos com `tsc`

Contribuindo
- Abra issues e PRs; siga o padrão de commits e execute `pnpm lint` e `pnpm test` antes de abrir PRs.

Arquitetura e documentação
- Veja `docs/architecture.md` para um resumo da arquitetura do projeto.

Licença
Este projeto é licenciado sob a Licença MIT — veja o arquivo `LICENSE`.