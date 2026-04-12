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

- The landing page is intentionally isolated from app logic so it can be deployed immediately.
- Placeholder app pages are included to make contributor onboarding easier.
- Backend modules are scaffolded with typed entry points to reflect the README's intended implementation path.
- The structure is optimized for Wave MVP delivery first, then iterative expansion in later sprints.

## Next Build Steps

- add routing and auth state for landlord and tenant flows
- implement property registration and tenant linking forms
- add backend API handlers and PostgreSQL models
- integrate Stellar SDK payment creation and Horizon history indexing
- render real tenant profile data through a server-backed public page
