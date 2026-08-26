---
name: agents-md
description: Chuẩn mực định dạng và cấu trúc tệp AGENTS.md: Hướng dẫn tổ chức rules, conventions, stack công nghệ và chỉ dẫn tối ưu cho AI Assistant.
---

# ðŸ¤– AGENTS.md

> Agent instruction ve conventions dosyalarÄ± oluÅŸturma rehberi.

---

## ðŸ“‹ AGENTS.md Nedir?

AGENTS.md, AI coding assistant'larÄ±n proje Ã¶zelinde kurallara uymasÄ±nÄ± saÄŸlayan convention dosyasÄ±dÄ±r.

### KullanÄ±m AlanlarÄ±
- Proje spesifik kurallar
- Kod stili conventions
- Dizin yapÄ±sÄ± aÃ§Ä±klamalarÄ±
- YasaklÄ± pattern'ler
- Ã–nerilen yaklaÅŸÄ±mlar

---

## ðŸ“ Root AGENTS.md Template

```markdown
# AGENTS.md

Bu proje iÃ§in AI assistant kurallarÄ±.

## Proje Genel BakÄ±ÅŸ
[Projenin kÄ±sa aÃ§Ä±klamasÄ±]

## Tech Stack
- Framework: Next.js 15
- Language: TypeScript
- Styling: Tailwind CSS
- Database: PostgreSQL

## Dizin YapÄ±sÄ±
\`\`\`
src/
â”œâ”€â”€ app/           # Next.js App Router pages
â”œâ”€â”€ components/    # React components
â”œâ”€â”€ lib/           # Utility functions
â”œâ”€â”€ hooks/         # Custom React hooks
â””â”€â”€ types/         # TypeScript types
\`\`\`

## Kod Conventions

### Naming
- Components: PascalCase (`UserProfile.tsx`)
- Hooks: camelCase with `use` prefix (`useAuth.ts`)
- Utils: camelCase (`formatDate.ts`)

### Imports
- Absolute imports: `@/components/...`
- Group order: React > External > Internal > Types

## Yasaklar
- âŒ `any` type kullanma
- âŒ `console.log` production'da
- âŒ Inline styles

## Tercih Edilenler
- âœ… Server Components (default)
- âœ… Zod validation
- âœ… Error boundaries
```

---

## ðŸ“‚ Nested AGENTS.md (ModÃ¼l BazlÄ±)

### src/components/AGENTS.md
```markdown
# Components Conventions

## Component YapÄ±sÄ±
\`\`\`tsx
// 1. Imports
// 2. Types
// 3. Component
// 4. Export
\`\`\`

## Props
- Interface ile tanÄ±mla
- `Props` suffix kullan

## Styling
- Tailwind class'larÄ± kullan
- `cn()` utility ile merge
```

### src/api/AGENTS.md
```markdown
# API Conventions

## Endpoint YapÄ±sÄ±
- RESTful naming
- Versioning: `/api/v1/`

## Error Handling
- Consistent error response format
- HTTP status codes doÄŸru kullan
```

---

## ðŸ—ºï¸ Feature Map

```markdown
## Feature: User Authentication

### Paths
- Entry: `src/app/(auth)/login/page.tsx`
- API: `src/app/api/auth/[...nextauth]/route.ts`
- Components: `src/components/auth/`
- Hooks: `src/hooks/useAuth.ts`

### Tests
- Unit: `__tests__/auth/`
- E2E: `e2e/auth.spec.ts`

### Docs
- `docs/auth.md`
```

---

## ðŸ”„ Monorepo YapÄ±sÄ±

```markdown
# Monorepo AGENTS.md

## Packages
| Package | Path | Purpose |
|---------|------|---------|
| @acme/web | apps/web | Next.js frontend |
| @acme/api | apps/api | Express backend |
| @acme/ui | packages/ui | Shared components |
| @acme/utils | packages/utils | Shared utilities |

## Cross-Package Rules
- UI components: `@acme/ui` kullan
- Utils: `@acme/utils` kullan
- Duplicate code yasak
```

---

*AGENTS.md v1.0 - Convention Over Configuration*

## ðŸ”„ Workflow

> **Kaynak:** [AGENTS.md Best Practices](https://agents.md)

### AÅŸama 1: Context Extraction
- [ ] **Read Project Config**: `package.json`, `tsconfig.json`, `.eslintrc`.
- [ ] **Map Directory Structure**: Identify key folders (`src`, `app`, `lib`).
- [ ] **Identify Unwritten Rules**: Look at existing code for naming patterns (PascalCase vs camelCase).

### AÅŸama 2: Root Creation (`/AGENTS.md`)
- [ ] **Project Overview**: One sentence goal description.
- [ ] **Tech Stack**: List core frameworks and libraries.
- [ ] **Architecture**: High-level map of the system.
- [ ] **Conventions**: Explicit naming and coding rules.

### AÅŸama 3: Rule Definitions
- [ ] **Must Haves**: "Always use TypeScript strict mode", "Always use Zod".
- [ ] **Must Nots**: "No `any`", "No `console.log` in prod", "No class components".
- [ ] **Preferred**: "Prefer functional components", "Prefer arrow functions".

### AÅŸama 4: Nested & Maintenance
- [ ] **Sub-modules**: Create specific `AGENTS.md` for `src/components`, `src/api` if complex.
- [ ] **Sync**: Update `AGENTS.md` when adding new tech or changing patterns.

### Kontrol NoktalarÄ±
| AÅŸama | DoÄŸrulama |
|-------|-----------|
| 1 | Proje yapÄ±sÄ± doÄŸru anlaÅŸÄ±lmÄ±ÅŸ |
| 2 | Root dosya mevcut ve okunabilir |
| 3 | AI kurallarÄ± ihlal etmiyor (test et) |

