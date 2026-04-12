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
  'Tenants who need credible rental history they can carry between homes.',
  'Landlords who want clean payment visibility without manual proof collection.',
  'Agents vetting prospective tenants with something stronger than screenshots.',
];
