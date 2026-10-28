# Velto — Structured Products Platform (Prototype)

A React + TypeScript + Vite starting point based on the Velto master product and engineering prompt. This is a **UI prototype**, not a production trading system.

## Included in this first slice

- Dark professional workspace UI with a light-theme toggle.
- Navigation between AI Capture, Quote Workbench, Trading, Ticket, Blotter and Product Catalogue.
- Clearly labelled local demo quote data.
- AI Capture flow: request input → optional context → deterministic local parsing/review → explicit human confirmation → local quote creation.
- Multi-quote workbench with editable draft fields, selection, comparison and simulated price/solve actions.
- Ticket and Blotter views over the same in-memory quote objects.
- Simulated Trading approval action.
- Responsive layouts and toast feedback.

## Important limitations

- No backend, database, authentication, enterprise SSO, authorization enforcement, Temporal, LLM, market data, production pricing engine, booking service or document generation is connected.
- Demo pricing and solving values are illustrative and must not be used for trading or client communication.
- Quote state lives only in browser memory and resets on refresh.
- Quote IDs created in the session are local prototype IDs, not IDs from a real platform.
- The local parser uses deterministic regular expressions. It is not an LLM parser or independent reviewer; confidence/findings are UI demonstrations only.
- Product Studio is represented as a planned capability, not an implemented authoring system.

## Integration contract proposal

See [`docs/integrations/bank-rfq-contract.md`](docs/integrations/bank-rfq-contract.md) for a proposed bank RFQ, acknowledgement, and quote exchange schema. It documents a future integration only; no SFTP or API connection is configured in this prototype.

The product brief used for this implementation is preserved in [`docs/VELTO_MASTER_PROMPT.md`](docs/VELTO_MASTER_PROMPT.md).

## Requirements

- Node.js 20.19+ or 22.12+ recommended.
- npm.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Build check

```bash
npm run build
npm run preview
```

## Project structure

```text
velto/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── src/
    ├── App.tsx                 # View routing, local state and prototype flows
    ├── main.tsx                # React entry point
    ├── styles.css              # Dark/light design system and responsive layout
    ├── components/
    │   ├── QuoteTable.tsx
    │   ├── Sidebar.tsx
    │   ├── StatCard.tsx
    │   ├── StatusBadge.tsx
    │   └── Topbar.tsx
    ├── data/
    │   └── demo.ts              # Explicit demo seed records
    └── types/
        └── index.ts             # Frontend domain types
```

## Recommended next engineering steps

1. Review the UI and agree on the first slice of product behavior.
2. Add automated component and workflow tests; baseline the build in the target environment.
3. Define versioned product/quote contracts based on the actual AutocallablePlus pricing contract.
4. Introduce API boundaries and backend-owned business state before adding durable workflow behavior.
5. Design parser and reviewer contracts separately from quote creation commands.
6. Add Kotlin services, persistence, authorization and Temporal only with explicit workflow boundaries and idempotency semantics.
