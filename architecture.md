# RentProof Architecture

## Overview

RentProof is a tenant-first rental payment record system built on Stellar. The product turns rent payments into portable, verifiable proof that tenants can reuse across future apartment applications. The MVP centers on one core asset: a public rent history profile backed by on-chain payment receipts.

This repository is structured as a small monorepo with:

- `frontend/` for the React landing page and future application dashboards
- `backend/` for API routes, Stellar integrations, and profile reconstruction
- root-level docs for product and system design

## Product Goals

- Let landlords register properties and generate shareable property codes
- Let tenants link themselves to a property and pay rent in USDC or XLM
- Tag each payment with a property identifier using the Stellar memo field
- Reconstruct payment history from Horizon-indexed transaction data
- Publish a clean public rent history profile that future landlords can verify

## MVP Architecture

### Frontend

The frontend is a Vite + React + TypeScript app. For this setup phase, it includes:

- a deployable landing page that explains the RentProof value proposition
- page shells for the main product surfaces described in the README
- reusable UI components and content data to keep the presentation modular

Planned application routes:

- `/` landing page
- `/tenant` tenant dashboard
- `/landlord` landlord dashboard
- `/profile/:tenantId` public rent history profile
- `/property/setup` landlord property registration flow

### Backend

The backend is organized for a small Node.js service with clear separation between:

- `routes/` HTTP endpoints
- `stellar/` blockchain interaction and history reconstruction
- `lib/` shared infrastructure such as database access

Key responsibilities:

- store off-chain metadata for properties, tenants, and shareable property codes
- create and verify Stellar payment instructions
- index Horizon transaction data by wallet, memo, and property
- assemble tenant payment summaries for public profile pages

### Data Model

Core entities for the MVP:

- `Landlord`: profile, Stellar wallet address, managed properties
- `Property`: address, rent amount, currency, due day, property code
- `Tenant`: display identity, linked properties, wallet address
- `RentPayment`: transaction hash, amount, asset, timestamp, memo, status
- `RentHistoryProfile`: derived tenant-facing summary across one or more properties

Off-chain storage keeps metadata and presentation details. On-chain data remains the source of truth for payment verification.

## Payment Flow

1. A landlord registers a property and receives a unique property code.
2. A tenant links to that property inside RentProof.
3. The frontend initiates a Stellar payment flow for USDC or XLM.
4. The transaction memo includes a property-specific identifier.
5. The landlord receives funds directly in their Stellar wallet.
6. The backend reads Horizon transaction data and maps the payment back to the tenant and property.
7. The tenant's public rent history profile updates with the new verified receipt.

## Folder Guide

```text
RentProff/
|-- architecture.md
|-- package.json
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- data/
|   |   |-- pages/
|   |   `-- styles/
`-- backend/
    `-- src/
        |-- lib/
        |-- routes/
        `-- stellar/
```

## Implementation Notes

- The MVP flow described above is implemented end-to-end against the Stellar Testnet: property registration, tenant linking by code, Stellar payment with memo tagging (via Freighter, or a labeled demo-mode Testnet account for trying the flow without the extension), a Horizon-backed indexing poller, and real data on both dashboards and the public Rent History Profile page.
- The off-chain store is SQLite rather than PostgreSQL for MVP simplicity. The schema (`backend/src/db/schema.ts`) is plain relational SQL with no SQLite-specific features, so moving to PostgreSQL is a localized change to the DB client, not a data-model rewrite.
- There is no auth layer yet — "login" is just supplying a Stellar wallet address, which is sufficient for a public, wallet-identified rent history product but will need real wallet-signature verification before any sensitive write path is exposed beyond a local demo.
- Horizon indexing is a simple interval poller, not a stream — fine at MVP scale, worth revisiting for latency at real scale.

## Next Build Steps

- verify wallet ownership via a signed challenge instead of a freely-typed address, before this goes beyond a demo
- move off-chain storage from SQLite to PostgreSQL for concurrent/production use
- replace interval polling with Horizon's streaming (SSE) API for near-instant indexing
- late payment detection/flagging and reminder notifications
- mainnet support once the Testnet flow has been exercised further
