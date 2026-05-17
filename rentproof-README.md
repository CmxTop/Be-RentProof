# RentProof 🏠

**Your rent history, on-chain. Pay rent on Stellar, own your payment record, carry it anywhere.**

---

## The Problem

In Lagos, finding a new apartment doesn't start with a viewing. It starts with a negotiation about trust.

Landlords in Nigeria demand one or two years of rent upfront — not because they're greedy, but because they have no way to know if you'll pay. There's no tenant credit system. No rental history database. No way for a prospective landlord to verify that the person sitting across from them has paid rent reliably for three years running. So they ask for everything at once, as insurance against a stranger they can't verify.

For the tenant, the math is brutal. A ₦500,000/year apartment suddenly requires ₦1,000,000 on the table before you get a key. Most people don't have that. They borrow from family, take predatory loans, or take whatever apartment they can afford upfront — not the one they actually want.

And even tenants who do pay on time, every month, for years — have nothing to show for it. No document. No record. Just memories and a landlord's word, which means nothing to the next landlord they'll ever meet.

**Good tenants are invisible. There is no system that rewards reliability.**

### Why Existing Solutions Don't Work

Bank statements show transfers, but they don't say what the transfer was for — a landlord reviewing them has to trust the tenant's annotation. Paper receipts get lost, and many landlords don't issue them at all. Tenancy agreements exist but don't track payment history. WhatsApp payment screenshots can be faked.

None of these records belong to the tenant. None of them are portable. None of them are verifiable by a third party without trusting the tenant's word.

What's needed is a payment record that is created at the moment of payment, permanently attached to the tenant's identity, impossible to alter, and verifiable by anyone — without asking the previous landlord to cooperate.

---

## The Solution

RentProof is a simple web app where every rent payment goes through Stellar — creating a permanent, on-chain record that the tenant owns and can share with any future landlord as proof of reliability.

1. A landlord registers a property and sets the monthly rent amount
2. A tenant links to the property using a unique property code
3. The tenant pays rent monthly through RentProof via USDC or XLM on Stellar
4. Every payment is recorded on-chain — timestamped, immutable, tied to the property
5. After a few months, the tenant has a **Rent History Profile**: a shareable public link showing their complete, verified payment record

When applying for a new apartment, the tenant shares that link. The new landlord clicks it, sees the full history, and can verify every single transaction directly on the Stellar blockchain. No middleman. No document forgery possible. No need to call the previous landlord.

---

## The Rent History Profile

**This is the product. Everything else exists to generate it.**

```
Tenant: Ade Bello
──────────────────────────────────────────────────

Property: 14B Ajao Estate, Lagos
Period:   Jan 2024 – Dec 2024 (12 months)
Status:   ✅ All 12 payments made on time

Property: 3 Lekki Phase 1 Close, Lagos
Period:   Jan 2025 – Present (16 months)
Status:   ✅ All 16 payments made on time

──────────────────────────────────────────────────
Verified on Stellar · View transactions on Explorer →
```

A tenant who has paid reliably for two years can walk into any rental negotiation with this link and immediately change the dynamic. Instead of begging a landlord to trust them, they have proof. The landlord can reduce the upfront requirement. The tenant gets a fair shot.

**This is what a rental credit system looks like when it's built on a public blockchain instead of a private database.**

---

## Why This Only Works on Stellar

The Rent History Profile only works if the underlying records are trustworthy. That requires a ledger no single party controls.

- **Immutability** — once a payment is recorded on Stellar, neither the tenant, landlord, nor RentProof can alter it. The record is neutral.
- **Permanence** — the history lives on-chain regardless of what happens to RentProof. If the app shuts down tomorrow, every tenant's payment history still exists on the Stellar ledger forever.
- **Verifiability** — any landlord can click a Stellar Explorer link and see the raw transaction. No trust in RentProof required.
- **Low cost** — at ~$0.0007 per transaction, recording every monthly payment adds essentially zero overhead
- **USDC on Stellar** — stable payments eliminate naira volatility for landlords collecting rent

A tenant's Rent History Profile is only worth sharing if it can't be faked. Stellar is what makes it unfakeable.

---

## Core Features

| Feature | Description |
|---|---|
| Property Registration | Landlords register properties with rent amount and due date. |
| Tenant Linking | Tenants connect to a property via a shareable property code. |
| Monthly Rent Payment | Tenants pay via USDC/XLM. Payment goes directly to landlord's wallet. |
| On-chain Receipt | Every payment logged on Stellar with timestamp, amount, and property reference. |
| Rent History Profile | Public, shareable page showing verified payment history across all properties. |
| Landlord Dashboard | Payment status per property at a glance. |
| Tenant Dashboard | Full payment history across all past and current rentals. |

---

## How It Works

```
Tenant → RentProof App → Stellar Payment (USDC/XLM) → Landlord Wallet
                                  ↓
                    Transaction tagged with property memo
                                  ↓
                    Horizon API indexes the transaction
                                  ↓
                    RentProof updates Rent History Profile
                                  ↓
                    Tenant shares profile link with next landlord
```

RentProof uses Stellar's **memo field** to tag each payment with a property identifier. The payment record on-chain is self-describing — even without RentProof's database, anyone can reconstruct a tenant's full history directly from the Stellar ledger.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Blockchain | Stellar (Horizon API, Stellar SDK) |
| Payments | USDC on Stellar, XLM |
| Frontend | TypeScript + React |
| Backend | Node.js + Stellar SDK |
| Database | PostgreSQL (off-chain metadata: property details, tenant profiles) |
| History Profile | Public server-rendered page — no login required to view |

---

## Project Structure

```
rentproof/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── TenantDashboard.tsx
│   │   │   ├── LandlordDashboard.tsx
│   │   │   ├── RentHistoryProfile.tsx   # The shareable public profile
│   │   │   └── PropertySetup.tsx
│   │   └── components/
├── backend/
│   ├── src/
│   │   ├── stellar/
│   │   │   ├── payments.ts
│   │   │   ├── history.ts               # Reconstruct history from Horizon
│   │   │   └── accounts.ts
│   │   └── routes/
│   │       ├── properties.ts
│   │       ├── tenants.ts
│   │       └── profile.ts               # Public profile endpoint
└── README.md
```

---

## Roadmap

- [x] Project concept and architecture
- [x] Landing page deployed
- [ ] Property registration (landlord flow)
- [ ] Tenant-to-property linking via property code
- [ ] Stellar payment with memo tagging
- [ ] Horizon payment listener and indexer
- [ ] Tenant dashboard
- [ ] Public Rent History Profile page
- [ ] Landlord dashboard
- [ ] Late payment detection and flagging
- [ ] WhatsApp/SMS rent reminders
- [ ] Naira on-ramp integration

---

## Contributing

This project is part of the Stellar Wave Program on Drips. Contributions are welcome — check the Issues tab for open tasks.

---

## License

MIT License — see [LICENSE](./LICENSE) for details.

---

*Built on [Stellar](https://stellar.org) · Part of the [Drips Wave Program](https://drips.network/wave/stellar)*
