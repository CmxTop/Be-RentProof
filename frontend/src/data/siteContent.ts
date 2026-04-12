export const stats = [
  { value: '3 steps', label: 'Property setup to first payment' },
  { value: 'On-chain', label: 'Receipts tenants keep forever' },
  { value: 'USDC/XLM', label: 'Supported Stellar payment rails' },
];

export const featureCards = [
  {
    title: 'Property registration',
    description:
      'Landlords create a property record, define the rent amount, and generate a code tenants can use to link themselves.',
  },
  {
    title: 'Memo-tagged payments',
    description:
      'Every rent payment is sent directly to the landlord wallet and tagged with a property identifier on Stellar.',
  },
  {
    title: 'Portable tenant proof',
    description:
      'Tenants build a shareable rent history profile that future landlords can verify without chasing paper receipts.',
  },
];

export const milestones = [
  'Landlord registers a property and gets a shareable property code.',
  'Tenant links to the property and initiates rent payment in USDC or XLM.',
  'Horizon-indexed transactions update a public rent history profile.',
];

export const personas = [
  'Tenants in Lagos, Abuja, and Port Harcourt who need credible rental history.',
  'Landlords who want clean payment visibility without manual proof collection.',
  'Agents vetting prospective tenants with something stronger than screenshots.',
];

export const architecturePillars = [
  {
    title: 'Frontend',
    body: 'React + TypeScript for the landing page now, with room for tenant and landlord dashboards next.',
  },
  {
    title: 'Backend',
    body: 'Node.js modules scaffolded for property APIs, profile endpoints, and Stellar payment services.',
  },
  {
    title: 'Data model',
    body: 'PostgreSQL holds off-chain metadata while Stellar remains the immutable source of payment truth.',
  },
];

