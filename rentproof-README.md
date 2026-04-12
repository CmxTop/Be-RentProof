# RentProof 🏠

> **Your rent history, on-chain. Own your payment record — carry it anywhere.**

---

## The Problem

In Lagos, renting a new apartment requires either a guarantor, a huge upfront deposit, or both. Landlords demand this because they have no way to verify whether a prospective tenant actually pays rent reliably. There's no credit history for renters in Nigeria. No tenant registry. No paper trail that a tenant owns and controls.

From the tenant's side, the problem is just as bad. Landlords collect cash or bank transfers and issue paper receipts — or nothing at all. When a dispute arises ("you missed two months"), the tenant has no clean proof. Bank statements help, but they require extra steps to obtain and don't tie payments to a specific property.

The result: **tenants are always at a disadvantage**, and landlords who act in bad faith face no accountability.

RentProof solves this with a single, clear idea — every rent payment goes on-chain, and the tenant owns that record forever.

---

## What It Does

RentProof is a simple web app where:

1. **A landlord registers a property** and sets the monthly rent amount.
2. **A tenant links to the property** via a unique property code shared by the landlord.
3. **The tenant pays rent** monthly through RentProof using USDC or XLM on Stellar.
4. **Every payment is recorded on-chain** — timestamped, immutable, tied to the property address.
5. **After 3+ months**, the tenant has a verifiable rent history they can share as a link with any future landlord — like a rental credit score, but one they fully own.

No disputes module. No governance. No token. Just a permanent, tamper-proof receipt trail that belongs to the tenant.

---

## Why Stellar

- **Immutability** — payments recorded on Stellar cannot be altered or deleted by either party.
- **Low cost** — at ~$0.0007 per transaction, recording every monthly payment is essentially free.
- **USDC on Stellar** — stable, dollar-pegged payments eliminate naira volatility concerns for landlords.
- **No intermediary** — the tenant pays directly to the landlord's Stellar address. RentProof just witnesses and records it.
- **Portable history** — because it's on-chain, the tenant's payment history exists independently of RentProof. Even if the app shuts down, the record lives on Stellar forever.

---

## Core Features

| Feature | Description |
|---|---|
| Property Registration | Landlords register properties with rent amount and payment due date. |
| Tenant Linking | Tenants connect to a property using a shareable code. |
| Monthly Rent Payment | Tenants pay via USDC/XLM through RentProof. Payment goes directly to landlord's wallet. |
| On-chain Receipt | Every payment is logged on Stellar with timestamp, amount, and property reference. |
| Rent History Profile | Tenants get a public, shareable payment history URL — their proof of reliability. |
| Landlord Dashboard | Landlords see payment status for each property at a glance. |
| Tenant Dashboard | Tenants see their full history across all properties they've ever rented. |

---

## The Rent History Profile

The most important feature in RentProof is the **Rent History Profile** — a clean, shareable page that shows:

```
Tenant: Ade Bello
──────────────────────────────────────────
Property: 14B Ajao Estate, Lagos
Period:   Jan 2024 – Dec 2024 (12 months)
Status:   ✅ All payments made on time

Property: 3 Lekki Phase 1 Close, Lagos
Period:   Jan 2025 – Present (15 months)
Status:   ✅ All payments made on time
──────────────────────────────────────────
Verified on Stellar · Last updated: April 2026
[View on Stellar Explorer →]
```

When a tenant is applying for a new apartment, they share this link. The new landlord clicks it, sees the history, and can verify every payment transaction directly on the Stellar blockchain. No middleman. No document forgery possible.

This profile is the product. Everything else exists to generate it.

---

## How It Works (Technical Flow)

```
Tenant → RentProof App → Stellar Payment (USDC/XLM) → Landlord Wallet
                                  ↓
                    Transaction tagged with property memo
                                  ↓
                    Horizon API indexes the transaction
                                  ↓
                    RentProof reads it → updates Rent History Profile
```

RentProof uses Stellar's **memo field** to tag each payment with a property identifier. This means the payment record on-chain is self-describing — even without RentProof's database, anyone can read the Stellar ledger and reconstruct a tenant's history.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Blockchain | Stellar (Horizon API, Stellar SDK) |
| Payments | USDC on Stellar, XLM |
| Frontend | TypeScript + React |
| Backend | Node.js + Stellar SDK |
| Database | PostgreSQL (off-chain metadata: property details, tenant profiles, property codes) |
| History Profile | Server-rendered public page — no login required to view |

---

## Project Structure

```
rentproof/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── TenantDashboard.tsx      # Tenant's payment history + pay button
│   │   │   ├── LandlordDashboard.tsx    # Property list + payment status
│   │   │   ├── RentHistoryProfile.tsx   # Public shareable profile page
│   │   │   └── PropertySetup.tsx        # Landlord registers a property
│   │   └── components/
├── backend/
│   ├── src/
│   │   ├── stellar/
│   │   │   ├── payments.ts              # Send + verify payments via Stellar SDK
│   │   │   ├── history.ts               # Read + reconstruct history from Horizon
│   │   │   └── accounts.ts              # Wallet management
│   │   └── routes/
│   │       ├── properties.ts
│   │       ├── tenants.ts
│   │       └── profile.ts               # Public profile endpoint
└── README.md
```

---

## MVP Scope (Wave Sprint)

For the initial Wave contribution, the MVP focuses on:

- [ ] Property registration (landlord flow)
- [ ] Tenant-to-property linking via property code
- [ ] Stellar payment with memo tagging (tenant flow)
- [ ] Horizon listener — read and index payments per property
- [ ] Tenant dashboard (history view)
- [ ] Basic public Rent History Profile page (shareable link)

Post-MVP additions (future waves):
- Landlord verification badge (optional KYC layer)
- Late payment flagging (paid but after due date — still recorded, but noted)
- Naira on-ramp via local payment gateway → USDC
- WhatsApp/SMS rent reminders
- RentProof score — a simple reliability metric based on payment consistency

---

## Target Users

- **Tenants** in Nigerian cities (Lagos, Abuja, Port Harcourt) who want to build and own a rental reputation
- **Landlords** who want consistent payment records without chasing bank alerts
- **Real estate agents** who want a quick way to vet prospective tenants
- **Young professionals** who are renting for the first time and have no guarantors

---

## Why This Matters

Nigeria has no functional credit bureau for renters. The closest thing most tenants have is a WhatsApp message from a previous landlord — which can be faked, ignored, or simply never given. This means every new tenancy starts from zero trust, and tenants with genuinely good payment history have no way to prove it.

RentProof creates that proof layer. It doesn't require landlords to trust the app — they can verify every transaction directly on the Stellar blockchain. And it doesn't require tenants to trust that RentProof will be around forever — their history lives on-chain regardless.

A tenant who has paid rent reliably for two years deserves to walk into their next rental negotiation with leverage. RentProof gives them that.

---

## Contributing

This project is part of the Stellar Wave Program on Drips. Contributions are welcome — check the Issues tab for open tasks tagged `good-first-issue`, `frontend`, `backend`, and `stellar-integration`.

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR.

---

## License

MIT License — see [LICENSE](./LICENSE) for details.

---

*Built on [Stellar](https://stellar.org) · Part of the [Drips Wave Program](https://drips.network/wave/stellar)*
