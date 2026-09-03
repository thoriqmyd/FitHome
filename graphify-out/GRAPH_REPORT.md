# Graph Report - homefit  (2026-09-02)

## Corpus Check
- Corpus is ~13,356 words - fits in a single context window. You may not need a graph.

## Summary
- 208 nodes · 260 edges · 16 communities (11 shown, 2 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.83)
- Token cost: 12,000 input · 3,000 output

## Community Hubs (Navigation)
- Routing & Route Tree
- Core Dependencies
- TypeScript Configuration
- Authentication & Session
- Dev Toolchain
- Landing UI & Dashboard
- API Layer & Elysia
- Database Schema & Programs
- Package Scripts & Build
- Exercise Data & Logic
- Opencode Configuration
- Graphify Plugin
- Auth Client Hooks

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 20 edges
2. `FileRoutesByPath` - 12 edges
3. `FitHome Fitness Platform` - 7 edges
4. `relations` - 6 edges
5. `getSession` - 6 edges
6. `scripts` - 5 edges
7. `Graphify Knowledge Graph` - 5 edges
8. `Dashboard User & System Features` - 5 edges
9. `db` - 4 edges
10. `auth` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Premium Payment Modal` --conceptually_related_to--> `user`  [INFERRED]
  index.html → src/db/schema.ts
- `Programs Section` --conceptually_related_to--> `exercise`  [INFERRED]
  index.html → src/db/schema.ts
- `Auth Modal (Login/Register)` --conceptually_related_to--> `auth`  [INFERRED]
  index.html → src/lib/auth.ts
- `HomeFit Project` --semantically_similar_to--> `FitHome Fitness Platform`  [INFERRED] [semantically similar]
  README.md → index.html
- `Graphify Knowledge Graph` --conceptually_related_to--> `HomeFit Project`  [INFERRED]
  AGENTS.md → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Dashboard & Workout System Flow** — index_dashboard_user, index_workout_flow, index_programs_section, index_auth_modal [INFERRED 0.85]
- **FitHome Landing Composition** — index_fithome, index_hero_section, index_features_strip, index_programs_section, index_navigation_system [EXTRACTED 1.00]

## Communities (16 total, 2 thin omitted)

### Community 0 - "Routing & Route Tree"
Cohesion: 0.07
Nodes (27): getRouter(), Route, TABS, Route, ApiSplatRoute, AuthLoginRoute, AuthRegisterRoute, AuthRoute (+19 more)

### Community 1 - "Core Dependencies"
Cohesion: 0.07
Nodes (27): better-auth, @better-auth/drizzle-adapter, drizzle-orm, elysia, @elysia/eden, @elysia/openapi, dependencies, better-auth (+19 more)

### Community 2 - "TypeScript Configuration"
Cohesion: 0.08
Nodes (24): bun, DOM, DOM.Iterable, ESNext, compilerOptions, allowImportingTsExtensions, allowJs, jsx (+16 more)

### Community 3 - "Authentication & Session"
Cohesion: 0.14
Nodes (11): authClient, ensureSession, getSession, Route, styles, Route, styles, Route (+3 more)

### Community 4 - "Dev Toolchain"
Cohesion: 0.11
Nodes (19): drizzle-kit, devDependencies, drizzle-kit, tsx, @types/bun, @types/node, @types/pg, @types/react (+11 more)

### Community 5 - "Landing UI & Dashboard"
Cohesion: 0.12
Nodes (16): Community Structure, God Nodes, Graphify Knowledge Graph, Graphify Query, Graphify Update, Auth Modal (Login/Register), Dashboard User & System Features, Features Strip (+8 more)

### Community 6 - "API Layer & Elysia"
Cohesion: 0.14
Nodes (9): api, Route, btnGhost, btnPrimary, btnSec, Exercise, Phase, Route (+1 more)

### Community 7 - "Database Schema & Programs"
Cohesion: 0.21
Nodes (12): Premium Payment Modal, Programs Section, Strength Training, account, exercise, exerciseLevels, exerciseTypes, exerciseVariations (+4 more)

### Community 8 - "Package Scripts & Build"
Cohesion: 0.15
Nodes (12): module, name, peerDependencies, typescript, private, scripts, build, db:generate (+4 more)

### Community 9 - "Exercise Data & Logic"
Cohesion: 0.27
Nodes (5): db, getExercise, getExercises, exerciseRoute, Route

### Community 10 - "Opencode Configuration"
Cohesion: 0.50
Nodes (3): plugin, $schema, .opencode/plugins/graphify.js

## Knowledge Gaps
- **98 isolated node(s):** `$schema`, `.opencode/plugins/graphify.js`, `name`, `module`, `type` (+93 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 115 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `FitHome Fitness Platform` connect `Landing UI & Dashboard` to `Database Schema & Programs`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Core Dependencies` to `Package Scripts & Build`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **What connects `$schema`, `.opencode/plugins/graphify.js`, `name` to the rest of the system?**
  _98 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Routing & Route Tree` be split into smaller, more focused modules?**
  _Cohesion score 0.06951871657754011 - nodes in this community are weakly interconnected._
- **Should `Core Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `TypeScript Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Authentication & Session` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._